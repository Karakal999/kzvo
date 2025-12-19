import { useState } from 'react';
import { Calendar, Users as UsersIcon, Award, Filter } from 'lucide-react';
import EventCard from './EventCard';
import RegistrationModal from './RegistrationModal';
import type { RegistrationData } from './RegistrationModal';
import { teachersEvents, communities } from '../../data/teachers';
import type { DevelopmentTab } from '../../hooks/useTeachersNavigation';

interface ProfessionalDevelopmentProps {
  activeTab: DevelopmentTab;
  onTabChange: (tab: DevelopmentTab) => void;
}

const ProfessionalDevelopment = ({ activeTab, onTabChange }: ProfessionalDevelopmentProps) => {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [filterTheme, setFilterTheme] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const tabs = [
    { id: 'calendar' as DevelopmentTab, label: 'Календар заходів', icon: <Calendar className="h-5 w-5" /> },
    { id: 'communities' as DevelopmentTab, label: 'Професійні спільноти', icon: <UsersIcon className="h-5 w-5" /> },
    { id: 'attestation' as DevelopmentTab, label: 'Атестація', icon: <Award className="h-5 w-5" /> },
  ];

  const themes = ['all', ...Array.from(new Set(teachersEvents.map(e => e.theme)))];

  const filteredEvents = teachersEvents.filter(event => {
    const themeMatch = filterTheme === 'all' || event.theme === filterTheme;
    const typeMatch = filterType === 'all' || event.type === filterType;
    return themeMatch && typeMatch;
  });

  const handleRegister = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleSubmitRegistration = (data: RegistrationData) => {
    console.log('Registration data:', data);
    alert(`Дякуємо за реєстрацію, ${data.fullName}! Ми надішлемо підтвердження на ${data.email}`);
  };

  const selectedEvent = teachersEvents.find(e => e.id === selectedEventId);

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Професійний розвиток</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div>
          {/* Filters */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <Filter className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-bold text-gray-900">Фільтри</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тематика
                </label>
                <select
                  value={filterTheme}
                  onChange={(e) => setFilterTheme(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Усі теми</option>
                  {themes.filter(t => t !== 'all').map((theme) => (
                    <option key={theme} value={theme}>{theme}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип заходу
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Усі типи</option>
                  <option value="course">Курси</option>
                  <option value="webinar">Вебінари</option>
                  <option value="seminar">Семінари</option>
                  <option value="conference">Конференції</option>
                </select>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onRegister={handleRegister} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">За обраними фільтрами заходів не знайдено</p>
            </div>
          )}
        </div>
      )}

      {/* Communities Tab */}
      {activeTab === 'communities' && (
        <div>
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-6">
            <p className="text-gray-700">
              Приєднуйтесь до професійних спільнот для обміну досвідом, методичними 
              матеріалами та спілкування з колегами.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {communities.map((community) => (
              <div
                key={community.id}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{community.name}</h3>
                    <p className="text-gray-600 mb-3">{community.description}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Учасників:</span>
                    <span className="font-semibold text-primary">{community.members}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Категорія:</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                      {community.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Модератор:</span>
                    <span className="font-medium">{community.moderator}</span>
                  </div>
                </div>

                <button className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                  Приєднатися
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Attestation Tab */}
      {activeTab === 'attestation' && (
        <div>
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-6">
            <p className="text-lg text-gray-700">
              Інформація про атестацію педагогічних працівників, терміни, вимоги та процедура.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-primary/20 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-primary mb-4">📋 Етапи атестації</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li className="pl-2">Подання заяви та документів (до 1 березня)</li>
                <li className="pl-2">Перевірка документів атестаційною комісією</li>
                <li className="pl-2">Відвідування уроків/занять експертами</li>
                <li className="pl-2">Захист атестаційної роботи</li>
                <li className="pl-2">Рішення атестаційної комісії</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-3">📁 Необхідні документи</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Заява на атестацію</li>
                  <li>Копія диплома про освіту</li>
                  <li>Портфоліо досягнень</li>
                  <li>Атестаційна робота</li>
                </ul>
                <button className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors">
                  Завантажити зразки
                </button>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <h3 className="text-xl font-bold text-primary mb-3">📅 Терміни 2025</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Подання заяв:</strong> до 1 березня</p>
                  <p><strong>Експертиза:</strong> березень - квітень</p>
                  <p><strong>Захист:</strong> травень</p>
                  <p><strong>Результати:</strong> до 1 червня</p>
                </div>
                <button className="mt-4 px-4 py-2 bg-white border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                  Графік атестації
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {selectedEvent && (
        <RegistrationModal
          eventTitle={selectedEvent.title}
          isOpen={!!selectedEventId}
          onClose={() => setSelectedEventId(null)}
          onSubmit={handleSubmitRegistration}
        />
      )}
    </div>
  );
};

export default ProfessionalDevelopment;

