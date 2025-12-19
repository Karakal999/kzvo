import { useState } from 'react';
import { Trophy, Award, Star } from 'lucide-react';
import OlympiadsTab from '../components/competitions/OlympiadsTab';
import CompetitionsTab from '../components/competitions/CompetitionsTab';
import TeacherOfYearTab from '../components/competitions/TeacherOfYearTab';

type TabType = 'olympiads' | 'competitions' | 'teacher-year';

const Competitions = () => {
  const [activeTab, setActiveTab] = useState<TabType>('olympiads');

  const tabs = [
    {
      id: 'olympiads' as TabType,
      label: 'Олімпіади',
      icon: <Trophy className="h-5 w-5" />,
      description: 'Всеукраїнські предметні олімпіади',
    },
    {
      id: 'competitions' as TabType,
      label: 'Конкурси',
      icon: <Award className="h-5 w-5" />,
      description: 'Творчі та наукові конкурси',
    },
    {
      id: 'teacher-year' as TabType,
      label: 'Вчитель року',
      icon: <Star className="h-5 w-5" />,
      description: 'Конкурс професійної майстерності',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Олімпіади та конкурси</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Всеукраїнські та міжнародні олімпіади, конкурси та змагання для учнів та вчителів. 
            Інформація про етапи, реєстрацію, завдання минулих років та результати.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <Trophy className="h-10 w-10 text-blue-600" />
              <span className="text-3xl font-bold text-primary">10+</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Предметних олімпіад</h3>
            <p className="text-sm text-gray-600">4 етапи проведення</p>
          </div>

          <div className="bg-white border-2 border-accent/30 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <Award className="h-10 w-10 text-accent" />
              <span className="text-3xl font-bold text-primary">6+</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Всеукраїнських конкурсів</h3>
            <p className="text-sm text-gray-600">Різні номінації та категорії</p>
          </div>

          <div className="bg-white border-2 border-green-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <Star className="h-10 w-10 text-green-600" />
              <span className="text-3xl font-bold text-primary">5000+</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Учасників щороку</h3>
            <p className="text-sm text-gray-600">Учні та вчителі з усієї України</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-2 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[200px] flex items-center justify-center space-x-3 px-6 py-4 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <div className="text-left">
                  <div className="font-bold">{tab.label}</div>
                  <div className={`text-xs ${activeTab === tab.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {tab.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'olympiads' && <OlympiadsTab />}
          {activeTab === 'competitions' && <CompetitionsTab />}
          {activeTab === 'teacher-year' && <TeacherOfYearTab />}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-3">
            Потрібна додаткова інформація?
          </h3>
          <p className="text-gray-700 mb-4">
            З питань участі в олімпіадах та конкурсах звертайтесь до відділу роботи з обдарованою молоддю.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📧 Email:</span>
              <a href="mailto:olympiad@academy.edu.ua" className="text-primary hover:underline">
                olympiad@academy.edu.ua
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📞 Телефон:</span>
              <a href="tel:+380442345680" className="text-primary hover:underline">
                +38 (044) 234-56-80
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competitions;

