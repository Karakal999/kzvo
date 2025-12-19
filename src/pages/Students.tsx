import { Link } from 'react-router-dom';
import { Trophy, Award, BookOpen, Calendar, ExternalLink, Target } from 'lucide-react';

const Students = () => {
  const quickLinks = [
    {
      title: 'Олімпіади та конкурси',
      description: 'Всеукраїнські предметні олімпіади, творчі та наукові конкурси',
      icon: <Trophy className="h-8 w-8" />,
      link: '/competitions',
      color: 'bg-blue-500',
    },
    {
      title: 'Календар подій',
      description: 'Розклад олімпіад, конкурсів та інших заходів для учнів',
      icon: <Calendar className="h-8 w-8" />,
      link: '/events',
      color: 'bg-green-500',
    },
    {
      title: 'Мала академія наук',
      description: 'Науково-дослідницька робота та захист проєктів',
      icon: <BookOpen className="h-8 w-8" />,
      link: '/man',
      color: 'bg-purple-500',
    },
  ];

  const resources = [
    {
      title: 'Підготовка до олімпіад',
      items: ['Завдання минулих років', 'Методичні матеріали', 'Онлайн-тренування'],
    },
    {
      title: 'Конкурси',
      items: ['Петра Яцика', 'Шевченківський', 'Талант і слово'],
    },
    {
      title: 'Літні школи',
      items: ['Наукові табори', 'Мовні школи', 'IT-школи'],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-blue-900 rounded-xl p-8 md:p-12 text-white mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Учням та абітурієнтам</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Олімпіади, конкурси, наукові змагання та освітні програми для розвитку обдарованої молоді
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              to={link.link}
              className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-primary transition-all group"
            >
              <div className={`w-16 h-16 ${link.color} rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {link.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                {link.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {link.description}
              </p>
              <div className="flex items-center space-x-2 text-primary font-semibold">
                <span>Перейти</span>
                <ExternalLink className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {resources.map((resource, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-4 flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>{resource.title}</span>
              </h3>
              <ul className="space-y-2">
                {resource.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-2 text-gray-700">
                    <span className="text-accent mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-primary/20 rounded-lg p-8">
            <Trophy className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-3">Олімпіади</h3>
            <p className="text-gray-700 mb-4">
              Всеукраїнські предметні олімпіади проводяться у 4 етапи: шкільний, районний, обласний та всеукраїнський.
            </p>
            <Link 
              to="/competitions" 
              className="inline-flex items-center space-x-2 text-primary font-semibold hover:underline"
            >
              <span>Дізнатись більше</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>

          <div className="bg-white border border-accent/20 rounded-lg p-8">
            <Award className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-3">Конкурси</h3>
            <p className="text-gray-700 mb-4">
              Творчі та наукові конкурси різних напрямків: мова, література, мистецтво, природничі науки.
            </p>
            <Link 
              to="/competitions" 
              className="inline-flex items-center space-x-2 text-primary font-semibold hover:underline"
            >
              <span>Переглянути конкурси</span>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-accent/20 to-yellow-100 border border-accent/30 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            Готові розкрити свій потенціал?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Приєднуйтесь до тисяч талановитих учнів, які щороку беруть участь в олімпіадах та конкурсах. 
            Досягайте нових висот разом з нами!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/competitions"
              className="px-8 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-900 transition-colors"
            >
              Переглянути всі змагання
            </Link>
            <Link
              to="/events"
              className="px-8 py-3 bg-white text-primary border-2 border-primary rounded-lg font-bold hover:bg-primary/5 transition-colors"
            >
              Календар подій
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-3">
            Маєте питання?
          </h3>
          <p className="text-gray-700 mb-4">
            Відділ роботи з обдарованими учнями завжди готовий допомогти.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📧 Email:</span>
              <a href="mailto:students@academy.edu.ua" className="text-primary hover:underline">
                students@academy.edu.ua
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📞 Телефон:</span>
              <a href="tel:+380442345681" className="text-primary hover:underline">
                +38 (044) 234-56-81
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
