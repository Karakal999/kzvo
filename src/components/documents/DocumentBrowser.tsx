import { useState, useMemo } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search, 
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  FolderOpen,
  FileCheck
} from 'lucide-react';
import type { Document } from '../../types';
import PreviewModal from './PreviewModal';
import FilterDropdown from '../FilterDropdown';
import { formatDate } from '../../utils/formatDate';

interface DocumentBrowserProps {
  documents: Document[];
  title?: string;
  showCategoryFilter?: boolean;
  showSearch?: boolean;
}

type SortField = 'title' | 'date' | 'downloads';
type SortOrder = 'asc' | 'desc';

const DocumentBrowser = ({ 
  documents, 
  title = 'Документи',
  showCategoryFilter = true,
  showSearch = true 
}: DocumentBrowserProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(documents.map(doc => doc.category)));
    return ['all', ...cats];
  }, [documents]);

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    let filtered = documents;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(query) ||
        doc.description?.toLowerCase().includes(query) ||
        doc.category.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered = [...filtered].sort((a, b) => {
      let aValue, bValue;

      switch (sortField) {
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'downloads':
          aValue = a.downloads || 0;
          bValue = b.downloads || 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [documents, selectedCategory, searchQuery, sortField, sortOrder]);

  const getFileIcon = (fileType: string) => {
    const iconClass = "h-8 w-8";
    switch (fileType) {
      case 'pdf':
        return <FileText className={`${iconClass} text-red-500`} />;
      case 'doc':
      case 'docx':
        return <FileText className={`${iconClass} text-blue-500`} />;
      case 'xlsx':
      case 'xls':
        return <FileText className={`${iconClass} text-green-500`} />;
      case 'ppt':
      case 'pptx':
        return <FileText className={`${iconClass} text-orange-500`} />;
      default:
        return <FileText className={`${iconClass} text-gray-500`} />;
    }
  };

  const handleDownload = (doc: Document) => {
    console.log('Downloading:', doc.title);
    alert(`Завантаження файлу: ${doc.title}`);
  };

  const handlePreview = (doc: Document) => {
    setSelectedDocument(doc);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
        <p className="text-gray-600">
          Знайдено документів: <span className="font-semibold text-primary">{filteredDocuments.length}</span>
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          {/* Search */}
          {showSearch && (
            <div className="flex-1 min-w-[250px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Пошук документів..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Фільтри</span>
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <FilterDropdown
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortField={sortField}
              onSortFieldChange={(field) => setSortField(field as SortField)}
              sortOrder={sortOrder}
              onSortOrderChange={(order) => setSortOrder(order as SortOrder)}
              showCategoryFilter={showCategoryFilter}
            />
          </div>
        )}
      </div>

      {/* Documents List - Desktop Table View */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => toggleSort('title')}
                  className="flex items-center space-x-1 font-semibold text-gray-700 hover:text-primary transition-colors"
                >
                  <span>Документ</span>
                  {sortField === 'title' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="font-semibold text-gray-700">Категорія</span>
              </th>
              <th className="px-6 py-4 text-left">
                <button
                  onClick={() => toggleSort('date')}
                  className="flex items-center space-x-1 font-semibold text-gray-700 hover:text-primary transition-colors"
                >
                  <span>Дата</span>
                  {sortField === 'date' && (
                    sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="font-semibold text-gray-700">Розмір</span>
              </th>
              <th className="px-6 py-4 text-center">
                <span className="font-semibold text-gray-700">Дії</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDocuments.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    {getFileIcon(doc.fileType)}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 line-clamp-1">
                        {doc.title}
                      </div>
                      {doc.description && (
                        <div className="text-sm text-gray-600 line-clamp-1">
                          {doc.description}
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <span className="uppercase font-semibold">{doc.fileType}</span>
                        {doc.downloads && (
                          <>
                            <span>•</span>
                            <span>{doc.downloads} завантажень</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                    {doc.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {formatDate(doc.date)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {doc.fileSize}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handlePreview(doc)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                      title="Переглянути"
                    >
                      <Eye className="h-5 w-5 text-gray-600 group-hover:text-primary" />
                    </button>
                    <button
                      onClick={() => handleDownload(doc)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                      title="Завантажити"
                    >
                      <Download className="h-5 w-5 text-gray-600 group-hover:text-primary" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Documents List - Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredDocuments.map((doc) => (
          <div key={doc.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {/* Header */}
            <div className="flex items-start space-x-3 mb-3">
              {getFileIcon(doc.fileType)}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">
                  {doc.title}
                </h3>
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                  {doc.category}
                </span>
              </div>
            </div>

            {/* Description */}
            {doc.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {doc.description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(doc.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FolderOpen className="h-4 w-4" />
                <span>{doc.fileSize}</span>
              </div>
              {doc.downloads && (
                <div className="flex items-center space-x-1">
                  <FileCheck className="h-4 w-4" />
                  <span>{doc.downloads}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handlePreview(doc)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span>Переглянути</span>
              </button>
              <button
                onClick={() => handleDownload(doc)}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Завантажити</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDocuments.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Документи не знайдено
          </h3>
          <p className="text-gray-600">
            Спробуйте змінити параметри пошуку або фільтри
          </p>
        </div>
      )}

      {/* Preview Modal */}
      {selectedDocument && (
        <PreviewModal
          document={selectedDocument}
          isOpen={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}
    </div>
  );
};

export default DocumentBrowser;

