import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/about', label: 'Про академію' },
    { path: '/activity', label: 'Діяльність' },
    { path: '/education', label: 'Освіта програми' },
    { path: '/teachers', label: 'Вчителю' },
  ];

  const resourceLinks = [
    { path: '/students', label: 'Учням/Конкурси' },
    { path: '/resources', label: 'Ресурси' },
    { path: '/news', label: 'Новини' },
    { path: '/contacts', label: 'Контакти' },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, url: '#', label: 'Facebook' },
    { icon: <Instagram className="h-5 w-5" />, url: '#', label: 'Instagram' },
    { icon: <Twitter className="h-5 w-5" />, url: '#', label: 'Twitter' },
    { icon: <Youtube className="h-5 w-5" />, url: '#', label: 'Youtube' },
    { icon: <Linkedin className="h-5 w-5" />, url: '#', label: 'Linkedin' },
  ];

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Контактна інформація</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">Адреса</p>
                  <p className="text-sm text-gray-300">м. Київ, вул. Освітня, буд. 1</p>
                  <p className="text-sm text-gray-300">Україна, 01001</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-1 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">Телефон</p>
                  <p className="text-sm text-gray-300">+380 (44) 123-45-67</p>
                  <p className="text-sm text-gray-300">+380 (44) 123-45-68</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-gray-300">info@academy.ua</p>
                  <p className="text-sm text-gray-300">office@academy.ua</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Швидкі посилання</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-accent transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Розділи</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-accent transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Про нас</h3>
            <p className="text-sm text-gray-300 mb-4">
              Академія педагогічної освіти - провідний центр підготовки 
              висококваліфікованих педагогічних кадрів із сучасними 
              підходами до навчання.
            </p>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">Слідкуйте за нами</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-accent rounded-full transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-300 text-center md:text-left">
              &copy; {currentYear} Академія Педагогічної Освіти. Усі права захищені.
            </p>
            <div className="flex space-x-6 text-sm text-gray-300">
              <Link to="/privacy" className="hover:text-accent transition-colors">
                Політика конфіденційності
              </Link>
              <Link to="/terms" className="hover:text-accent transition-colors">
                Умови використання
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
