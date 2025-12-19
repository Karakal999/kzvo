import { Calendar, Tag } from 'lucide-react';

const NewsPage = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Відкриття нової програми підвищення кваліфікації',
      excerpt: 'З 1 січня стартує інноваційна програма для вчителів початкових класів.',
      date: '2024-12-15',
      category: 'Програми',
      image: 'https://via.placeholder.com/400x250',
    },
    {
      id: 2,
      title: 'Міжнародна конференція з освіти',
      excerpt: 'Наші викладачі взяли участь у найбільшій конференції року.',
      date: '2024-12-10',
      category: 'Події',
      image: 'https://via.placeholder.com/400x250',
    },
    {
      id: 3,
      title: 'Новий курс "Цифрові технології в освіті"',
      excerpt: 'Запрошуємо педагогів пройти навчання за новою програмою.',
      date: '2024-12-05',
      category: 'Курси',
      image: 'https://via.placeholder.com/400x250',
    },
    {
      id: 4,
      title: 'Результати учнівських олімпіад',
      excerpt: 'Оголошено переможців регіональних предметних олімпіад.',
      date: '2024-12-01',
      category: 'Конкурси',
      image: 'https://via.placeholder.com/400x250',
    },
  ];

  const categories = ['Всі', 'Події', 'Програми', 'Курси', 'Конкурси', 'Оголошення'];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Новини</h1>
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700">
          Останні новини, події та оголошення Академії педагогічної освіти.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-lg border border-gray-300 hover:border-accent hover:text-accent transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {newsItems.map((news) => (
          <article
            key={news.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-3 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(news.date).toLocaleDateString('uk-UA')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>{news.category}</span>
                </div>
              </div>
              <h2 className="text-xl font-bold text-primary mb-3 hover:text-accent transition-colors cursor-pointer">
                {news.title}
              </h2>
              <p className="text-gray-600 mb-4">{news.excerpt}</p>
              <a
                href="#"
                className="text-accent font-semibold hover:text-primary transition-colors"
              >
                Читати далі →
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Попередня
          </button>
          <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            3
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Наступна
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;

