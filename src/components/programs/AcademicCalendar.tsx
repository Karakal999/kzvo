import { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Calendar as CalendarIcon } from 'lucide-react';
import { academicEvents } from '../../data/programs';

const AcademicCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay() || 7; // Make Monday = 1

    return { daysInMonth, startDayOfWeek: startDayOfWeek - 1 };
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return academicEvents.filter(event => event.date === dateStr);
  };

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const handleExport = (type: 'google' | 'outlook') => {
    console.log('Exporting to', type);
    alert(`Експорт до ${type === 'google' ? 'Google Calendar' : 'Outlook'} (демо)`);
  };

  const { daysInMonth, startDayOfWeek } = getMonthDays(currentMonth);
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  const getEventTypeLabel = (type: string) => {
    const labels = {
      'semester-start': 'Початок семестру',
      'semester-end': 'Кінець семестру',
      'exam': 'Екзамени',
      'holiday': 'Канікули',
      'deadline': 'Дедлайн',
      'event': 'Подія',
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div>
      {/* Controls */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={goToPrevMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-primary min-w-[200px] text-center">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Сьогодні
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleExport('google')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm font-semibold">Google Calendar</span>
            </button>
            <button
              onClick={() => handleExport('outlook')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm font-semibold">Outlook</span>
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          {weekDays.map((day) => (
            <div key={day} className="p-4 text-center font-bold text-gray-700 text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7">
          {/* Empty cells before first day */}
          {Array.from({ length: startDayOfWeek }).map((_, index) => (
            <div key={`empty-${index}`} className="border-b border-r border-gray-200 p-2 bg-gray-50 min-h-[100px]"></div>
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const events = getEventsForDay(day);
            const isToday = 
              day === new Date().getDate() &&
              currentMonth.getMonth() === new Date().getMonth() &&
              currentMonth.getFullYear() === new Date().getFullYear();

            return (
              <div
                key={day}
                className={`border-b border-r border-gray-200 p-2 min-h-[100px] hover:bg-gray-50 transition-colors ${
                  isToday ? 'bg-primary/5' : ''
                }`}
              >
                <div className={`text-sm font-bold mb-2 ${isToday ? 'text-primary' : 'text-gray-900'}`}>
                  {day}
                  {isToday && (
                    <span className="ml-2 px-2 py-0.5 bg-primary text-white rounded-full text-xs">
                      Сьогодні
                    </span>
                  )}
                </div>
                <div className="space-y-1">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: event.color + '20', borderLeft: `3px solid ${event.color}` }}
                      title={event.description}
                    >
                      <div className="font-semibold line-clamp-2" style={{ color: event.color }}>
                        {event.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Типи подій:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { type: 'semester-start', color: '#10b981', label: 'Початок семестру' },
            { type: 'semester-end', color: '#8b5cf6', label: 'Кінець семестру' },
            { type: 'exam', color: '#ef4444', label: 'Екзамени' },
            { type: 'holiday', color: '#f59e0b', label: 'Канікули' },
            { type: 'deadline', color: '#ec4899', label: 'Дедлайни' },
            { type: 'event', color: '#3b82f6', label: 'Події' },
          ].map((item) => (
            <div key={item.type} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events List */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <CalendarIcon className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold text-primary">Найближчі події</h3>
        </div>
        <div className="space-y-4">
          {academicEvents
            .filter(event => new Date(event.date) >= new Date())
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, 5)
            .map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div
                  className="w-16 h-16 rounded-lg flex flex-col items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: event.color + '20' }}
                >
                  <div className="text-2xl font-bold" style={{ color: event.color }}>
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs uppercase" style={{ color: event.color }}>
                    {monthNames[new Date(event.date).getMonth()].slice(0, 3)}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {getEventTypeLabel(event.type)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;

