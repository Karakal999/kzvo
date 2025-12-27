import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSuccess = () => {
    // Get the page they were trying to access, or redirect to home
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  const handleSwitchToLogin = () => {
    navigate('/login', { state: location.state });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm onSuccess={handleSuccess} onSwitchToLogin={handleSwitchToLogin} />
    </div>
  );
};

export default Register;

