import { BookOpen, Users, Award, Lightbulb } from 'lucide-react';

const TeachersPage = () => {
  const resources = [
    {
      icon: <BookOpen className="h-10 w-10 text-accent" />,
      title: 'Методичні матеріали',
      description: 'Сучасні методики та рекомендації для викладання',
    },
    {
      icon: <Users className="h-10 w-10 text-accent" />,
      title: 'Професійний розвиток',
      description: 'Курси підвищення кваліфікації та майстер-класи',
    },
    {
      icon: <Award className="h-10 w-10 text-accent" />,
      title: 'Сертифікація',
      description: 'Програми атестації та отримання сертифікатів',
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-accent" />,
      title: 'Інноваційні підходи',
      description: 'Нові технології та методи в освіті',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Вчителю</h1>
      <div className="prose max-w-none mb-12">
        <p className="text-lg text-gray-700">
          Розділ для педагогів: методична підтримка, професійний розвиток, корисні матеріали.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-accent"
          >
            <div className="mb-4">{resource.icon}</div>
            <h3 className="text-xl font-bold text-primary mb-2">{resource.title}</h3>
            <p className="text-gray-600">{resource.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-primary to-blue-900 text-white rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Підпишіться на оновлення</h2>
        <p className="mb-6">
          Отримуйте інформацію про нові методичні матеріали та події для педагогів.
        </p>
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Ваш email"
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button className="bg-accent text-primary px-6 py-2 rounded-lg font-semibold hover:bg-accent-400 transition-colors">
            Підписатися
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeachersPage;

