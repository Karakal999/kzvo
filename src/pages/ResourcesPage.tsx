import { FileText, Video, Download, Book } from 'lucide-react';

const ResourcesPage = () => {
  const resourceCategories = [
    {
      icon: <FileText className="h-10 w-10 text-accent" />,
      title: 'Методичні посібники',
      description: 'Електронні посібники та методичні рекомендації',
      count: '150+ документів',
    },
    {
      icon: <Video className="h-10 w-10 text-accent" />,
      title: 'Відеоматеріали',
      description: 'Записи лекцій, вебінарів та майстер-класів',
      count: '80+ відео',
    },
    {
      icon: <Download className="h-10 w-10 text-accent" />,
      title: 'Завантаження',
      description: 'Форми, бланки та шаблони документів',
      count: '200+ файлів',
    },
    {
      icon: <Book className="h-10 w-10 text-accent" />,
      title: 'Електронна бібліотека',
      description: 'Науково-методична література та публікації',
      count: '500+ видань',
    },
  ];

  const popularResources = [
    'Методика викладання у початковій школі',
    'Сучасні педагогічні технології',
    'Психологія дитячого розвитку',
    'Інклюзивна освіта: практичний посібник',
    'STEM-освіта в школі',
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Ресурси</h1>
      <div className="prose max-w-none mb-12">
        <p className="text-lg text-gray-700">
          Електронні ресурси, методичні матеріали та корисні посилання для педагогів та учнів.
        </p>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {resourceCategories.map((category, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-accent"
          >
            <div className="mb-4">{category.icon}</div>
            <h3 className="text-xl font-bold text-primary mb-2">{category.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{category.description}</p>
            <span className="text-accent font-semibold text-sm">{category.count}</span>
          </div>
        ))}
      </div>

      {/* Popular Resources Section */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">Популярні ресурси</h2>
        <ul className="space-y-3">
          {popularResources.map((resource, index) => (
            <li key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <a href="#" className="text-gray-700 hover:text-primary transition-colors">
                {resource}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Search Section */}
      <div className="mt-12 bg-gradient-to-r from-primary to-blue-900 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Пошук ресурсів</h2>
        <p className="mb-6">
          Знайдіть потрібні навчальні матеріали за допомогою розширеного пошуку
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Введіть ключові слова..."
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button className="bg-accent text-primary px-8 py-3 rounded-lg font-semibold hover:bg-accent-400 transition-colors">
            Шукати
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;

