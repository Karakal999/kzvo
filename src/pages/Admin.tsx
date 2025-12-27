import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  FileText, 
  Calendar, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Shield
} from 'lucide-react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface UserData {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  createdAt: Date;
  lastLogin: Date;
}

const Admin: React.FC = () => {
  const { t, i18n } = useTranslation('translation');
  const { isAdmin, isSuperAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'content' | 'events' | 'settings'>('users');
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        lastLogin: doc.data().lastLogin?.toDate() || new Date(),
      })) as UserData[];
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserRole = async (userId: string, currentRole: 'user' | 'admin') => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    try {
      await updateDoc(doc(db, 'users', userId), { role: newRole });
      await fetchUsers();
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Помилка при оновленні ролі користувача');
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      return;
    }
    
    try {
      await deleteDoc(doc(db, 'users', userId));
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Помилка при видаленні користувача');
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('admin.title')}
          </h1>
          <p className="mt-2 text-gray-600">
            {t('admin.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Users className="inline-block w-5 h-5 mr-2" />
                {t('admin.tabs.users')}
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'content'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FileText className="inline-block w-5 h-5 mr-2" />
                {t('admin.tabs.content')}
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'events'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="inline-block w-5 h-5 mr-2" />
                {t('admin.tabs.events')}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="inline-block w-5 h-5 mr-2" />
                {t('admin.tabs.settings')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Users Tab */}
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t('admin.users.title')}
                  </h2>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('admin.users.name')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('admin.users.email')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('admin.users.role')}
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('admin.users.joinedDate')}
                          </th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            {t('admin.users.actions')}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {user.displayName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.email === 'admin@kzvo.edu' ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                  <Shield className="w-3 h-3 mr-1" />
                                  SUPER ADMIN
                                </span>
                              ) : (
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-purple-100 text-purple-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                                {user.role === 'admin' ? t('admin.users.adminRole') : t('admin.users.userRole')}
                              </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {user.createdAt.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {user.email === 'admin@kzvo.edu' ? (
                                <span className="text-xs text-gray-400 italic">
                                  {i18n.language === 'uk' ? 'Захищений акаунт' : 'Protected account'}
                                </span>
                              ) : (
                                <>
                                  {isSuperAdmin && (
                                    <>
                                      <button
                                        onClick={() => toggleUserRole(user.id, user.role)}
                                        className="text-blue-600 hover:text-blue-900 mr-4"
                                      >
                                        {user.role === 'admin' 
                                          ? t('admin.users.removeAdmin') 
                                          : t('admin.users.makeAdmin')}
                                      </button>
                                      <button
                                        onClick={() => deleteUser(user.id)}
                                        className="text-red-600 hover:text-red-900"
                                      >
                                        <Trash2 className="inline-block w-4 h-4" />
                                      </button>
                                    </>
                                  )}
                                  {!isSuperAdmin && (
                                    <span className="text-xs text-gray-400 italic">
                                      {i18n.language === 'uk' ? 'Тільки для Super Admin' : 'Super Admin only'}
                                    </span>
                                  )}
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Content Management Tab */}
            {activeTab === 'content' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t('admin.content.title')}
                  </h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('admin.content.addNew')}
                  </button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>{t('admin.content.comingSoon')}</p>
                </div>
              </div>
            )}

            {/* Events Management Tab */}
            {activeTab === 'events' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {t('admin.events.title')}
                  </h2>
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    {t('admin.events.addNew')}
                  </button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>{t('admin.events.comingSoon')}</p>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {t('admin.settings.title')}
                </h2>
                <div className="text-center py-12 text-gray-500">
                  <Settings className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p>{t('admin.settings.comingSoon')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;

