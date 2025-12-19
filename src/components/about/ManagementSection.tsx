import { useState } from 'react';
import { Users, BookOpen, Award } from 'lucide-react';
import PersonCard from '../PersonCard';
import { rectorateTeam, academicCouncil, methodicalCouncil } from '../../data/about';

type SubSection = 'rectorate' | 'academic' | 'methodical';

const ManagementSection = () => {
  const [activeTab, setActiveTab] = useState<SubSection>('rectorate');

  const tabs = [
    { id: 'rectorate' as SubSection, label: 'Ректорат', icon: <Users className="h-5 w-5" /> },
    { id: 'academic' as SubSection, label: 'Вчена рада', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'methodical' as SubSection, label: 'Науково-методична рада', icon: <Award className="h-5 w-5" /> },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-primary mb-6">Керівництво та органи управління</h2>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

      {/* Rectorate */}
      {activeTab === 'rectorate' && (
        <div className="space-y-6">
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-6">
            <p className="text-gray-700">
              Ректорат академії є виконавчим органом, що забезпечує реалізацію стратегії
              розвитку, координує всі види діяльності та представляє інтереси академії.
            </p>
          </div>
          {rectorateTeam.map((person) => (
            <PersonCard key={person.id} person={person} variant="detailed" />
          ))}
        </div>
      )}

      {/* Academic Council */}
      {activeTab === 'academic' && (
        <div>
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-6">
            <p className="text-gray-700 mb-4">
              Вчена рада є колегіальним органом управління академією, що вирішує основні
              питання освітньої, наукової та фінансово-господарської діяльності.
            </p>
            <h3 className="font-bold text-primary mb-2">Основні функції:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Затвердження освітніх програм</li>
              <li>Присвоєння вчених звань</li>
              <li>Розгляд звітів про діяльність академії</li>
              <li>Прийняття рішень з кадрових питань</li>
            </ul>
          </div>

          <div className="space-y-4">
            {academicCouncil.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>

          <div className="mt-6 bg-accent/10 border border-accent/20 rounded-lg p-6">
            <h3 className="font-bold text-primary mb-3">Склад Вченої ради</h3>
            <p className="text-gray-700">
              До складу Вченої ради входять 25 членів, серед яких ректор, проректори,
              декани факультетів, завідувачі кафедр та представники студентського самоврядування.
            </p>
          </div>
        </div>
      )}

      {/* Methodical Council */}
      {activeTab === 'methodical' && (
        <div>
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg mb-6">
            <p className="text-gray-700 mb-4">
              Науково-методична рада координує науково-методичну роботу академії,
              розглядає та рекомендує до впровадження інноваційні методики навчання.
            </p>
            <h3 className="font-bold text-primary mb-2">Напрямки роботи:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Розробка та експертиза навчально-методичних матеріалів</li>
              <li>Впровадження інноваційних технологій навчання</li>
              <li>Координація наукових досліджень</li>
              <li>Організація методичних семінарів та конференцій</li>
            </ul>
          </div>

          <div className="space-y-4">
            {methodicalCouncil.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-primary mb-3">📚 Публікації</h3>
              <p className="text-gray-700">
                Рада координує видання наукових праць, методичних посібників
                та збірників статей викладачів академії.
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-bold text-primary mb-3">🎓 Семінари</h3>
              <p className="text-gray-700">
                Організація щомісячних методичних семінарів для обміну досвідом
                між викладачами різних кафедр.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementSection;

