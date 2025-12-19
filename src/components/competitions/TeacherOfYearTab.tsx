import { Award, Calendar, User, FileText, Trophy, Star, Video, BookOpen } from 'lucide-react';

const TeacherOfYearTab = () => {
  const stages = [
    {
      id: 1,
      title: 'І етап - Шкільний',
      period: 'Вересень - Жовтень',
      description: 'Проведення конкурсу в закладах освіти. Переможці від кожної школи проходять до наступного етапу.',
      tasks: ['Самопрезентація', 'Відкритий урок', 'Портфоліо'],
    },
    {
      id: 2,
      title: 'ІІ етап - Районний/Міський',
      period: 'Листопад - Грудень',
      description: 'Конкурс серед переможців шкільного етапу на рівні району або міста.',
      tasks: ['Відкритий урок', 'Виховний захід', 'Презентація педагогічного досвіду'],
    },
    {
      id: 3,
      title: 'ІІІ етап - Обласний',
      period: 'Січень - Лютий',
      description: 'Обласний етап конкурсу. Переможці представляють область на всеукраїнському етапі.',
      tasks: ['Майстер-клас', 'Круглий стіл', 'Захист інноваційного проєкту'],
    },
    {
      id: 4,
      title: 'ІV етап - Всеукраїнський',
      period: 'Березень - Квітень',
      description: 'Фінальний етап конкурсу з визначенням переможців у кожній номінації.',
      tasks: ['Відкритий урок', 'Майстер-клас', 'Презентація досвіду', 'Публічне виступ'],
    },
  ];

  const nominations = [
    {
      id: 1,
      title: 'Українська мова та література',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'bg-blue-500',
    },
    {
      id: 2,
      title: 'Математика',
      icon: <Star className="h-8 w-8" />,
      color: 'bg-purple-500',
    },
    {
      id: 3,
      title: 'Іноземна мова',
      icon: <BookOpen className="h-8 w-8" />,
      color: 'bg-green-500',
    },
    {
      id: 4,
      title: 'Вчитель початкових класів',
      icon: <Award className="h-8 w-8" />,
      color: 'bg-yellow-500',
    },
    {
      id: 5,
      title: 'Класний керівник',
      icon: <User className="h-8 w-8" />,
      color: 'bg-red-500',
    },
    {
      id: 6,
      title: 'Вихователь закладу дошкільної освіти',
      icon: <Trophy className="h-8 w-8" />,
      color: 'bg-pink-500',
    },
  ];

  const winners2023 = [
    {
      name: 'Петренко Ольга Іванівна',
      nomination: 'Українська мова та література',
      school: 'Гімназія №42, м. Київ',
      award: 'Переможець',
    },
    {
      name: 'Коваленко Дмитро Петрович',
      nomination: 'Математика',
      school: 'Ліцей №15, м. Львів',
      award: 'Переможець',
    },
    {
      name: 'Мельник Світлана Василівна',
      nomination: 'Іноземна мова',
      school: 'Школа №8, м. Одеса',
      award: 'Переможець',
    },
  ];

  const requirements = [
    'Вища освіта',
    'Стаж педагогічної роботи не менше 3 років',
    'Наявність атестації (категорія)',
    'Відсутність дисциплінарних стягнень',
    'Інноваційна педагогічна діяльність',
    'Високі результати навчання учнів',
  ];

  const documents = [
    { name: 'Положення про конкурс "Вчитель року - 2025"', type: 'PDF', size: '890 KB' },
    { name: 'Заявка на участь у конкурсі', type: 'DOCX', size: '45 KB' },
    { name: 'Вимоги до портфоліо', type: 'PDF', size: '234 KB' },
    { name: 'Критерії оцінювання', type: 'PDF', size: '567 KB' },
    { name: 'Методичні рекомендації', type: 'PDF', size: '1.2 MB' },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-blue-900 rounded-xl p-8 md:p-12 text-white mb-8">
        <div className="flex items-center space-x-4 mb-4">
          <Trophy className="h-12 w-12 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold">Учитель року - 2025</h2>
        </div>
        <p className="text-blue-100 text-lg mb-6">
          Всеукраїнський конкурс педагогічної майстерності для вчителів та вихователів
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-accent" />
            <span>Вересень 2024 - Квітень 2025</span>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-accent" />
            <span>6 номінацій</span>
          </div>
        </div>
      </div>

      {/* About Competition */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-bold text-primary mb-4">Про конкурс</h3>
        <p className="text-gray-700 mb-4">
          Всеукраїнський конкурс "Вчитель року" - це престижне щорічне змагання педагогічних працівників, 
          спрямоване на виявлення, підтримку та популяризацію кращих практик у сфері освіти. 
          Конкурс проводиться з 1992 року та є важливою платформою для професійного зростання вчителів.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">30+</div>
            <div className="text-gray-700">Років традицій</div>
          </div>
          <div className="bg-accent/10 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">5000+</div>
            <div className="text-gray-700">Учасників щороку</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-gray-700">Номінацій</div>
          </div>
        </div>
      </div>

      {/* Nominations */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-primary mb-6">Номінації конкурсу</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nominations.map((nomination) => (
            <div key={nomination.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
              <div className={`w-16 h-16 ${nomination.color} rounded-full flex items-center justify-center text-white mb-4`}>
                {nomination.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900">{nomination.title}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Stages */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-primary mb-6">Етапи конкурсу</h3>
        <div className="space-y-4">
          {stages.map((stage) => (
            <div key={stage.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-primary/5 px-6 py-4 flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {stage.id}
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-primary">{stage.title}</h4>
                  <p className="text-sm text-gray-600">{stage.period}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{stage.description}</p>
                <div>
                  <span className="text-sm font-semibold text-gray-700 mb-2 block">Конкурсні завдання:</span>
                  <div className="flex flex-wrap gap-2">
                    {stage.tasks.map((task, taskIndex) => (
                      <span key={taskIndex} className="px-3 py-1 bg-accent/20 text-primary rounded-full text-sm font-medium">
                        {task}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-8">
        <h3 className="text-2xl font-bold text-primary mb-6">Вимоги до учасників</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requirements.map((requirement, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <span className="text-gray-700">{requirement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Winners 2023 */}
      <div className="bg-gradient-to-br from-accent/20 to-yellow-100 border border-accent/30 rounded-lg p-6 md:p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Trophy className="h-8 w-8 text-accent" />
          <h3 className="text-2xl font-bold text-primary">Переможці 2023 року</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {winners2023.map((winner, idx) => (
            <div key={idx} className="bg-white rounded-lg p-6 shadow-md">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                {idx + 1}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{winner.name}</h4>
              <p className="text-sm text-gray-600 mb-1">{winner.nomination}</p>
              <p className="text-sm text-gray-500">{winner.school}</p>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                  {winner.award}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold text-primary">Документи конкурсу</h3>
        </div>
        <div className="space-y-3">
          {documents.map((doc, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3 flex-1">
                <FileText className="h-8 w-8 text-red-500" />
                <div>
                  <div className="font-semibold text-gray-900">{doc.name}</div>
                  <div className="text-sm text-gray-600">{doc.type} • {doc.size}</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                Завантажити
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Materials */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <Video className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold text-primary">Відеоматеріали</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <Video className="h-16 w-16 text-gray-400" />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-2">Відкриття конкурсу 2023</h4>
              <p className="text-sm text-gray-600">Урочиста церемонія відкриття всеукраїнського етапу</p>
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-200 h-48 flex items-center justify-center">
              <Video className="h-16 w-16 text-gray-400" />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-2">Майстер-класи переможців</h4>
              <p className="text-sm text-gray-600">Кращі педагогічні практики від переможців</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary to-blue-900 rounded-xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Готові взяти участь?</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Реєстрація на конкурс "Вчитель року - 2025" розпочнеться у вересні 2024 року. 
          Слідкуйте за оновленнями на нашому сайті.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-3 bg-accent text-white rounded-lg font-bold hover:bg-yellow-600 transition-colors">
            Підписатися на оновлення
          </button>
          <button className="px-8 py-3 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transition-colors">
            Зв'язатися з нами
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherOfYearTab;

