import { useState } from 'react';
import { X, User, Mail, Building, MessageSquare, Send } from 'lucide-react';

interface CalendarRegistrationModalProps {
  eventTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CalendarRegistrationData) => Promise<void>;
}

export interface CalendarRegistrationData {
  fullName: string;
  email: string;
  position: string;
  school: string;
  comment: string;
}

const CalendarRegistrationModal = ({ eventTitle, isOpen, onClose, onSubmit }: CalendarRegistrationModalProps) => {
  const [formData, setFormData] = useState<CalendarRegistrationData>({
    fullName: '',
    email: '',
    position: '',
    school: '',
    comment: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CalendarRegistrationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CalendarRegistrationData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Обов'язкове поле";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Мінімум 3 символи';
    }

    if (!formData.email.trim()) {
      newErrors.email = "Обов'язкове поле";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некоректний email';
    }

    if (!formData.position.trim()) {
      newErrors.position = "Обов'язкове поле";
    }

    if (!formData.school.trim()) {
      newErrors.school = "Обов'язкове поле";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        position: '',
        school: '',
        comment: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof CalendarRegistrationData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-primary">Реєстрація на подію</h2>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{eventTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            disabled={isSubmitting}
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-primary" />
                <span>Прізвище, ім'я, по батькові *</span>
              </div>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Іванова Ольга Петрівна"
              disabled={isSubmitting}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>Email *</span>
              </div>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="email@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-primary" />
                <span>Посада *</span>
              </div>
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.position ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Вчитель початкових класів"
              disabled={isSubmitting}
            />
            {errors.position && (
              <p className="mt-1 text-sm text-red-600">{errors.position}</p>
            )}
          </div>

          {/* School */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4 text-primary" />
                <span>Заклад освіти *</span>
              </div>
            </label>
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                errors.school ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Назва школи, гімназії або ліцею"
              disabled={isSubmitting}
            />
            {errors.school && (
              <p className="mt-1 text-sm text-red-600">{errors.school}</p>
            )}
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>Коментар (необов'язково)</span>
              </div>
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Додаткова інформація, питання..."
              disabled={isSubmitting}
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-900 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  <span>Відправка...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Зареєструватися</span>
                </>
              )}
            </button>
          </div>

          {/* Info */}
          <p className="text-xs text-gray-500 text-center pt-2">
            * Обов'язкові поля. Після реєстрації на вказаний email буде надіслано підтвердження.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CalendarRegistrationModal;

