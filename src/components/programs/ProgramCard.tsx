import { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Tag, CheckCircle, X } from 'lucide-react';
import type { EducationProgram } from '../../types';
import { formatDate } from '../../utils/formatDate';

interface ProgramCardProps {
  program: EducationProgram;
  onClose: () => void;
  onRegister: (programId: string) => void;
}

type TabType = 'description' | 'program' | 'instructors' | 'cost';

const ProgramCard = ({ program, onClose, onRegister }: ProgramCardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('description');

  const tabs = [
    { id: 'description' as TabType, label: 'Опис' },
    { id: 'program' as TabType, label: 'Програма' },
    { id: 'instructors' as TabType, label: 'Викладачі' },
    { id: 'cost' as TabType, label: 'Вартість' },
  ];

  const getFormatLabel = (format: string) => {
    const labels = {
      online: 'Онлайн',
      offline: 'Очно',
      hybrid: 'Змішаний формат',
    };
    return labels[format as keyof typeof labels] || format;
  };

  const getFormatColor = (format: string) => {
    const colors = {
      online: 'bg-blue-100 text-blue-700',
      offline: 'bg-green-100 text-green-700',
      hybrid: 'bg-purple-100 text-purple-700',
    };
    return colors[format as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-xl w-full max-w-5xl my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-blue-900 p-6 md:p-8 text-white rounded-t-xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="pr-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getFormatColor(program.format)}`}>
                {getFormatLabel(program.format)}
              </span>
              {program.isFree && (
                <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-semibold">
                  Безкоштовно
                </span>
              )}
              {program.credits && (
                <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-semibold">
                  {program.credits} кредити
                </span>
              )}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{program.title}</h2>
            <p className="text-blue-100">{program.description}</p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="border-b border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900">{program.duration}</div>
                {program.durationHours && (
                  <div className="text-gray-600">{program.durationHours} годин</div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <div className="font-semibold text-gray-900">Початок</div>
                <div className="text-gray-600">{formatDate(program.startDate)}</div>
              </div>
            </div>
            {program.seatsTotal && (
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Місць</div>
                  <div className="text-gray-600">
                    {program.seatsAvailable} / {program.seatsTotal}
                  </div>
                </div>
              </div>
            )}
            {program.schedule && (
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <div className="font-semibold text-gray-900">Розклад</div>
                  <div className="text-gray-600 line-clamp-2">{program.schedule}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-6 py-4 font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-primary border-primary'
                    : 'text-gray-600 border-transparent hover:text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 md:p-8 max-h-[500px] overflow-y-auto">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Про курс</h3>
                <p className="text-gray-700 leading-relaxed">{program.description}</p>
              </div>

              {program.targetAudience && program.targetAudience.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Цільова аудиторія</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.targetAudience.map((audience, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {program.requirements && program.requirements.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Вимоги</h3>
                  <ul className="space-y-2">
                    {program.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {program.certificate && (
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <Tag className="h-6 w-6 text-accent" />
                    <div>
                      <div className="font-semibold text-gray-900">Документ про навчання</div>
                      <div className="text-gray-700">{program.certificate}</div>
                    </div>
                  </div>
                </div>
              )}

              {program.tags && program.tags.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Теги</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Program Tab */}
          {activeTab === 'program' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Навчальна програма</h3>
              {program.modules && program.modules.length > 0 ? (
                <div className="space-y-4">
                  {program.modules.map((module, index) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{module.title}</h4>
                            <p className="text-sm text-gray-600">{module.hours} годин</p>
                          </div>
                        </div>
                      </div>
                      {module.topics && module.topics.length > 0 && (
                        <ul className="ml-11 space-y-1">
                          {module.topics.map((topic, topicIndex) => (
                            <li key={topicIndex} className="text-gray-700 text-sm">
                              • {topic}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Всього годин:</span>
                      <span className="text-2xl font-bold text-primary">{program.durationHours}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">Детальна програма буде оприлюднена найближчим часом.</p>
              )}
            </div>
          )}

          {/* Instructors Tab */}
          {activeTab === 'instructors' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Викладачі курсу</h3>
              {program.instructors && program.instructors.length > 0 ? (
                <div className="space-y-6">
                  {program.instructors.map((instructor) => (
                    <div key={instructor.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-900 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                          {instructor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-1">{instructor.name}</h4>
                          <p className="text-primary font-semibold mb-3">{instructor.position}</p>
                          <p className="text-gray-700 mb-3">{instructor.bio}</p>
                          <div className="inline-block px-3 py-1 bg-accent/20 text-primary rounded-full text-sm font-semibold">
                            {instructor.specialization}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Інформація про викладачів буде оприлюднена найближчим часом.</p>
              )}
            </div>
          )}

          {/* Cost Tab */}
          {activeTab === 'cost' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Вартість навчання</h3>
              
              <div className="bg-gradient-to-br from-primary/5 to-blue-50 border border-primary/20 rounded-lg p-8 text-center">
                {program.isFree ? (
                  <>
                    <div className="text-5xl font-bold text-primary mb-4">Безкоштовно</div>
                    <p className="text-gray-700">Курс надається безоплатно для всіх учасників</p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-primary mb-2">
                      {program.price.toLocaleString()} грн
                    </div>
                    <p className="text-gray-600">за весь курс</p>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Що включено:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Всі навчальні матеріали</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Доступ до онлайн-платформи</span>
                  </li>
                  {program.certificate && (
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{program.certificate}</span>
                    </li>
                  )}
                  {program.credits && (
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{program.credits} кредити ЄКТС</span>
                    </li>
                  )}
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Консультації викладачів</span>
                  </li>
                </ul>
              </div>

              {!program.isFree && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-gray-700">
                    <span className="font-semibold">Примітка:</span> Можлива оплата частинами. 
                    Для уточнення деталей зв'яжіться з відділом організації навчання.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-xl">
          <div className="flex flex-wrap gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Закрити
            </button>
            <button
              onClick={() => onRegister(program.id)}
              className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
              disabled={program.seatsAvailable === 0}
            >
              {program.seatsAvailable === 0 ? 'Місць немає' : 'Зареєструватися'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;

