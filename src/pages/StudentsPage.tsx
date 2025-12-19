import { Trophy, Calendar, BookOpen, Star } from 'lucide-react';

const StudentsPage = () => {
  const competitions = [
    {
      icon: <Trophy className="h-10 w-10 text-accent" />,
      title: 'Олімпіади',
      description: 'Предметні олімпіади для учнів різних класів',
      status: 'Реєстрація відкрита',
    },
    {
      icon: <Star className="h-10 w-10 text-accent" />,
      title: 'Творчі конкурси',
      description: 'Конкурси з літератури, мистецтва та творчості',
      status: 'Триває прийом робіт',
    },
    {
      icon: <BookOpen className="h-10 w-10 text-accent" />,
      title: 'Наукові проекти',
      description: 'Конкурс науково-дослідницьких робіт',
      status: 'Скоро старт',
    },
    {
      icon: <Calendar className="h-10 w-10 text-accent" />,
      title: 'Майстер-класи',
      description: 'Освітні майстер-класи та воркшопи',
      status: 'Запис відкрито',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Учням та конкурси</h1>
      <div className="prose max-w-none mb-12">
        <p className="text-lg text-gray-700">
          Розділ для учнів: конкурси, олімпіади, освітні заходи та можливості розвитку.
        </p>
      </div>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {competitions.map((competition, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">{competition.icon}</div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-primary mb-2">{competition.title}</h3>
                <p className="text-gray-600 mb-3">{competition.description}</p>
                <span className="inline-block px-3 py-1 bg-accent/20 text-primary text-sm font-medium rounded-full">
                  {competition.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-accent to-yellow-500 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-primary mb-4">
          Готові взяти участь?
        </h2>
        <p className="text-gray-800 text-lg mb-6">
          Реєструйтеся на конкурси та олімпіади прямо зараз!
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors">
          Зареєструватися
        </button>
      </div>

      {/* Useful Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-primary mb-3">Правила участі</h3>
          <p className="text-gray-600 text-sm">
            Дізнайтеся про умови та вимоги для участі у конкурсах
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-primary mb-3">Минулі переможці</h3>
          <p className="text-gray-600 text-sm">
            Подивіться результати та роботи переможців минулих років
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-primary mb-3">Календар подій</h3>
          <p className="text-gray-600 text-sm">
            Актуальний розклад всіх освітніх заходів та конкурсів
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;

