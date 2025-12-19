import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Grid, Filter } from 'lucide-react';
import { useCalendarEvents } from '../../hooks/useCalendarEvents';
import type { ViewType, AudienceFilter, EventStatus } from '../../hooks/useCalendarEvents';
import CalendarEventCard from './CalendarEventCard';
import CalendarRegistrationModal from './CalendarRegistrationModal';
import type { CalendarRegistrationData } from './CalendarRegistrationModal';

const EventCalendar = () => {
  const {
    events,
    allEvents,
    view,
    setView,
    currentDate,
    filters,
    updateFilter,
    loading,
    getEventStatus,
    goToNextPeriod,
    goToPrevPeriod,
    goToToday,
  } = useCalendarEvents();

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const views: { id: ViewType; label: string; icon: any }[] = [
    { id: 'month', label: 'Місяць', icon: <Grid className="h-4 w-4" /> },
    { id: 'week', label: 'Тиждень', icon: <CalendarIcon className="h-4 w-4" /> },
    { id: 'list', label: 'Список', icon: <List className="h-4 w-4" /> },
  ];

  const getPeriodLabel = () => {
    const monthNames = [
      'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
      'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
    ];

    if (view === 'list') {
      return 'Всі події';
    }

    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  const handleRegister = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleSubmitRegistration = async (data: CalendarRegistrationData) => {
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Registration submitted:', data);
    alert(`Дякуємо за реєстрацію, ${data.fullName}!\nПідтвердження надіслано на ${data.email}`);
    setSelectedEventId(null);
  };

  const selectedEvent = allEvents.find(e => e.id === selectedEventId);

  const eventTypes = ['all', ...Array.from(new Set(allEvents.map(e => e.type)))];

  return (
    <div>
      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        {/* View Switcher and Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* View Buttons */}
          <div className="flex gap-2">
            {views.map((v) => (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  view === v.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {v.icon}
                <span>{v.label}</span>
              </button>
            ))}
          </div>

          {/* Period Navigation */}
          {view !== 'list' && (
            <div className="flex items-center space-x-4">
              <button
                onClick={goToPrevPeriod}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="min-w-[200px] text-center">
                <span className="text-lg font-bold text-primary">{getPeriodLabel()}</span>
              </div>
              <button
                onClick={goToNextPeriod}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Сьогодні
              </button>
            </div>
          )}

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Фільтри</span>
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Audience Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Аудиторія
                </label>
                <select
                  value={filters.audience}
                  onChange={(e) => updateFilter('audience', e.target.value as AudienceFilter)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Усі</option>
                  <option value="teachers">Для вчителів</option>
                  <option value="students">Для учнів</option>
                  <option value="general">Загальні</option>
                </select>
              </div>

              {/* Event Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Тип події
                </label>
                <select
                  value={filters.eventType}
                  onChange={(e) => updateFilter('eventType', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type === 'all' ? 'Усі типи' : type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Статус
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => updateFilter('status', e.target.value as EventStatus | 'all')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Усі статуси</option>
                  <option value="planned">Заплановано</option>
                  <option value="ongoing">Триває</option>
                  <option value="completed">Завершено</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Events Count */}
      <div className="mb-4 text-sm text-gray-600">
        Знайдено подій: <span className="font-semibold text-primary">{events.length}</span>
      </div>

      {/* Events Grid/List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Завантаження подій...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Подій не знайдено</p>
          <p className="text-gray-400">Спробуйте змінити фільтри або період</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <CalendarEventCard
              key={event.id}
              event={event}
              status={getEventStatus(event)}
              onRegister={handleRegister}
            />
          ))}
        </div>
      )}

      {/* Registration Modal */}
      {selectedEvent && (
        <CalendarRegistrationModal
          eventTitle={selectedEvent.title}
          isOpen={!!selectedEventId}
          onClose={() => setSelectedEventId(null)}
          onSubmit={handleSubmitRegistration}
        />
      )}
    </div>
  );
};

export default EventCalendar;

