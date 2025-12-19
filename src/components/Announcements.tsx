import { useState, useEffect } from 'react';
import { AlertCircle, Info, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Announcement } from '../types';
import { announcements } from '../data/announcements';
import { formatDate } from '../utils/formatDate';
import { useTranslation } from 'react-i18next';
import { useMultilingualContent } from '../utils/multilingualData';

const Announcements = () => {
  const { t } = useTranslation('common');
  const { getContent } = useMultilingualContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const goToPrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  const getPriorityConfig = (priority: Announcement['priority']) => {
    switch (priority) {
      case 'urgent':
        return {
          label: t('announcements.urgent'),
          bgColor: 'bg-red-50 border-red-200',
          textColor: 'text-red-700',
          badgeColor: 'bg-red-600 text-white',
          icon: <AlertCircle className="h-5 w-5" />,
        };
      case 'important':
        return {
          label: t('announcements.important'),
          bgColor: 'bg-orange-50 border-orange-200',
          textColor: 'text-orange-700',
          badgeColor: 'bg-orange-600 text-white',
          icon: <AlertCircle className="h-5 w-5" />,
        };
      default:
        return {
          label: t('announcements.info'),
          bgColor: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-700',
          badgeColor: 'bg-blue-600 text-white',
          icon: <Info className="h-5 w-5" />,
        };
    }
  };

  const currentAnnouncement = announcements[currentIndex];
  const config = getPriorityConfig(currentAnnouncement.priority);

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Slider Container */}
          <div className="relative">
            {/* Main Announcement Card */}
            <div
              className={`${config.bgColor} border-2 rounded-xl p-6 md:p-8 transition-all duration-500`}
            >
              {/* Priority Badge */}
              <div className="flex items-center space-x-3 mb-4">
                <span className={`${config.badgeColor} px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-2 animate-pulse`}>
                  {config.icon}
                  <span>{config.label}</span>
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(currentAnnouncement.date)}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className={`text-xl md:text-2xl font-bold ${config.textColor}`}>
                  {getContent(currentAnnouncement.title)}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {getContent(currentAnnouncement.content)}
                </p>

                {/* Link if exists */}
                {currentAnnouncement.link && (
                  <Link
                    to={currentAnnouncement.link}
                    className={`inline-flex items-center space-x-2 ${config.textColor} font-semibold hover:underline`}
                  >
                    <span>{t('announcements.read_more')}</span>
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>

            {/* Navigation Arrows */}
            {announcements.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                  aria-label={t('announcements.previous')}
                >
                  <ChevronLeft className="h-6 w-6 text-primary" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                  aria-label={t('announcements.next')}
                >
                  <ChevronRight className="h-6 w-6 text-primary" />
                </button>
              </>
            )}
          </div>

          {/* Dots Navigation */}
          {announcements.length > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`${t('announcements.go_to')} ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Auto-play indicator */}
          {announcements.length > 1 && (
            <div className="text-center mt-4">
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {isAutoPlay ? `⏸ ${t('announcements.pause')}` : `▶ ${t('announcements.resume')}`} {t('announcements.auto_change')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Announcements;

