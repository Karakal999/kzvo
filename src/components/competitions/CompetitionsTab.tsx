import { useState } from 'react';
import { Calendar, Users, Award, ExternalLink, FileText, Trophy } from 'lucide-react';
import type { Competition } from '../../types';
import { competitions } from '../../data/competitions';
import { formatDate } from '../../utils/formatDate';

const CompetitionsTab = () => {
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

  const getStatusColor = (status: Competition['status']) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-700 border-blue-300',
      registration: 'bg-green-100 text-green-700 border-green-300',
      ongoing: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      completed: 'bg-gray-100 text-gray-600 border-gray-300',
    };
    return colors[status];
  };

  const getStatusLabel = (status: Competition['status']) => {
    const labels = {
      upcoming: 'Очікується',
      registration: 'Реєстрація відкрита',
      ongoing: 'Проводиться',
      completed: 'Завершено',
    };
    return labels[status];
  };

  const handleViewRegulation = (competition: Competition) => {
    if (competition.regulationUrl) {
      console.log('Opening regulation:', competition.regulationUrl);
      alert(`Відкриття положення про конкурс: ${competition.title}`);
    }
  };

  const handleVisitWebsite = (website: string) => {
    console.log('Opening website:', website);
    window.open(website, '_blank');
  };

  return (
    <div>
      {/* Info Banner */}
      <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-primary mb-3">
          🏆 Всеукраїнські та міжнародні конкурси
        </h3>
        <p className="text-gray-700">
          Конкурси для учнів різних вікових категорій у галузях літератури, мистецтва, науки та творчості. 
          Переможці отримують дипломи, цінні призи та можливість участі у літніх школах та міжнародних програмах.
        </p>
      </div>

      {/* Competitions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {competitions.map((competition) => (
          <div 
            key={competition.id} 
            className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => setSelectedCompetition(competition)}
          >
            {/* Logo/Header */}
            <div className="bg-gradient-to-br from-primary to-blue-900 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-white/5 transform -skew-y-6"></div>
              <div className="relative">
                {competition.logo ? (
                  <img src={competition.logo} alt={competition.title} className="h-20 mx-auto" />
                ) : (
                  <Trophy className="h-16 w-16 text-white mx-auto mb-2" />
                )}
                <h3 className="text-white font-bold text-lg mt-3 line-clamp-2">
                  {competition.shortName}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Status Badge */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(competition.status)}`}>
                  {getStatusLabel(competition.status)}
                </span>
              </div>

              {/* Full Title */}
              <h4 className="text-sm font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {competition.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {competition.description}
              </p>

              {/* Dates */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="line-clamp-1">
                    {formatDate(competition.startDate)} - {formatDate(competition.endDate)}
                  </span>
                </div>
                {competition.status === 'registration' && (
                  <div className="bg-green-50 border border-green-200 rounded p-2">
                    <p className="text-xs text-green-800">
                      <span className="font-semibold">Реєстрація до:</span><br />
                      {formatDate(competition.registrationDeadline)}
                    </p>
                  </div>
                )}
              </div>

              {/* Age Categories */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-gray-700">Вікові категорії:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {competition.ageCategories.slice(0, 3).map((category, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {category}
                    </span>
                  ))}
                  {competition.ageCategories.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{competition.ageCategories.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Organizer */}
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-semibold">Організатор:</span> {competition.organizer}
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {competition.regulationUrl && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewRegulation(competition);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Положення</span>
                  </button>
                )}
                {competition.status === 'registration' && (
                  <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                    Зареєструватися
                  </button>
                )}
                {competition.website && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleVisitWebsite(competition.website!);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Сайт конкурсу</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Modal */}
      {selectedCompetition && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fadeIn"
          onClick={() => setSelectedCompetition(null)}
        >
          <div 
            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-blue-900 p-8 text-white">
              <h2 className="text-2xl font-bold mb-2">{selectedCompetition.title}</h2>
              <p className="text-blue-100">{selectedCompetition.organizer}</p>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="space-y-6">
                {/* Status */}
                <div>
                  <span className={`inline-block px-4 py-2 rounded-lg text-sm font-semibold border ${getStatusColor(selectedCompetition.status)}`}>
                    {getStatusLabel(selectedCompetition.status)}
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Про конкурс</h3>
                  <p className="text-gray-700">{selectedCompetition.description}</p>
                </div>

                {/* Dates */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Терміни проведення</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="text-gray-700">
                        <span className="font-semibold">Початок:</span> {formatDate(selectedCompetition.startDate)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="text-gray-700">
                        <span className="font-semibold">Закінчення:</span> {formatDate(selectedCompetition.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">
                        <span className="font-semibold">Реєстрація до:</span> {formatDate(selectedCompetition.registrationDeadline)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Age Categories */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Вікові категорії</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompetition.ageCategories.map((category, index) => (
                      <span key={index} className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium">
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Competition Categories */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Номінації</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCompetition.categories.map((category, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <Trophy className="h-5 w-5 text-accent" />
                        <span className="text-gray-700">{category}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prizes */}
                {selectedCompetition.prizes && selectedCompetition.prizes.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Призи</h3>
                    <ul className="space-y-2">
                      {selectedCompetition.prizes.map((prize, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-accent text-lg">✓</span>
                          <span className="text-gray-700">{prize}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setSelectedCompetition(null)}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Закрити
                  </button>
                  {selectedCompetition.regulationUrl && (
                    <button
                      onClick={() => handleViewRegulation(selectedCompetition)}
                      className="flex items-center space-x-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                    >
                      <FileText className="h-5 w-5" />
                      <span>Завантажити положення</span>
                    </button>
                  )}
                  {selectedCompetition.status === 'registration' && (
                    <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                      Зареєструватися
                    </button>
                  )}
                  {selectedCompetition.website && (
                    <button
                      onClick={() => handleVisitWebsite(selectedCompetition.website!)}
                      className="flex items-center space-x-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>Відвідати сайт</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionsTab;

