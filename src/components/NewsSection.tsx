import { Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { news } from '../data/news';
import { formatDate } from '../utils/formatDate';
import { useTranslation } from 'react-i18next';

const NewsSection = () => {
  const { t } = useTranslation('pages');
  // Show only first 4 news items
  const latestNews = news.slice(0, 4);

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Програми': 'bg-primary/10 text-primary',
      'Події': 'bg-accent/10 text-accent',
      'Конкурси': 'bg-purple-100 text-purple-700',
      'Міжнародна співпраця': 'bg-green-100 text-green-700',
      'Технології': 'bg-blue-100 text-blue-700',
      'Вступ': 'bg-orange-100 text-orange-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            {t('home.news.title')}
          </h2>
          <Link
            to="/news"
            className="flex items-center space-x-2 text-primary font-semibold hover:text-accent transition-colors"
          >
            <span className="hidden sm:inline">{t('home.news.all_news')}</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestNews.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              {/* Image */}
              <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 h-48 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                {item.image}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Author & Read More */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  {item.author && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <User className="h-3 w-3" />
                      <span>{item.author}</span>
                    </div>
                  )}
                  <Link
                    to={`/news/${item.id}`}
                    className="flex items-center space-x-1 text-sm font-semibold text-primary hover:text-accent transition-colors"
                  >
                    <span>Читати</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

