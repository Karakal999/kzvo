import { FileText, Download, Calendar, FolderOpen } from 'lucide-react';
import { publicDocuments } from '../../data/about';
import { formatDate } from '../../utils/formatDate';

const PublicInfoSection = () => {
  const categories = [...new Set(publicDocuments.map(doc => doc.category))];

  const getFileIcon = (fileType?: string) => {
    if (fileType === 'PDF') {
      return '📄';
    }
    return '📁';
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Публічна інформація</h2>
      
      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
        <p className="text-lg text-gray-700">
          Відповідно до принципів прозорості та відкритості, академія надає доступ
          до нормативних документів, звітів та іншої публічної інформації.
        </p>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {categories.slice(0, 3).map((category, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <FolderOpen className="h-8 w-8 text-accent" />
              <div>
                <h4 className="font-semibold text-gray-900">{category}</h4>
                <p className="text-sm text-gray-500">
                  {publicDocuments.filter(d => d.category === category).length} документів
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Documents Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-6 py-4 text-left font-semibold">Документ</th>
                <th className="px-6 py-4 text-left font-semibold">Категорія</th>
                <th className="px-6 py-4 text-left font-semibold">Дата</th>
                <th className="px-6 py-4 text-left font-semibold">Розмір</th>
                <th className="px-6 py-4 text-center font-semibold">Завантажити</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {publicDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getFileIcon(doc.fileType)}</span>
                      <div>
                        <div className="font-medium text-gray-900">{doc.title}</div>
                        {doc.fileType && (
                          <div className="text-sm text-gray-500">{doc.fileType}</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{formatDate(doc.date)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {doc.fileSize || '—'}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors"
                      onClick={() => console.log('Download', doc.id)}
                    >
                      <Download className="h-4 w-4" />
                      <span>Завантажити</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <FileText className="h-6 w-6 text-accent" />
            <h3 className="text-xl font-bold text-primary">Запит на інформацію</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Якщо ви не знайшли потрібний документ, ви можете надіслати офіційний запит
            на отримання публічної інформації.
          </p>
          <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors">
            Надіслати запит
          </button>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-3">
            <FolderOpen className="h-6 w-6 text-primary" />
            <h3 className="text-xl font-bold text-primary">Архів документів</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Доступ до архіву нормативних документів та звітів за попередні роки.
          </p>
          <button className="px-6 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
            Перейти до архіву
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicInfoSection;

