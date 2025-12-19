import { Calendar, MapPin, Users, Award, DollarSign } from 'lucide-react';
import type { TeachersEvent } from '../../types';
import { formatDate } from '../../utils/formatDate';

interface EventCardProps {
  event: TeachersEvent;
  onRegister: (eventId: string) => void;
}

const EventCard = ({ event, onRegister }: EventCardProps) => {
  const getTypeLabel = (type: TeachersEvent['type']) => {
    const labels = {
      course: 'Курс',
      webinar: 'Вебінар',
      seminar: 'Семінар',
      conference: 'Конференція',
    };
    return labels[type];
  };

  const getTypeColor = (type: TeachersEvent['type']) => {
    const colors = {
      course: 'bg-primary/10 text-primary',
      webinar: 'bg-blue-100 text-blue-700',
      seminar: 'bg-green-100 text-green-700',
      conference: 'bg-purple-100 text-purple-700',
    };
    return colors[type];
  };

  const hasLimitedSeats = event.seats && event.seatsAvailable !== undefined;
  const isAlmostFull = hasLimitedSeats && event.seatsAvailable! < event.seats! * 0.3;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTypeColor(event.type)}`}>
          {getTypeLabel(event.type)}
        </span>
        {event.isFree && (
          <span className="px-3 py-1 bg-accent text-white rounded-full text-sm font-semibold">
            Безкоштовно
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
        {event.title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Info Grid */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{formatDate(event.date)}</span>
          {event.endDate && <span> - {formatDate(event.endDate)}</span>}
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <MapPin className="h-4 w-4 text-primary" />
          <span>{event.location}</span>
        </div>

        {hasLimitedSeats && (
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4 text-primary" />
            <span className={isAlmostFull ? 'text-orange-600 font-semibold' : 'text-gray-700'}>
              Вільних місць: {event.seatsAvailable} з {event.seats}
            </span>
          </div>
        )}

        {event.credits && (
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <Award className="h-4 w-4 text-accent" />
            <span>{event.credits} кредити</span>
          </div>
        )}

        {event.price && (
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <DollarSign className="h-4 w-4 text-primary" />
            <span>{event.price} грн</span>
          </div>
        )}
      </div>

      {/* Theme Tag */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
          🏷️ {event.theme}
        </span>
      </div>

      {/* Register Button */}
      <button
        onClick={() => onRegister(event.id)}
        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
          hasLimitedSeats && event.seatsAvailable === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-primary text-white hover:bg-blue-900'
        }`}
        disabled={!!(hasLimitedSeats && event.seatsAvailable === 0)}
      >
        {hasLimitedSeats && event.seatsAvailable === 0 ? 'Місця закінчились' : 'Зареєструватись'}
      </button>
    </div>
  );
};

export default EventCard;

