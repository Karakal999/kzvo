import { BookOpen, Download, Calendar, Eye } from 'lucide-react';

const JournalSection = () => {
  const issues = [
    {
      id: '1',
      number: '12 (148)',
      year: '2024',
      month: 'Грудень',
      title: 'Інноваційні технології в освіті',
      cover: '📖',
      pages: 156,
      articles: 18,
    },
    {
      id: '2',
      number: '11 (147)',
      year: '2024',
      month: 'Листопад',
      title: 'Формування компетентностей учнів',
      cover: '📚',
      pages: 142,
      articles: 16,
    },
    {
      id: '3',
      number: '10 (146)',
      year: '2024',
      month: 'Жовтень',
      title: 'Цифрова трансформація школи',
      cover: '📗',
      pages: 134,
      articles: 15,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Журнал "Наша школа"</h2>

      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
        <p className="text-lg text-gray-700 mb-4">
          Науково-методичний журнал для педагогів. Публікує статті з педагогіки, психології,
          методики викладання, інноваційних технологій та досвіду роботи вчителів.
        </p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-white rounded-lg font-semibold flex items-center space-x-2">
            <span>📅</span>
            <span>12 випусків на рік</span>
          </span>
          <span className="px-4 py-2 bg-white rounded-lg font-semibold flex items-center space-x-2">
            <span>✅</span>
            <span>Фахове видання</span>
          </span>
          <span className="px-4 py-2 bg-white rounded-lg font-semibold flex items-center space-x-2">
            <span>🌐</span>
            <span>Відкритий доступ</span>
          </span>
        </div>
      </div>

      {/* Latest Issues */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-primary mb-4">Останні випуски</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all"
            >
              {/* Cover */}
              <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 h-64 flex items-center justify-center text-8xl">
                {issue.cover}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-primary text-white rounded-full text-sm font-bold">
                    №{issue.number}
                  </span>
                  <span className="text-sm text-gray-600">{issue.month} {issue.year}</span>
                </div>

                <h4 className="text-lg font-bold text-gray-900 mb-4 line-clamp-2">
                  {issue.title}
                </h4>

                <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Сторінок:</span>
                    <span className="ml-1">{issue.pages}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Статей:</span>
                    <span className="ml-1">{issue.articles}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>Читати</span>
                  </button>
                  <button className="p-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* For Authors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border-2 border-primary/20 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-bold text-primary">Для авторів</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Запрошуємо педагогів публікувати свої статті та методичні напрацювання.
            Публікація безкоштовна для членів професійних спільнот.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
            <li>Рецензування до 2 тижнів</li>
            <li>Сертифікат автора</li>
            <li>Наукометричні бази</li>
          </ul>
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors w-full">
            Подати статтю
          </button>
        </div>

        <div className="bg-accent/10 border-2 border-accent/20 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-8 w-8 text-accent" />
            <h3 className="text-xl font-bold text-primary">Передплата</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Оформіть передплату на друковану або електронну версію журналу та отримуйте
            щомісячні випуски.
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold">Електронна версія</span>
              <span className="text-primary font-bold">Безкоштовно</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-semibold">Друкована версія</span>
              <span className="text-primary font-bold">600 грн/рік</span>
            </div>
          </div>
          <button className="px-6 py-3 bg-white border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-colors w-full">
            Оформити передплату
          </button>
        </div>
      </div>

      {/* Archive */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-primary mb-4">📚 Архів видань</h3>
        <p className="text-gray-700 mb-4">
          У нашому архіві доступні всі випуски журналу з 1998 року. Скористайтеся пошуком
          для знаходження потрібної статті або теми.
        </p>
        <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
          Перейти до архіву
        </button>
      </div>
    </div>
  );
};

export default JournalSection;

