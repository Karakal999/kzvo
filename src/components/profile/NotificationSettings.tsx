import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { Bell, Mail, MessageSquare, Calendar, Loader2 } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

interface NotificationPreferences {
  emailNotifications: boolean;
  newsUpdates: boolean;
  eventReminders: boolean;
  submissionUpdates: boolean;
  weeklyDigest: boolean;
}

export const NotificationSettings: React.FC = () => {
  const { t } = useTranslation('translation');
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    emailNotifications: true,
    newsUpdates: true,
    eventReminders: true,
    submissionUpdates: true,
    weeklyDigest: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadPreferences();
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const prefsDoc = await getDoc(doc(db, 'users', user.uid, 'settings', 'notifications'));
      if (prefsDoc.exists()) {
        setPreferences(prefsDoc.data() as NotificationPreferences);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setLoading(false);
    }
  };

  const savePreferences = async () => {
    if (!user) return;

    setSaving(true);
    setSuccess(false);

    try {
      await setDoc(doc(db, 'users', user.uid, 'settings', 'notifications'), preferences);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const togglePreference = (key: keyof NotificationPreferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('auth.profile.notifications.title')}
      </h3>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">{t('auth.profile.notifications.saved')}</p>
        </div>
      )}

      <div className="space-y-4">
        {/* Email Notifications */}
        <SettingToggle
          icon={<Mail className="w-5 h-5" />}
          label={t('auth.profile.notifications.emailNotifications')}
          description={t('auth.profile.notifications.emailNotificationsDesc')}
          checked={preferences.emailNotifications}
          onChange={() => togglePreference('emailNotifications')}
        />

        {/* News Updates */}
        <SettingToggle
          icon={<Bell className="w-5 h-5" />}
          label={t('auth.profile.notifications.newsUpdates')}
          description={t('auth.profile.notifications.newsUpdatesDesc')}
          checked={preferences.newsUpdates}
          onChange={() => togglePreference('newsUpdates')}
          disabled={!preferences.emailNotifications}
        />

        {/* Event Reminders */}
        <SettingToggle
          icon={<Calendar className="w-5 h-5" />}
          label={t('auth.profile.notifications.eventReminders')}
          description={t('auth.profile.notifications.eventRemindersDesc')}
          checked={preferences.eventReminders}
          onChange={() => togglePreference('eventReminders')}
          disabled={!preferences.emailNotifications}
        />

        {/* Submission Updates */}
        <SettingToggle
          icon={<MessageSquare className="w-5 h-5" />}
          label={t('auth.profile.notifications.submissionUpdates')}
          description={t('auth.profile.notifications.submissionUpdatesDesc')}
          checked={preferences.submissionUpdates}
          onChange={() => togglePreference('submissionUpdates')}
          disabled={!preferences.emailNotifications}
        />

        {/* Weekly Digest */}
        <SettingToggle
          icon={<Mail className="w-5 h-5" />}
          label={t('auth.profile.notifications.weeklyDigest')}
          description={t('auth.profile.notifications.weeklyDigestDesc')}
          checked={preferences.weeklyDigest}
          onChange={() => togglePreference('weeklyDigest')}
          disabled={!preferences.emailNotifications}
        />
      </div>

      <div className="mt-6">
        <button
          onClick={savePreferences}
          disabled={saving}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              {t('auth.profile.notifications.saving')}
            </>
          ) : (
            t('auth.profile.notifications.save')
          )}
        </button>
      </div>
    </div>
  );
};

interface SettingToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

const SettingToggle: React.FC<SettingToggleProps> = ({
  icon,
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div className={`flex items-start space-x-3 p-4 rounded-lg border ${
      disabled ? 'bg-gray-50 border-gray-200' : 'border-gray-200 hover:bg-gray-50'
    }`}>
      <div className={`mt-0.5 ${disabled ? 'text-gray-400' : 'text-gray-600'}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <label className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
          {label}
        </label>
        <p className={`text-xs ${disabled ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={onChange}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

