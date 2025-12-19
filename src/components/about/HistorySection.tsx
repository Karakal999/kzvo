import { Calendar, Award, Users, Building } from 'lucide-react';

const HistorySection = () => {
  const milestones = [
    {
      year: '1999',
      title: 'Заснування академії',
      description: 'Академія педагогічної освіти була створена з метою підготовки висококваліфікованих педагогічних кадрів.',
      icon: <Building className="h-8 w-8 text-primary" />,
    },
    {
      year: '2005',
      title: 'Отримання акредитації',
      description: 'Академія успішно пройшла державну акредитацію та отримала право надавати дипломи державного зразка.',
      icon: <Award className="h-8 w-8 text-accent" />,
    },
    {
      year: '2010',
      title: 'Міжнародне визнання',
      description: 'Підписання перших міжнародних угод про співпрацю з європейськими університетами.',
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      year: '2015',
      title: 'Запуск магістерських програм',
      description: 'Відкриття нових магістерських програм з педагогічної освіти та управління освітою.',
      icon: <Calendar className="h-8 w-8 text-accent" />,
    },
    {
      year: '2020',
      title: 'Цифрова трансформація',
      description: 'Впровадження сучасної платформи дистанційного навчання та онлайн-курсів.',
      icon: <Building className="h-8 w-8 text-primary" />,
    },
    {
      year: '2024',
      title: 'Сучасність',
      description: 'Академія є провідним центром педагогічної освіти з 500+ випускниками щороку.',
      icon: <Award className="h-8 w-8 text-accent" />,
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Історія академії</h2>
      
      <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-8">
        <p className="text-lg text-gray-700 leading-relaxed">
          Академія педагогічної освіти була заснована у 1999 році з метою підготовки
          висококваліфікованих педагогічних кадрів для системи освіти України. За роки
          своєї діяльності академія стала провідним центром професійного розвитку
          вчителів та науково-методичної роботи в галузі педагогіки.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20" />
        
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative pl-20">
              {/* Icon */}
              <div className="absolute left-0 top-0 w-16 h-16 bg-white border-4 border-primary/20 rounded-full flex items-center justify-center">
                {milestone.icon}
              </div>

              {/* Content */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-2xl font-bold text-accent">{milestone.year}</span>
                  <h3 className="text-xl font-bold text-primary">{milestone.title}</h3>
                </div>
                <p className="text-gray-700">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Historical Photos Placeholder */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-primary mb-6">Історичні фото</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
              <span className="text-6xl">📸</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistorySection;

