import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-primary mb-6">Контакти</h1>
      <div className="prose max-w-none mb-8">
        <p className="text-lg text-gray-700">
          Зв'яжіться з нами для отримання додаткової інформації або консультації.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-primary mb-6">Контактна інформація</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
              <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary mb-1">Адреса</h3>
                <p className="text-gray-700">м. Київ, вул. Освітня, буд. 1</p>
                <p className="text-gray-600 text-sm">Київська область, Україна, 01001</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
              <Phone className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary mb-1">Телефон</h3>
                <p className="text-gray-700">+380 (44) 123-45-67</p>
                <p className="text-gray-700">+380 (44) 123-45-68</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
              <Mail className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary mb-1">Email</h3>
                <p className="text-gray-700">info@academy.ua</p>
                <p className="text-gray-700">admission@academy.ua</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
              <Clock className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-primary mb-1">Режим роботи</h3>
                <p className="text-gray-700">Понеділок - П'ятниця: 9:00 - 18:00</p>
                <p className="text-gray-700">Субота: 10:00 - 14:00</p>
                <p className="text-gray-700">Неділя: вихідний</p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-8">
            <h3 className="font-semibold text-primary mb-3">Як нас знайти</h3>
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Карта буде тут</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Надішліть повідомлення</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ім'я *
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Введіть ваше ім'я"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="+380 XX XXX XX XX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тема звернення *
              </label>
              <select
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              >
                <option value="">Оберіть тему</option>
                <option value="admission">Вступ до академії</option>
                <option value="programs">Освітні програми</option>
                <option value="courses">Курси підвищення кваліфікації</option>
                <option value="cooperation">Співпраця</option>
                <option value="other">Інше</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Повідомлення *
              </label>
              <textarea
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Напишіть ваше повідомлення..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors"
            >
              Надіслати повідомлення
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-4">
            * Обов'язкові поля для заповнення
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;

