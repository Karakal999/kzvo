import { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, Award, Download, Filter } from 'lucide-react';
import type { Olympiad, OlympiadTask } from '../../types';
import { olympiads, olympiadTasks } from '../../data/competitions';
import { formatDate } from '../../utils/formatDate';
import ResultsTable from './ResultsTable';
import { mockResults } from '../../data/competitions';

const OlympiadsTab = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Get unique subjects
  const subjects = useMemo(() => {
    return ['all', ...Array.from(new Set(olympiads.map(o => o.subject)))];
  }, []);

  // Filter olympiads
  const filteredOlympiads = useMemo(() => {
    return olympiads.filter(olympiad => {
      if (selectedSubject !== 'all' && olympiad.subject !== selectedSubject) {
        return false;
      }
      if (selectedStage !== 'all' && olympiad.stage !== selectedStage) {
        return false;
      }
      return true;
    });
  }, [selectedSubject, selectedStage]);

  const getStatusColor = (status: Olympiad['status']) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-700 border-blue-300',
      registration: 'bg-green-100 text-green-700 border-green-300',
      ongoing: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      completed: 'bg-gray-100 text-gray-600 border-gray-300',
    };
    return colors[status];
  };

  const getStatusLabel = (status: Olympiad['status']) => {
    const labels = {
      upcoming: 'Очікується',
      registration: 'Реєстрація відкрита',
      ongoing: 'Проводиться',
      completed: 'Завершено',
    };
    return labels[status];
  };

  const getStageColor = (stage: Olympiad['stage']) => {
    const colors = {
      school: 'bg-blue-500',
      district: 'bg-green-500',
      regional: 'bg-orange-500',
      national: 'bg-red-500',
    };
    return colors[stage];
  };

  const getStageLabel = (stage: Olympiad['stage']) => {
    const labels = {
      school: 'Шкільний',
      district: 'Районний',
      regional: 'Обласний',
      national: 'Всеукраїнський',
    };
    return labels[stage];
  };

  const handleDownloadTask = (task: OlympiadTask) => {
    console.log('Downloading task:', task.olympiadSubject, task.year);
    alert(`Завантаження завдань: ${task.olympiadSubject} ${task.year} (${task.stage})`);
  };

  return (
    <div>
      {/* Info Banner */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-primary mb-3">
          📚 Всеукраїнські учнівські олімпіади
        </h3>
        <p className="text-gray-700 mb-4">
          Олімпіади проводяться у чотири етапи: шкільний, районний/міський, обласний та всеукраїнський. 
          Переможці та призери отримують дипломи та можуть скористатися пільгами при вступі до ВНЗ.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="text-gray-700">Шкільний етап</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span className="text-gray-700">Районний етап</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="text-gray-700">Обласний етап</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span className="text-gray-700">Всеукраїнський етап</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Фільтри</h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors md:hidden"
          >
            <Filter className="h-5 w-5" />
            <span>{showFilters ? 'Сховати' : 'Показати'}</span>
          </button>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Предмет
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="all">Всі предмети</option>
              {subjects.slice(1).map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          {/* Stage Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Етап
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            >
              <option value="all">Всі етапи</option>
              <option value="school">Шкільний</option>
              <option value="district">Районний</option>
              <option value="regional">Обласний</option>
              <option value="national">Всеукраїнський</option>
            </select>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Знайдено олімпіад: <span className="font-semibold text-primary">{filteredOlympiads.length}</span>
        </div>
      </div>

      {/* Olympiads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredOlympiads.map((olympiad) => (
          <div key={olympiad.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-3 h-3 rounded-full ${getStageColor(olympiad.stage)} flex-shrink-0 mt-1`}></div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(olympiad.status)}`}>
                {getStatusLabel(olympiad.status)}
              </span>
            </div>

            {/* Subject and Stage */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-primary mb-1">{olympiad.subject}</h3>
              <span className="text-sm font-semibold text-gray-600">{getStageLabel(olympiad.stage)} етап</span>
            </div>

            {/* Description */}
            {olympiad.description && (
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {olympiad.description}
              </p>
            )}

            {/* Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(olympiad.startDate)} - {formatDate(olympiad.endDate)}</span>
              </div>
              
              {olympiad.location && (
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{olympiad.location}</span>
                </div>
              )}

              {olympiad.grades && (
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Award className="h-4 w-4 text-primary" />
                  <span>{olympiad.grades}</span>
                </div>
              )}

              {(olympiad.participants || olympiad.maxParticipants) && (
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <Users className="h-4 w-4 text-primary" />
                  <span>
                    {olympiad.participants && `${olympiad.participants} учасників`}
                    {olympiad.maxParticipants && ` / ${olympiad.maxParticipants} місць`}
                  </span>
                </div>
              )}
            </div>

            {/* Registration Deadline */}
            {olympiad.registrationDeadline && olympiad.status === 'registration' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-green-800">
                  <span className="font-semibold">Реєстрація до:</span> {formatDate(olympiad.registrationDeadline)}
                </p>
              </div>
            )}

            {/* Action Button */}
            {olympiad.status === 'registration' && (
              <button className="w-full py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors">
                Зареєструватися
              </button>
            )}
            {olympiad.status === 'completed' && (
              <button 
                onClick={() => setShowResults(!showResults)}
                className="w-full py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                Переглянути результати
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Results Section */}
      {showResults && (
        <div className="mb-8">
          <ResultsTable 
            results={mockResults} 
            title="Протокол результатів (приклад)"
            showRegion={true}
          />
        </div>
      )}

      {/* Past Years Tasks */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Download className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold text-primary">Завдання минулих років</h3>
        </div>

        <p className="text-gray-700 mb-6">
          Завантажте завдання попередніх олімпіад для підготовки. Доступні завдання та відповіді різних етапів.
        </p>

        {/* Tasks by Subject */}
        <div className="space-y-6">
          {subjects.slice(1).map((subject) => {
            const subjectTasks = olympiadTasks.filter(task => task.olympiadSubject === subject);
            if (subjectTasks.length === 0) return null;

            return (
              <div key={subject} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Subject Header */}
                <div className="bg-primary/5 px-6 py-4 border-b border-gray-200">
                  <h4 className="text-lg font-bold text-primary">{subject}</h4>
                </div>

                {/* Tasks List */}
                <div className="divide-y divide-gray-200">
                  {subjectTasks.map((task) => (
                    <div key={task.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="font-bold text-gray-900">{task.year} рік</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                              {task.stage}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>📄 PDF</span>
                            <span>{task.fileSize}</span>
                            {task.hasAnswers && (
                              <span className="text-green-600 font-semibold">✓ Відповіді є</span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownloadTask(task)}
                            className="flex items-center space-x-2 px-4 py-2 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
                          >
                            <Download className="h-4 w-4" />
                            <span>Завдання</span>
                          </button>
                          {task.hasAnswers && (
                            <button
                              onClick={() => handleDownloadTask(task)}
                              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
                            >
                              <Download className="h-4 w-4" />
                              <span>Відповіді</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OlympiadsTab;

