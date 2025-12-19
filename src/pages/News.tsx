import { Calendar, Tag, ArrowRight } from 'lucide-react';

const News = () => {
  const newsItems = [
    {
      id: 1,
      title: 'Відкриття нової програми підвищення кваліфікації для вчителів',
      excerpt: 'З 1 січня 2025 року стартує інноваційна програма професійного розвитку для педагогів початкових класів.',
      date: '2024-12-15',
      category: 'Програми',
      image: '📚',
    },
    {
      id: 2,
      title: 'Міжнародна конференція з педагогічної освіти',
      excerpt: 'Наші викладачі взяли участь у найбільшій конференції року, де представили інноваційні розробки.',
      date: '2024-12-10',
      category: 'Події',
      image: '🎓',
    },
    {
      id: 3,
      title: 'Результати олімпіади з педагогіки',
      excerpt: 'Підведено підсумки Всеукраїнської олімпіади з педагогіки серед студентів. Оголошено переможців.',
      date: '2024-12-05',
      category: 'Конкурси',
      image: '🏆',
    },
    {
      id: 4,
      title: 'Нові партнерські угоди з європейськими університетами',
      excerpt: 'Академія підписала меморандуми про співпрацю з провідними освітніми закладами Європи.',
      date: '2024-11-28',
      category: 'Міжнародна співпраця',
      image: '🤝',
    },
    {
      id: 5,
      title: 'Запуск онлайн-платформи для дистанційного навчання',
      excerpt: 'Представлено нову сучасну платформу для проведення онлайн-курсів та вебінарів.',
      date: '2024-11-20',
      category: 'Технології',
      image: '💻',
    },
  ];

  const categories = ['Усі', 'Програми', 'Події', 'Конкурси', 'Міжнародна співпраця', 'Технології'];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-8">Новини</h1>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              category === 'Усі'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured News */}
      <div className="mb-12">
        <div className="bg-gradient-to-r from-primary to-blue-900 text-white p-8 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Tag className="h-5 w-5 text-accent" />
            <span className="text-accent font-semibold">{newsItems[0].category}</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">{newsItems[0].title}</h2>
          <p className="text-gray-200 mb-6">{newsItems[0].excerpt}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-300">
              <Calendar className="h-4 w-4" />
              <span>{newsItems[0].date}</span>
            </div>
            <button className="flex items-center space-x-2 bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors">
              <span>Читати далі</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.slice(1).map((item) => (
          <article
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 h-40 flex items-center justify-center text-6xl">
              {item.image}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                  {item.category}
                </span>
                <div className="flex items-center space-x-1 text-gray-500 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-4 line-clamp-3">{item.excerpt}</p>
              <button className="text-primary font-semibold hover:text-accent transition-colors flex items-center space-x-2">
                <span>Читати більше</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
          Завантажити більше новин
        </button>
      </div>
    </div>
  );
};

export default News;

