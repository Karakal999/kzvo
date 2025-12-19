import { useState } from 'react';
import { GraduationCap, Award, Calendar, BookOpen } from 'lucide-react';
import QualificationSection from '../components/programs/QualificationSection';
import HigherEducationSection from '../components/programs/HigherEducationSection';
import AcademicCalendar from '../components/programs/AcademicCalendar';

type SectionType = 'qualification' | 'higher-education' | 'calendar';

const EducationPrograms = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('qualification');

  const sections = [
    {
      id: 'qualification' as SectionType,
      label: 'Підвищення кваліфікації',
      icon: <Award className="h-6 w-6" />,
      description: 'Курси та програми для вчителів',
    },
    {
      id: 'higher-education' as SectionType,
      label: 'Вища освіта',
      icon: <GraduationCap className="h-6 w-6" />,
      description: 'Магістратура та аспірантура',
    },
    {
      id: 'calendar' as SectionType,
      label: 'Графік навчального процесу',
      icon: <Calendar className="h-6 w-6" />,
      description: 'Календар подій та термінів',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Освітні програми</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Підвищення кваліфікації, програми вищої освіти та графік навчального процесу. 
            Оберіть напрямок, який вас цікавить.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-primary/20 rounded-lg p-5 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-3xl font-bold text-primary mb-1">50+</div>
            <div className="text-sm text-gray-600">Освітніх програм</div>
          </div>
          <div className="bg-white border border-accent/20 rounded-lg p-5 text-center">
            <Award className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-3xl font-bold text-primary mb-1">120</div>
            <div className="text-sm text-gray-600">Годин навчання</div>
          </div>
          <div className="bg-white border border-green-200 rounded-lg p-5 text-center">
            <GraduationCap className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-primary mb-1">1000+</div>
            <div className="text-sm text-gray-600">Випускників щороку</div>
          </div>
          <div className="bg-white border border-purple-200 rounded-lg p-5 text-center">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-primary mb-1">12</div>
            <div className="text-sm text-gray-600">Місяців навчання</div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-2 grid grid-cols-1 md:grid-cols-3 gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-4 px-6 py-4 rounded-lg font-semibold transition-all text-left ${
                  activeSection === section.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className={activeSection === section.id ? 'text-white' : 'text-primary'}>
                  {section.icon}
                </div>
                <div>
                  <div className="font-bold">{section.label}</div>
                  <div className={`text-xs ${activeSection === section.id ? 'text-blue-100' : 'text-gray-500'}`}>
                    {section.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section Content */}
        <div>
          {activeSection === 'qualification' && <QualificationSection />}
          {activeSection === 'higher-education' && <HigherEducationSection />}
          {activeSection === 'calendar' && <AcademicCalendar />}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-3">
            Потрібна консультація?
          </h3>
          <p className="text-gray-700 mb-4">
            Наші фахівці готові допомогти вам обрати оптимальну освітню програму та відповісти на всі питання.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📧 Email:</span>
              <a href="mailto:education@academy.edu.ua" className="text-primary hover:underline">
                education@academy.edu.ua
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📞 Телефон:</span>
              <a href="tel:+380442345683" className="text-primary hover:underline">
                +38 (044) 234-56-83
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">⏰ Години роботи:</span>
              <span>Пн-Пт 9:00-18:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPrograms;

