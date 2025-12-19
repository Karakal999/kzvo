import { Newspaper, Video, Image, ExternalLink } from 'lucide-react';

const MediaSection = () => {
  const mediaItems = [
    {
      id: '1',
      type: 'news',
      title: 'Академія підписала меморандум з Варшавським університетом',
      source: 'Освіта.ua',
      date: '15.12.2024',
      link: '#',
    },
    {
      id: '2',
      type: 'video',
      title: 'Інтерв\'ю з ректором академії про майбутнє педагогічної освіти',
      source: '1+1 Телеканал',
      date: '10.12.2024',
      link: '#',
    },
    {
      id: '3',
      type: 'news',
      title: 'Студенти академії перемогли у всеукраїнській олімпіаді',
      source: 'УП. Освіта',
      date: '05.12.2024',
      link: '#',
    },
    {
      id: '4',
      type: 'article',
      title: 'Інновації в педагогічній освіті: досвід академії',
      source: 'Педагогічна думка',
      date: '28.11.2024',
      link: '#',
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-6 w-6 text-red-500" />;
      case 'article':
        return <Newspaper className="h-6 w-6 text-blue-500" />;
      default:
        return <Newspaper className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Академія у медіа</h2>
      
      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
        <p className="text-lg text-gray-700">
          Публікації про діяльність академії у провідних ЗМІ, інтерв'ю з керівництвом
          та викладачами, відео-репортажі про освітні події та досягнення.
        </p>
      </div>

      {/* Media Items */}
      <div className="space-y-4 mb-8">
        {mediaItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="font-medium">{item.source}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 ml-4 p-2 text-primary hover:bg-primary hover:text-white rounded-full transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Gallery */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-primary">Фотогалерея</h3>
          <button className="text-primary font-semibold hover:text-accent transition-colors flex items-center space-x-2">
            <span>Всі фото</span>
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            >
              <Image className="h-12 w-12 text-primary" />
            </div>
          ))}
        </div>
      </div>

      {/* Press Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-primary text-white rounded-lg p-6">
          <h3 className="text-xl font-bold mb-3">📰 Прес-центр</h3>
          <p className="mb-4">
            Для журналістів та представників ЗМІ ми надаємо прес-релізи,
            фото- та відеоматеріали, організовуємо інтерв'ю.
          </p>
          <button className="px-6 py-2 bg-accent text-primary rounded-lg font-semibold hover:bg-accent/90 transition-colors">
            Контакти прес-служби
          </button>
        </div>

        <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-3">📹 Відеоархів</h3>
          <p className="text-gray-700 mb-4">
            Відео з конференцій, семінарів, урочистих подій та
            навчальних заходів академії.
          </p>
          <button className="px-6 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors font-semibold">
            Перейти до відео
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaSection;

