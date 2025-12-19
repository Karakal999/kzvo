import { useState } from 'react';
import { Calendar, Clock, MapPin, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { CalendarEvent } from '../types';
import { calendarEvents } from '../data/events';
import { formatDate } from '../utils/formatDate';

type FilterTab = 'all' | 'teachers' | 'students';

const CalendarWidget = () => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const tabs = [
    { id: 'all' as FilterTab, label: 'Всі події' },
    { id: 'teachers' as FilterTab, label: 'Для вчителів' },
    { id: 'students' as FilterTab, label: 'Для учнів' },
  ];

  const filteredEvents = calendarEvents
    .filter((event: CalendarEvent) => {
      if (activeTab === 'all') return true;
      return event.category === activeTab;
    })
    .slice(0, 6);

  const getCategoryColor = (category: CalendarEvent['category']) => {
    switch (category) {
      case 'teachers':
        return 'bg-primary/10 text-primary border-primary';
      case 'students':
        return 'bg-accent/10 text-accent border-accent';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getCategoryLabel = (category: CalendarEvent['category']) => {
    switch (category) {
      case 'teachers':
        return 'Для вчителів';
      case 'students':
        return 'Для учнів';
      default:
        return 'Загальне';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">
            Календар подій
          </h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {filteredEvents.map((event: CalendarEvent) => (
          <div
            key={event.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer group"
          >
            {/* Date Badge */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{formatDate(event.date)}</span>
              </div>
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(
                  event.category
                )}`}
              >
                {getCategoryLabel(event.category)}
              </span>
            </div>

            {/* Event Type */}
            <div className="flex items-center space-x-1 mb-2">
              <Tag className="h-4 w-4 text-accent" />
              <span className="text-sm font-semibold text-accent">
                {event.type}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            {/* Description */}
            {event.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {event.description}
              </p>
            )}

            {/* Location */}
            {event.location && (
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Link
          to="/events"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors"
        >
          <span>Весь календар</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default CalendarWidget;

