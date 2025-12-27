import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Clock, LogIn, FileText, Calendar as CalendarIcon, User } from 'lucide-react';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { format } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';

interface Activity {
  id: string;
  type: 'login' | 'profile_update' | 'submission' | 'document_upload';
  description: string;
  timestamp: Date;
  metadata?: any;
}

export const ActivityHistory: React.FC = () => {
  const { t, i18n } = useTranslation('translation');
  const { user, userProfile } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const locale = i18n.language === 'uk' ? uk : enUS;

  useEffect(() => {
    fetchActivity();
  }, [user]);

  const fetchActivity = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Mock activity data with realistic entries
      const now = new Date();
      const mockActivities: Activity[] = [
        {
          id: '1',
          type: 'login',
          description: i18n.language === 'uk' ? 'Вхід в систему з Chrome (Windows)' : 'Logged in from Chrome (Windows)',
          timestamp: now,
        },
        {
          id: '1a',
          type: 'profile_update',
          description: i18n.language === 'uk' ? 'Оновлено налаштування сповіщень' : 'Updated notification settings',
          timestamp: new Date(now.getTime() - 45 * 60 * 1000), // 45 minutes ago
        },
        {
          id: '2',
          type: 'document_upload',
          description: i18n.language === 'uk' ? 'Завантажено документ: "Звіт за грудень 2025"' : 'Uploaded document: "December 2025 Report"',
          timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
        },
        {
          id: '2a',
          type: 'submission',
          description: i18n.language === 'uk' ? 'Схвалено заявку на участь у олімпіаді з математики' : 'Approved math olympiad application',
          timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000), // 8 hours ago
        },
        {
          id: '3',
          type: 'document_upload',
          description: i18n.language === 'uk' ? 'Завантажено новину: "Підсумки навчального семестру"' : 'Published news: "Academic Semester Summary"',
          timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        },
        {
          id: '4',
          type: 'login',
          description: i18n.language === 'uk' ? 'Вхід в систему з Safari (MacOS)' : 'Logged in from Safari (MacOS)',
          timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 - 4 * 60 * 60 * 1000), // 1 day 4 hours ago
        },
        {
          id: '5',
          type: 'submission',
          description: i18n.language === 'uk' ? 'Подано заявку на участь у конкурсі "Молодий науковець"' : 'Submitted "Young Scientist" competition application',
          timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        },
        {
          id: '5a',
          type: 'profile_update',
          description: i18n.language === 'uk' ? 'Змінено пароль облікового запису' : 'Changed account password',
          timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        },
        {
          id: '6',
          type: 'login',
          description: i18n.language === 'uk' ? 'Вхід в систему з Firefox (Windows)' : 'Logged in from Firefox (Windows)',
          timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        },
        {
          id: '7',
          type: 'document_upload',
          description: i18n.language === 'uk' ? 'Завантажено фото: "Результати олімпіади 2025"' : 'Uploaded photo: "Olympiad Results 2025"',
          timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        },
        {
          id: '8',
          type: 'submission',
          description: i18n.language === 'uk' ? 'Переглянуто 12 заявок студентів' : 'Reviewed 12 student applications',
          timestamp: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        },
        {
          id: '9',
          type: 'login',
          description: i18n.language === 'uk' ? 'Вхід в систему з мобільного пристрою' : 'Logged in from mobile device',
          timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        },
        {
          id: '10',
          type: 'document_upload',
          description: i18n.language === 'uk' ? 'Опубліковано оголошення про новий конкурс' : 'Published announcement about new competition',
          timestamp: new Date(now.getTime() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
        },
        {
          id: '11',
          type: 'profile_update',
          description: i18n.language === 'uk' ? 'Оновлено фото профілю' : 'Updated profile photo',
          timestamp: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
        },
        {
          id: '12',
          type: 'login',
          description: i18n.language === 'uk' ? 'Вхід в систему' : 'Logged in',
          timestamp: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
        },
      ];

      // Customize activities based on user role
      if (userProfile?.role === 'teacher') {
        mockActivities.unshift(
          {
            id: 'teacher-1',
            type: 'document_upload',
            description: i18n.language === 'uk' ? 'Опубліковано новину: "Результати контрольної роботи з математики"' : 'Published news: "Math Test Results"',
            timestamp: new Date(now.getTime() - 30 * 60 * 1000), // 30 minutes ago
          },
          {
            id: 'teacher-2',
            type: 'submission',
            description: i18n.language === 'uk' ? 'Перевірено 8 робіт студентів' : 'Reviewed 8 student works',
            timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
          }
        );
      }

      if (userProfile?.role === 'admin') {
        mockActivities.unshift(
          {
            id: 'admin-1',
            type: 'profile_update',
            description: i18n.language === 'uk' ? 'Додано нового користувача: Іванов І.І. (вчитель)' : 'Added new user: Ivanov I.I. (teacher)',
            timestamp: new Date(now.getTime() - 20 * 60 * 1000), // 20 minutes ago
          },
          {
            id: 'admin-2',
            type: 'profile_update',
            description: i18n.language === 'uk' ? 'Оновлено налаштування системи' : 'Updated system settings',
            timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
          },
          {
            id: 'admin-3',
            type: 'document_upload',
            description: i18n.language === 'uk' ? 'Створено резервну копію бази даних' : 'Created database backup',
            timestamp: new Date(now.getTime() - 16 * 60 * 60 * 1000), // 16 hours ago
          }
        );
      }

      if (userProfile?.role === 'student') {
        mockActivities.unshift(
          {
            id: 'student-1',
            type: 'submission',
            description: i18n.language === 'uk' ? 'Подано роботу з фізики' : 'Submitted physics assignment',
            timestamp: new Date(now.getTime() - 90 * 60 * 1000), // 1.5 hours ago
          }
        );
      }

      setActivities(mockActivities);
    } catch (error) {
      console.error('Error fetching activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'login':
        return <LogIn className="w-5 h-5 text-blue-600" />;
      case 'profile_update':
        return <User className="w-5 h-5 text-green-600" />;
      case 'submission':
        return <FileText className="w-5 h-5 text-purple-600" />;
      case 'document_upload':
        return <FileText className="w-5 h-5 text-orange-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('auth.profile.activity.title')}
      </h3>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Clock className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>{t('auth.profile.activity.noActivity')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(activity.timestamp, 'PPp', { locale })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {t('auth.profile.activity.showingRecent')}
        </p>
      </div>
    </div>
  );
};

