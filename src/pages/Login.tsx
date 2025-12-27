import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Login: React.FC = () => {
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

  const handleSwitchToRegister = () => {
    navigate('/register', { state: location.state });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm onSuccess={handleSuccess} onSwitchToRegister={handleSwitchToRegister} />
    </div>
  );
};

export default Login;

