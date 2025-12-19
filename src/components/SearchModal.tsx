import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, Newspaper, BookOpen, Calendar, Folder, TrendingUp } from 'lucide-react';
import { useSiteSearch } from '../hooks/useSiteSearch';
import type { SearchResultType } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const { results, groupedResults, isSearching, hasResults, suggestions } = useSiteSearch(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getTypeIcon = (type: SearchResultType) => {
    const icons = {
      page: <Folder className="h-5 w-5 text-blue-600" />,
      news: <Newspaper className="h-5 w-5 text-green-600" />,
      document: <FileText className="h-5 w-5 text-red-600" />,
      course: <BookOpen className="h-5 w-5 text-purple-600" />,
      event: <Calendar className="h-5 w-5 text-orange-600" />,
    };
    return icons[type];
  };

  const getTypeLabel = (type: SearchResultType) => {
    const labels = {
      page: 'Сторінки',
      news: 'Новини',
      document: 'Документи',
      course: 'Курси',
      event: 'Події',
    };
    return labels[type];
  };

  const handleResultClick = (url: string) => {
    navigate(url);
    onClose();
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-black/70 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-3xl max-h-[600px] flex flex-col shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
          <Search className="h-6 w-6 text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Пошук по сайту... (Ctrl+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg outline-none placeholder-gray-400"
          />
          {query && (
            <button
              onClick={handleClear}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Loading State */}
          {isSearching && query.length >= 2 && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-gray-600">Пошук...</p>
            </div>
          )}

          {/* No Query */}
          {!query && !isSearching && (
            <div className="text-center py-8">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                Почніть вводити для пошуку
              </h3>
              <p className="text-gray-600">
                Шукайте сторінки, новини, документи, курси та події
              </p>
            </div>
          )}

          {/* Query too short */}
          {query.length > 0 && query.length < 2 && !isSearching && (
            <div className="text-center py-8">
              <p className="text-gray-600">Введіть мінімум 2 символи для пошуку</p>
            </div>
          )}

          {/* Results */}
          {!isSearching && query.length >= 2 && hasResults && (
            <div className="space-y-6">
              <div className="text-sm text-gray-600 mb-4">
                Знайдено результатів: <span className="font-semibold text-primary">{results.length}</span>
              </div>

              {Object.entries(groupedResults).map(([type, items]) => {
                if (items.length === 0) return null;

                return (
                  <div key={type}>
                    <h3 className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-3 uppercase">
                      {getTypeIcon(type as SearchResultType)}
                      <span>{getTypeLabel(type as SearchResultType)}</span>
                      <span className="text-gray-400">({items.length})</span>
                    </h3>
                    <div className="space-y-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleResultClick(item.url)}
                          className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary transition-all group"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                              {item.title}
                            </h4>
                            {item.date && (
                              <span className="text-xs text-gray-500 ml-4 flex-shrink-0">
                                {new Date(item.date).toLocaleDateString('uk-UA')}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          {item.breadcrumb && (
                            <p className="text-xs text-gray-500">
                              {item.breadcrumb}
                            </p>
                          )}
                          {item.category && !item.breadcrumb && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {item.category}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* No Results */}
          {!isSearching && query.length >= 2 && !hasResults && (
            <div className="text-center py-8">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">
                Нічого не знайдено
              </h3>
              <p className="text-gray-600 mb-6">
                Спробуйте змінити запит або скористайтесь нашими порадами
              </p>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="mt-8 text-left">
                  <h4 className="flex items-center space-x-2 text-sm font-bold text-gray-700 mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>Можливо, вас зацікавить:</span>
                  </h4>
                  <div className="space-y-2">
                    {suggestions.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleResultClick(item.url)}
                        className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-primary transition-all"
                      >
                        <div className="flex items-center space-x-3">
                          {getTypeIcon(item.type)}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">↑</kbd>
                <kbd className="ml-1 px-2 py-1 bg-white border border-gray-300 rounded">↓</kbd>
                <span className="ml-2">для навігації</span>
              </span>
              <span>
                <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Enter</kbd>
                <span className="ml-2">вибрати</span>
              </span>
            </div>
            <span>
              <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">Esc</kbd>
              <span className="ml-2">закрити</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;

