import { Calendar, Clock, MapPin, Users, DollarSign, AlertCircle } from 'lucide-react';
import type { CalendarEvent } from '../../types';
import { formatDate } from '../../utils/formatDate';
import type { EventStatus } from '../../hooks/useCalendarEvents';

interface CalendarEventCardProps {
  event: CalendarEvent;
  status: EventStatus;
  onRegister: (eventId: string) => void;
}

const CalendarEventCard = ({ event, status, onRegister }: CalendarEventCardProps) => {
  const getCategoryColor = (category: CalendarEvent['category']) => {
    const colors = {
      teachers: 'bg-primary/10 text-primary border-primary',
      students: 'bg-accent/10 text-accent border-accent',
      general: 'bg-purple-100 text-purple-700 border-purple-300',
    };
    return colors[category];
  };

  const getCategoryLabel = (category: CalendarEvent['category']) => {
    const labels = {
      teachers: 'Для вчителів',
      students: 'Для учнів',
      general: 'Загальне',
    };
    return labels[category];
  };

  const getStatusColor = (eventStatus: EventStatus) => {
    const colors = {
      planned: 'bg-blue-100 text-blue-700',
      ongoing: 'bg-green-100 text-green-700',
      completed: 'bg-gray-100 text-gray-600',
    };
    return colors[eventStatus];
  };

  const getStatusLabel = (eventStatus: EventStatus) => {
    const labels = {
      planned: 'Заплановано',
      ongoing: 'Триває',
      completed: 'Завершено',
    };
    return labels[eventStatus];
  };

  const hasLimitedSeats = event.maxParticipants && event.registeredParticipants !== undefined;
  const seatsLeft = hasLimitedSeats ? event.maxParticipants! - event.registeredParticipants! : 0;
  const isAlmostFull = hasLimitedSeats && seatsLeft < event.maxParticipants! * 0.2;
  const isFull = hasLimitedSeats && seatsLeft === 0;
  const canRegister = status === 'planned' && !isFull;

  const isDeadlinePassed = event.registrationDeadline && 
    new Date(event.registrationDeadline) < new Date();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(event.category)}`}>
            {getCategoryLabel(event.category)}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
            {getStatusLabel(status)}
          </span>
        </div>
        {event.isFree && (
          <span className="px-3 py-1 bg-accent text-white rounded-full text-xs font-semibold flex-shrink-0">
            Безкоштовно
          </span>
        )}
      </div>

      {/* Type Badge */}
      <div className="mb-3">
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-semibold">
          {event.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
        {event.title}
      </h3>

      {/* Description */}
      {event.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">
          {event.description}
        </p>
      )}

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        {/* Date and Time */}
        <div className="flex items-start space-x-2 text-sm text-gray-700">
          <Calendar className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <div>{formatDate(event.date)}</div>
            {event.endDate && event.endDate !== event.date && (
              <div className="text-gray-500">до {formatDate(event.endDate)}</div>
            )}
          </div>
        </div>

        {event.time && (
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Clock className="h-4 w-4 text-primary" />
            <span>{event.time} {event.endTime && `- ${event.endTime}`}</span>
          </div>
        )}

        {/* Location */}
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{event.location}</span>
        </div>

        {/* Participants */}
        {hasLimitedSeats && (
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span className={isAlmostFull ? 'text-orange-600 font-semibold' : 'text-gray-700'}>
              Зареєстровано: {event.registeredParticipants}/{event.maxParticipants}
              {isAlmostFull && !isFull && ' (мало місць)'}
            </span>
          </div>
        )}

        {/* Price */}
        {event.price && (
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>{event.price} грн</span>
          </div>
        )}

        {/* Registration Deadline */}
        {event.registrationDeadline && status === 'planned' && (
          <div className={`flex items-center space-x-2 text-sm ${isDeadlinePassed ? 'text-red-600' : 'text-gray-600'}`}>
            <AlertCircle className="h-4 w-4" />
            <span>
              Реєстрація до: {formatDate(event.registrationDeadline)}
              {isDeadlinePassed && ' (минув термін)'}
            </span>
          </div>
        )}
      </div>

      {/* Organizer */}
      {event.organizer && (
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Організатор:</span> {event.organizer}
        </div>
      )}

      {/* Register Button */}
      {status !== 'completed' && (
        <button
          onClick={() => onRegister(event.id)}
          disabled={!canRegister || !!isDeadlinePassed}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            !canRegister || isDeadlinePassed
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-blue-900'
          }`}
        >
          {isFull ? 'Місць немає' : 
           isDeadlinePassed ? 'Реєстрацію закрито' :
           status === 'ongoing' ? 'Подія триває' :
           'Зареєструватися'}
        </button>
      )}

      {status === 'completed' && (
        <div className="text-center py-3 bg-gray-100 rounded-lg text-gray-600 font-semibold">
          Подія завершена
        </div>
      )}
    </div>
  );
};

export default CalendarEventCard;

