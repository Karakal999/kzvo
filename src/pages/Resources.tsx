import { useState } from 'react';
import { FileText, BookOpen, Award, GraduationCap } from 'lucide-react';
import DocumentBrowser from '../components/documents/DocumentBrowser';
import { 
  nushDocuments, 
  normativeDocuments, 
  methodicalDocuments,
  attestationDocuments,
  allDocuments 
} from '../data/documents';

type ResourceTab = 'all' | 'nush' | 'normative' | 'methodical' | 'attestation';

const Resources = () => {
  const [activeTab, setActiveTab] = useState<ResourceTab>('all');

  const tabs = [
    { 
      id: 'all' as ResourceTab, 
      label: 'Всі документи', 
      icon: <FileText className="h-5 w-5" />,
      count: allDocuments.length 
    },
    { 
      id: 'nush' as ResourceTab, 
      label: 'НУШ', 
      icon: <GraduationCap className="h-5 w-5" />,
      count: nushDocuments.length 
    },
    { 
      id: 'normative' as ResourceTab, 
      label: 'Нормативні документи', 
      icon: <BookOpen className="h-5 w-5" />,
      count: normativeDocuments.length 
    },
    { 
      id: 'methodical' as ResourceTab, 
      label: 'Методичні матеріали', 
      icon: <FileText className="h-5 w-5" />,
      count: methodicalDocuments.length 
    },
    { 
      id: 'attestation' as ResourceTab, 
      label: 'Атестація', 
      icon: <Award className="h-5 w-5" />,
      count: attestationDocuments.length 
    },
  ];

  const getDocuments = () => {
    switch (activeTab) {
      case 'nush':
        return nushDocuments;
      case 'normative':
        return normativeDocuments;
      case 'methodical':
        return methodicalDocuments;
      case 'attestation':
        return attestationDocuments;
      default:
        return allDocuments;
    }
  };

  const getTitle = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab ? tab.label : 'Документи';
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Ресурси та документи</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Нормативні документи, методичні матеріали, навчальні програми та інші корисні ресурси 
            для педагогічних працівників та учасників освітнього процесу.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-primary/20 rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">{nushDocuments.length}</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Документи НУШ</h3>
            <p className="text-sm text-gray-600">Матеріали з Нової української школи</p>
          </div>

          <div className="bg-white border border-accent/20 rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-primary">{normativeDocuments.length}</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Нормативні документи</h3>
            <p className="text-sm text-gray-600">Закони, постанови та накази</p>
          </div>

          <div className="bg-white border border-green-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <FileText className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-primary">{methodicalDocuments.length}</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Методичні матеріали</h3>
            <p className="text-sm text-gray-600">Посібники та рекомендації</p>
          </div>

          <div className="bg-white border border-purple-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-primary">{attestationDocuments.length}</span>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Атестація</h3>
            <p className="text-sm text-gray-600">Документи для атестації</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Document Browser */}
        <DocumentBrowser 
          documents={getDocuments()} 
          title={getTitle()}
          showCategoryFilter={activeTab === 'all'}
          showSearch={true}
        />

        {/* Additional Info */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-primary mb-3">
            Потрібна допомога з документами?
          </h3>
          <p className="text-gray-700 mb-4">
            Якщо ви не знайшли потрібний документ або маєте питання щодо використання матеріалів, 
            зв'яжіться з нашою бібліотекою або методичним відділом.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📧 Email:</span>
              <a href="mailto:library@academy.edu.ua" className="text-primary hover:underline">
                library@academy.edu.ua
              </a>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold">📞 Телефон:</span>
              <a href="tel:+380442345679" className="text-primary hover:underline">
                +38 (044) 234-56-79
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
