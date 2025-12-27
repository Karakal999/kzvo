import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';

export const UserMenu: React.FC = () => {
  const { t } = useTranslation('translation');
  const { user, userProfile, signOut, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700">
          {userProfile?.displayName || user.email?.split('@')[0]}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900">
              {userProfile?.displayName}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
            {isAdmin && (
              <span className="inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium bg-purple-100 text-purple-800">
                <Shield className="w-3 h-3 mr-1" />
                {t('auth.userMenu.admin')}
              </span>
            )}
          </div>

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="w-4 h-4 mr-2" />
              {t('auth.userMenu.adminPanel')}
            </Link>
          )}

          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4 mr-2" />
            {t('auth.userMenu.settings')}
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t('auth.userMenu.signOut')}
          </button>
        </div>
      )}
    </div>
  );
};

