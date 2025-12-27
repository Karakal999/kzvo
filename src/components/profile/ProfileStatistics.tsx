import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { collection, query, where, getDocs, getCountFromServer } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface Stats {
  [key: string]: number;
}

export const ProfileStatistics: React.FC = () => {
  const { t } = useTranslation('translation');
  const { userProfile } = useAuth();
  const [stats, setStats] = useState<Stats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [userProfile]);

  const fetchStats = async () => {
    if (!userProfile) return;

    setLoading(true);
    try {
      const newStats: Stats = {};

      // Use mock data for now (replace with real Firebase queries when collections exist)
      const useMockData = true;

      if (useMockData) {
        // Generate realistic mock data based on role
        if (userProfile.role === 'admin') {
          newStats.totalUsers = 247;
          newStats.totalNews = 342;
          newStats.totalEvents = 67;
          newStats.totalSubmissions = 489;
          newStats.activeUsers = 189;
          newStats.newUsersThisMonth = 23;
          newStats.publishedNews = 298;
          newStats.upcomingEvents = 12;
        } else if (userProfile.role === 'teacher') {
          newStats.myNews = 28;
          newStats.myDocuments = 56;
          newStats.submissionsToReview = 18;
          newStats.myEvents = 7;
          newStats.studentsEnrolled = 142;
          newStats.completedReviews = 89;
        } else if (userProfile.role === 'student') {
          newStats.totalSubmissions = 12;
          newStats.approvedSubmissions = 8;
          newStats.pendingSubmissions = 3;
          newStats.rejectedSubmissions = 1;
          newStats.eventsAttended = 15;
          newStats.certificatesEarned = 6;
        }
      } else {
        // Real Firebase queries (uncomment when collections are created)
        if (userProfile.role === 'admin') {
          const usersCount = await getCountFromServer(collection(db, 'users'));
          newStats.totalUsers = usersCount.data().count;

          const newsCount = await getCountFromServer(collection(db, 'news'));
          newStats.totalNews = newsCount.data().count;

          const eventsCount = await getCountFromServer(collection(db, 'events'));
          newStats.totalEvents = eventsCount.data().count;

          const submissionsCount = await getCountFromServer(collection(db, 'submissions'));
          newStats.totalSubmissions = submissionsCount.data().count;
        } else if (userProfile.role === 'teacher') {
          const myNewsQuery = query(
            collection(db, 'news'),
            where('authorId', '==', userProfile.uid)
          );
          const myNewsCount = await getCountFromServer(myNewsQuery);
          newStats.myNews = myNewsCount.data().count;

          const myDocsQuery = query(
            collection(db, 'documents'),
            where('authorId', '==', userProfile.uid)
          );
          const myDocsCount = await getCountFromServer(myDocsQuery);
          newStats.myDocuments = myDocsCount.data().count;

          const submissionsQuery = query(collection(db, 'submissions'));
          const submissionsCount = await getCountFromServer(submissionsQuery);
          newStats.submissionsToReview = submissionsCount.data().count;
        } else if (userProfile.role === 'student') {
          const mySubmissionsQuery = query(
            collection(db, 'submissions'),
            where('userId', '==', userProfile.uid)
          );
          const mySubmissions = await getDocs(mySubmissionsQuery);
          
          newStats.totalSubmissions = mySubmissions.size;
          newStats.approvedSubmissions = mySubmissions.docs.filter(
            doc => doc.data().status === 'approved'
          ).length;
          newStats.pendingSubmissions = mySubmissions.docs.filter(
            doc => doc.data().status === 'pending'
          ).length;
          newStats.rejectedSubmissions = mySubmissions.docs.filter(
            doc => doc.data().status === 'rejected'
          ).length;
        }
      }

      setStats(newStats);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderAdminStats = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label={t('auth.profile.stats.totalUsers')}
          value={stats.totalUsers || 0}
          color="blue"
          subtitle={`+${stats.newUsersThisMonth || 0} ${t('auth.profile.stats.thisMonth')}`}
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          label={t('auth.profile.stats.totalNews')}
          value={stats.totalNews || 0}
          color="green"
          subtitle={`${stats.publishedNews || 0} ${t('auth.profile.stats.published')}`}
        />
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          label={t('auth.profile.stats.totalEvents')}
          value={stats.totalEvents || 0}
          color="purple"
          subtitle={`${stats.upcomingEvents || 0} ${t('auth.profile.stats.upcoming')}`}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label={t('auth.profile.stats.totalSubmissions')}
          value={stats.totalSubmissions || 0}
          color="orange"
        />
      </div>
      
      {/* Activity Chart */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-4">{t('auth.profile.stats.userActivity')}</h4>
        <div className="space-y-3">
          <ProgressBar label={t('auth.profile.stats.activeUsers')} value={stats.activeUsers || 0} max={stats.totalUsers || 1} color="blue" />
          <ProgressBar label={t('auth.profile.stats.publishedNews')} value={stats.publishedNews || 0} max={stats.totalNews || 1} color="green" />
          <ProgressBar label={t('auth.profile.stats.upcomingEvents')} value={stats.upcomingEvents || 0} max={stats.totalEvents || 1} color="purple" />
        </div>
      </div>
    </>
  );

  const renderTeacherStats = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          label={t('auth.profile.stats.myNews')}
          value={stats.myNews || 0}
          color="blue"
        />
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          label={t('auth.profile.stats.myDocuments')}
          value={stats.myDocuments || 0}
          color="green"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          label={t('auth.profile.stats.submissionsToReview')}
          value={stats.submissionsToReview || 0}
          color="orange"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-4">{t('auth.profile.stats.myActivity')}</h4>
          <div className="space-y-3">
            <ProgressBar label={t('auth.profile.stats.publishedNews')} value={stats.myNews || 0} max={50} color="blue" />
            <ProgressBar label={t('auth.profile.stats.myDocuments')} value={stats.myDocuments || 0} max={100} color="green" />
            <ProgressBar label={t('auth.profile.stats.heldEvents')} value={stats.myEvents || 0} max={20} color="purple" />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-4">{t('auth.profile.stats.students')}</h4>
          <div className="space-y-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.studentsEnrolled || 0}</p>
              <p className="text-sm text-gray-600">{t('auth.profile.stats.enrolledStudents')}</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.completedReviews || 0}</p>
              <p className="text-sm text-gray-600">{t('auth.profile.stats.completedReviews')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const renderStudentStats = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<FileText className="w-6 h-6" />}
          label={t('auth.profile.stats.totalSubmissions')}
          value={stats.totalSubmissions || 0}
          color="blue"
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6" />}
          label={t('auth.profile.stats.approved')}
          value={stats.approvedSubmissions || 0}
          color="green"
        />
        <StatCard
          icon={<Clock className="w-6 h-6" />}
          label={t('auth.profile.stats.pending')}
          value={stats.pendingSubmissions || 0}
          color="orange"
        />
        <StatCard
          icon={<XCircle className="w-6 h-6" />}
          label={t('auth.profile.stats.rejected')}
          value={stats.rejectedSubmissions || 0}
          color="red"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-4">{t('auth.profile.stats.submissionStatus')}</h4>
          <div className="space-y-3">
            <ProgressBar 
              label={t('auth.profile.stats.approved')} 
              value={stats.approvedSubmissions || 0} 
              max={stats.totalSubmissions || 1} 
              color="green" 
              showPercentage 
            />
            <ProgressBar 
              label={t('auth.profile.stats.pending')} 
              value={stats.pendingSubmissions || 0} 
              max={stats.totalSubmissions || 1} 
              color="orange" 
              showPercentage 
            />
            <ProgressBar 
              label={t('auth.profile.stats.rejected')} 
              value={stats.rejectedSubmissions || 0} 
              max={stats.totalSubmissions || 1} 
              color="red" 
              showPercentage 
            />
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-4">{t('auth.profile.stats.achievements')}</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t('auth.profile.stats.eventsAttended')}</span>
              <span className="text-lg font-bold text-blue-600">{stats.eventsAttended || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{t('auth.profile.stats.certificatesEarned')}</span>
              <span className="text-lg font-bold text-green-600">{stats.certificatesEarned || 0}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-300">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-700">{t('auth.profile.stats.successRate')}: {Math.round((stats.approvedSubmissions || 0) / (stats.totalSubmissions || 1) * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('auth.profile.stats.title')}
      </h3>

      {userProfile?.role === 'admin' && renderAdminStats()}
      {userProfile?.role === 'teacher' && renderTeacherStats()}
      {userProfile?.role === 'student' && renderStudentStats()}
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color, subtitle }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
  };

  return (
    <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value.toLocaleString()}</p>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
};

interface ProgressBarProps {
  label: string;
  value: number;
  max: number;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  showPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, max, color, showPercentage = false }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-gray-700">{label}</span>
        <span className="text-xs text-gray-600">
          {showPercentage ? `${Math.round(percentage)}%` : `${value} / ${max}`}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

