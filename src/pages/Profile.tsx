import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { User, Shield, Settings, TrendingUp, Bell, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { uk, enUS } from 'date-fns/locale';
import { EditProfileForm } from '../components/profile/EditProfileForm';
import { ChangePasswordForm } from '../components/profile/ChangePasswordForm';
import { ProfileStatistics } from '../components/profile/ProfileStatistics';
import { NotificationSettings } from '../components/profile/NotificationSettings';
import { ActivityHistory } from '../components/profile/ActivityHistory';
import Header from '../components/Header';
import Footer from '../components/Footer';

type TabType = 'overview' | 'edit' | 'password' | 'statistics' | 'notifications' | 'activity';

const Profile: React.FC = () => {
  const { t, i18n } = useTranslation('translation');
  const { userProfile, isSuperAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const locale = i18n.language === 'uk' ? uk : enUS;

  if (!userProfile) {
    return null;
  }

  const tabs = [
    { id: 'overview' as TabType, label: t('auth.profile.tabs.overview'), icon: <User className="w-4 h-4" /> },
    { id: 'edit' as TabType, label: t('auth.profile.tabs.edit'), icon: <Settings className="w-4 h-4" /> },
    { id: 'password' as TabType, label: t('auth.profile.tabs.password'), icon: <Shield className="w-4 h-4" /> },
    { id: 'statistics' as TabType, label: t('auth.profile.tabs.statistics'), icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'notifications' as TabType, label: t('auth.profile.tabs.notifications'), icon: <Bell className="w-4 h-4" /> },
    { id: 'activity' as TabType, label: t('auth.profile.tabs.activity'), icon: <Clock className="w-4 h-4" /> },
  ];

  const getRoleBadgeColor = () => {
    switch (userProfile.role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'teacher':
        return 'bg-blue-100 text-blue-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = () => {
    switch (userProfile.role) {
      case 'admin':
        return t('auth.profile.admin');
      case 'teacher':
        return t('auth.profile.teacher');
      case 'student':
        return t('auth.profile.student');
      default:
        return userProfile.role;
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                <User className="w-12 h-12 text-blue-600" />
              </div>
            <div className="ml-6 text-white">
              <h1 className="text-3xl font-bold">
                {userProfile.displayName}
                {isSuperAdmin && (
                  <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                    <Shield className="w-3 h-3 mr-1" />
                    SUPER ADMIN
                  </span>
                )}
              </h1>
              <p className="text-blue-100 text-lg">{userProfile.email}</p>
              <span className={`inline-flex items-center px-3 py-1 mt-2 rounded-full text-sm font-medium ${getRoleBadgeColor()} bg-white`}>
                <Shield className="w-4 h-4 mr-1" />
                {getRoleLabel()}
              </span>
            </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-4 px-6 overflow-x-auto" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6 pb-8">
            {activeTab === 'overview' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('auth.profile.accountInfo')}
                </h3>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm font-medium text-gray-500">{t('auth.profile.displayName')}</dt>
                    <dd className="text-sm text-gray-900">{userProfile.displayName}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm font-medium text-gray-500">{t('auth.profile.email')}</dt>
                    <dd className="text-sm text-gray-900">{userProfile.email}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm font-medium text-gray-500">{t('auth.profile.role')}</dt>
                    <dd className="text-sm text-gray-900">{getRoleLabel()}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <dt className="text-sm font-medium text-gray-500">{t('auth.profile.memberSince')}</dt>
                    <dd className="text-sm text-gray-900">{format(userProfile.createdAt, 'PPP', { locale })}</dd>
                  </div>
                  <div className="flex justify-between py-2">
                    <dt className="text-sm font-medium text-gray-500">{t('auth.profile.lastLogin')}</dt>
                    <dd className="text-sm text-gray-900">{format(userProfile.lastLogin, 'PPP p', { locale })}</dd>
                  </div>
                </dl>
              </div>
            )}

            {activeTab === 'edit' && <EditProfileForm />}
            {activeTab === 'password' && <ChangePasswordForm />}
            {activeTab === 'statistics' && <ProfileStatistics />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'activity' && <ActivityHistory />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

