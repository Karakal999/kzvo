import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { User, Loader2, Camera } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db } from '../../config/firebase';

interface EditProfileFormData {
  displayName: string;
}

export const EditProfileForm: React.FC = () => {
  const { t } = useTranslation('translation');
  const { user, userProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    defaultValues: {
      displayName: userProfile?.displayName || '',
    },
  });

  const onSubmit = async (data: EditProfileFormData) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: data.displayName,
      });

      // Update Firestore profile
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: data.displayName,
      });

      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setError(err.message || t('profile.edit.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('auth.profile.edit.title')}
      </h3>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-600">{t('auth.profile.edit.success')}</p>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Avatar Upload (placeholder) */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center"
          >
            <Camera className="w-4 h-4 mr-2" />
            {t('auth.profile.edit.changePhoto')}
          </button>
        </div>

        {/* Display Name */}
        <div>
          <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.fields.displayName')}
          </label>
          <input
            {...register('displayName', {
              required: t('auth.validation.displayNameRequired'),
              minLength: {
                value: 2,
                message: t('auth.validation.displayNameTooShort'),
              },
            })}
            type="text"
            id="displayName"
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.displayName && (
            <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
          )}
        </div>

        {/* Email (read-only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.fields.email')}
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
          />
          <p className="mt-1 text-xs text-gray-500">{t('auth.profile.edit.emailNotEditable')}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 mr-2" />
              {t('auth.profile.edit.saving')}
            </>
          ) : (
            t('auth.profile.edit.save')
          )}
        </button>
      </form>
    </div>
  );
};

