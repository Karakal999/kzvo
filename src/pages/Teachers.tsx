import { GraduationCap, Lightbulb, BookOpen } from 'lucide-react';
import SidebarNav from '../components/SidebarNav';
import ProfessionalDevelopment from '../components/teachers/ProfessionalDevelopment';
import NUSHReform from '../components/teachers/NUSHReform';
import JournalSection from '../components/teachers/JournalSection';
import { useTeachersNavigation } from '../hooks/useTeachersNavigation';
import type { TeachersSection } from '../hooks/useTeachersNavigation';

const Teachers = () => {
  const {
    activeSection,
    activeDevelopmentTab,
    setActiveSection,
    setActiveDevelopmentTab,
  } = useTeachersNavigation();

  const navItems = [
    {
      id: 'development' as TeachersSection,
      label: 'Професійний розвиток',
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      id: 'nush' as TeachersSection,
      label: 'Реформа НУШ',
      icon: <Lightbulb className="h-5 w-5" />,
    },
    {
      id: 'journal' as TeachersSection,
      label: 'Журнал "Наша школа"',
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'development':
        return (
          <ProfessionalDevelopment
            activeTab={activeDevelopmentTab}
            onTabChange={setActiveDevelopmentTab}
          />
        );
      case 'nush':
        return <NUSHReform />;
      case 'journal':
        return <JournalSection />;
      default:
        return <ProfessionalDevelopment activeTab={activeDevelopmentTab} onTabChange={setActiveDevelopmentTab} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Вчителю</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Ресурси для професійного розвитку, методичні матеріали з впровадження НУШ
            та фахові публікації для педагогів.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <SidebarNav
              items={navItems}
              activeId={activeSection}
              onItemClick={(id) => setActiveSection(id as TeachersSection)}
            />

            {/* Quick Stats */}
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-primary mb-3">📊 Статистика</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Активних курсів:</span>
                  <span className="font-bold text-primary">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Спільнот:</span>
                  <span className="font-bold text-primary">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Матеріалів НУШ:</span>
                  <span className="font-bold text-primary">48</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teachers;
