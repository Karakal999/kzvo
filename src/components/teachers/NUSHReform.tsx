import { useState } from 'react';
import { FileText, Download, Eye, Search, FolderOpen } from 'lucide-react';
import { nushMaterials } from '../../data/teachers';
import { formatDate } from '../../utils/formatDate';
import type { NUSHMaterial } from '../../types';

const NUSHReform = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Усі матеріали', color: 'bg-gray-100 text-gray-700' },
    { id: 'normative', label: 'Нормативні документи', color: 'bg-red-100 text-red-700' },
    { id: 'methodical', label: 'Методичні матеріали', color: 'bg-blue-100 text-blue-700' },
    { id: 'manual', label: 'Посібники', color: 'bg-green-100 text-green-700' },
  ];

  const filteredMaterials = nushMaterials.filter(material => {
    const categoryMatch = selectedCategory === 'all' || material.category === selectedCategory;
    const searchMatch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       material.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const getFileIcon = (fileType: NUSHMaterial['fileType']) => {
    const icons = {
      PDF: '📄',
      DOC: '📝',
      DOCX: '📝',
      ZIP: '📦',
    };
    return icons[fileType];
  };

  const getCategoryLabel = (category: NUSHMaterial['category']) => {
    const labels = {
      normative: 'Нормативний',
      methodical: 'Методичний',
      manual: 'Посібник',
    };
    return labels[category];
  };

  const getCategoryColor = (category: NUSHMaterial['category']) => {
    const colors = {
      normative: 'bg-red-100 text-red-700',
      methodical: 'bg-blue-100 text-blue-700',
      manual: 'bg-green-100 text-green-700',
    };
    return colors[category];
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Реформа НУШ</h2>

      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
        <p className="text-lg text-gray-700 mb-4">
          База нормативних документів, методичних матеріалів та посібників з впровадження
          Нової української школи.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold">
            {nushMaterials.length} документів
          </span>
          <span className="px-3 py-1 bg-white rounded-full text-sm font-semibold">
            💾 Безкоштовне завантаження
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Пошук матеріалів..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary text-white shadow-md'
                  : category.color + ' hover:shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {categories.slice(1).map((cat) => {
          const count = nushMaterials.filter(m => m.category === cat.id).length;
          return (
            <div key={cat.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{cat.label}</p>
                  <p className="text-2xl font-bold text-primary">{count}</p>
                </div>
                <FolderOpen className="h-10 w-10 text-accent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Materials List */}
      <div className="space-y-4">
        {filteredMaterials.map((material) => (
          <div
            key={material.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="flex-shrink-0 text-4xl">
                {getFileIcon(material.fileType)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 flex-1 mr-4">
                    {material.title}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${getCategoryColor(material.category)}`}>
                    {getCategoryLabel(material.category)}
                  </span>
                </div>

                <p className="text-gray-600 mb-3">{material.description}</p>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <span className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{material.fileType}</span>
                  </span>
                  <span>•</span>
                  <span>{material.fileSize}</span>
                  <span>•</span>
                  <span>{formatDate(material.date)}</span>
                  {material.downloads && (
                    <>
                      <span>•</span>
                      <span>⬇️ {material.downloads} завантажень</span>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Завантажити</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>Переглянути</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Матеріалів не знайдено</p>
          <p className="text-gray-400">Спробуйте змінити фільтри або пошуковий запит</p>
        </div>
      )}

      {/* Info Block */}
      <div className="mt-8 bg-accent/10 border border-accent/20 rounded-lg p-6">
        <h3 className="text-xl font-bold text-primary mb-3">❓ Не знайшли потрібний матеріал?</h3>
        <p className="text-gray-700 mb-4">
          Надішліть запит на додавання матеріалів, яких бракує в нашій базі, або
          поділіться власними напрацюваннями з колегами.
        </p>
        <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
          Надіслати запит
        </button>
      </div>
    </div>
  );
};

export default NUSHReform;

