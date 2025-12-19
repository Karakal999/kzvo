import { useState } from 'react';
import { History, Users, Building, FileText, Newspaper } from 'lucide-react';
import SidebarNav from '../components/SidebarNav';
import HistorySection from '../components/about/HistorySection';
import ManagementSection from '../components/about/ManagementSection';
import StructureSection from '../components/about/StructureSection';
import PublicInfoSection from '../components/about/PublicInfoSection';
import MediaSection from '../components/about/MediaSection';

type Section = 'history' | 'management' | 'structure' | 'public' | 'media';

const About = () => {
  const [activeSection, setActiveSection] = useState<Section>('history');

  const navItems = [
    { id: 'history' as Section, label: 'Історія', icon: <History className="h-5 w-5" /> },
    { id: 'management' as Section, label: 'Керівництво', icon: <Users className="h-5 w-5" /> },
    { id: 'structure' as Section, label: 'Структура', icon: <Building className="h-5 w-5" /> },
    { id: 'public' as Section, label: 'Публічна інформація', icon: <FileText className="h-5 w-5" /> },
    { id: 'media' as Section, label: 'Академія у медіа', icon: <Newspaper className="h-5 w-5" /> },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'history':
        return <HistorySection />;
      case 'management':
        return <ManagementSection />;
      case 'structure':
        return <StructureSection />;
      case 'public':
        return <PublicInfoSection />;
      case 'media':
        return <MediaSection />;
      default:
        return <HistorySection />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Про академію</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Академія педагогічної освіти — провідний освітній заклад України з підготовки
            та підвищення кваліфікації педагогічних кадрів.
          </p>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <SidebarNav
              items={navItems}
              activeId={activeSection}
              onItemClick={(id) => setActiveSection(id as Section)}
            />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
