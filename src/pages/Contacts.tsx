import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-8">Контакти</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Зв'яжіться з нами</h2>
          
          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Адреса</h3>
                <p className="text-gray-700">м. Київ, вул. Освітня, буд. 1</p>
                <p className="text-gray-700">Україна, 01001</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Телефон</h3>
                <p className="text-gray-700">+380 (44) 123-45-67</p>
                <p className="text-gray-700">+380 (44) 123-45-68 (факс)</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-gray-700">info@academy.ua</p>
                <p className="text-gray-700">office@academy.ua</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Години роботи</h3>
                <p className="text-gray-700">Понеділок - П'ятниця: 9:00 - 18:00</p>
                <p className="text-gray-700">Субота - Неділя: Вихідний</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Карта розташування</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Надішліть повідомлення</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Ім'я *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                placeholder="Введіть ваше ім'я"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Тема звернення *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
              >
                <option value="">Оберіть тему</option>
                <option value="admission">Вступ до академії</option>
                <option value="programs">Освітні програми</option>
                <option value="partnership">Партнерство</option>
                <option value="general">Загальні питання</option>
                <option value="other">Інше</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Повідомлення *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
                placeholder="Опишіть ваше питання або пропозицію..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Надіслати повідомлення</span>
            </button>
          </form>

          <p className="text-sm text-gray-600 mt-4">
            * Обов'язкові поля. Ваші дані захищені та не передаються третім особам.
          </p>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-12 bg-accent/10 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-primary mb-4">Додаткова інформація</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold mb-2">Приймальна комісія</h3>
            <p className="text-gray-700 text-sm">+380 (44) 123-45-69</p>
            <p className="text-gray-700 text-sm">admission@academy.ua</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Бухгалтерія</h3>
            <p className="text-gray-700 text-sm">+380 (44) 123-45-70</p>
            <p className="text-gray-700 text-sm">accounting@academy.ua</p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Технічна підтримка</h3>
            <p className="text-gray-700 text-sm">+380 (44) 123-45-71</p>
            <p className="text-gray-700 text-sm">support@academy.ua</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

