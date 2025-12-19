import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Clock, Users, Tag, DollarSign } from 'lucide-react';
import type { EducationProgram } from '../../types';
import { qualificationPrograms } from '../../data/programs';
import { formatDate } from '../../utils/formatDate';
import ProgramCard from './ProgramCard';

const QualificationSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<EducationProgram | null>(null);

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return qualificationPrograms.filter(program => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          program.title.toLowerCase().includes(query) ||
          program.description.toLowerCase().includes(query) ||
          program.tags?.some(tag => tag.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Format filter
      if (selectedFormat !== 'all' && program.format !== selectedFormat) {
        return false;
      }

      // Duration filter
      if (selectedDuration !== 'all') {
        const hours = program.durationHours || 0;
        if (selectedDuration === 'short' && hours >= 60) return false;
        if (selectedDuration === 'medium' && (hours < 60 || hours >= 120)) return false;
        if (selectedDuration === 'long' && hours < 120) return false;
      }

      return true;
    });
  }, [searchQuery, selectedFormat, selectedDuration]);

  const getFormatLabel = (format: string) => {
    const labels = {
      online: 'Онлайн',
      offline: 'Очно',
      hybrid: 'Змішаний',
    };
    return labels[format as keyof typeof labels] || format;
  };

  const getFormatColor = (format: string) => {
    const colors = {
      online: 'bg-blue-100 text-blue-700 border-blue-300',
      offline: 'bg-green-100 text-green-700 border-green-300',
      hybrid: 'bg-purple-100 text-purple-700 border-purple-300',
    };
    return colors[format as keyof typeof colors] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const handleRegister = (programId: string) => {
    console.log('Registering for program:', programId);
    alert('Дякуємо за інтерес! Реєстрація буде доступна найближчим часом.');
    setSelectedProgram(null);
  };

  return (
    <div>
      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Пошук курсів за назвою або тематикою..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span className="font-semibold">Фільтри</span>
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Format Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Формат навчання
                </label>
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Всі формати</option>
                  <option value="online">Онлайн</option>
                  <option value="offline">Очно</option>
                  <option value="hybrid">Змішаний</option>
                </select>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тривалість
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Будь-яка</option>
                  <option value="short">До 60 годин</option>
                  <option value="medium">60-120 годин</option>
                  <option value="long">Більше 120 годин</option>
                </select>
              </div>

              {/* Date Filter (placeholder) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата початку
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Всі дати</option>
                  <option value="jan">Січень 2025</option>
                  <option value="feb">Лютий 2025</option>
                  <option value="mar">Березень 2025</option>
                  <option value="apr">Квітень 2025</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          Знайдено курсів: <span className="font-semibold text-primary">{filteredPrograms.length}</span>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => setSelectedProgram(program)}
          >
            {/* Header with Format Badge */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getFormatColor(program.format)}`}>
                  {getFormatLabel(program.format)}
                </span>
                {program.isFree && (
                  <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-semibold">
                    Безкоштовно
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {program.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">{program.description}</p>
            </div>

            {/* Details */}
            <div className="p-6 space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Clock className="h-4 w-4 text-primary" />
                <span>{program.duration} ({program.durationHours} годин)</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Calendar className="h-4 w-4 text-primary" />
                <span>Початок: {formatDate(program.startDate)}</span>
              </div>
              {program.seatsAvailable !== undefined && (
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className={program.seatsAvailable < 10 ? 'text-orange-600 font-semibold' : 'text-gray-700'}>
                    Вільних місць: {program.seatsAvailable}
                    {program.seatsAvailable < 10 && ' (мало місць!)'}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="font-semibold">
                  {program.isFree ? 'Безкоштовно' : `${program.price.toLocaleString()} грн`}
                </span>
              </div>
            </div>

            {/* Tags */}
            {program.tags && program.tags.length > 0 && (
              <div className="px-6 pb-6">
                <div className="flex flex-wrap gap-2">
                  {program.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                    >
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                    </span>
                  ))}
                  {program.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{program.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 pb-6">
              <button className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                Детальніше
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPrograms.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Курсів не знайдено
          </h3>
          <p className="text-gray-600">
            Спробуйте змінити параметри пошуку або фільтри
          </p>
        </div>
      )}

      {/* Program Detail Modal */}
      {selectedProgram && (
        <ProgramCard
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
};

export default QualificationSection;

