import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LinkWithLang from './LinkWithLang';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation('navigation');

  const quickLinks = [
    { path: '/about', labelKey: 'menu.about' },
    { path: '/activity', labelKey: 'menu.activity' },
    { path: '/education', labelKey: 'menu.education' },
    { path: '/teachers', labelKey: 'menu.teachers' },
  ];

  const resourceLinks = [
    { path: '/students', labelKey: 'menu.students' },
    { path: '/resources', labelKey: 'menu.resources' },
    { path: '/news', labelKey: 'menu.news' },
    { path: '/contacts', labelKey: 'menu.contacts' },
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
            <h3 className="text-xl font-bold mb-4 text-accent">{t('footer.contacts')}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">{t('footer.address')}</p>
                  <p className="text-sm text-gray-300">м. Київ, вул. Освітня, буд. 1</p>
                  <p className="text-sm text-gray-300">Україна, 01001</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-1 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">{t('header.phone')}</p>
                  <p className="text-sm text-gray-300">+380 (44) 123-45-67</p>
                  <p className="text-sm text-gray-300">+380 (44) 123-45-68</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-1 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm text-gray-300">{t('header.email')}</p>
                  <p className="text-sm text-gray-300">office@academy.ua</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <LinkWithLang
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-accent transition-colors inline-block"
                  >
                    {t(link.labelKey as any)}
                  </LinkWithLang>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">{t('footer.quick_links')}</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <LinkWithLang
                    to={link.path}
                    className="text-sm text-gray-300 hover:text-accent transition-colors inline-block"
                  >
                    {t(link.labelKey as any)}
                  </LinkWithLang>
                </li>
              ))}
            </ul>
          </div>

          {/* About & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">{t('footer.about_academy')}</h3>
            <p className="text-sm text-gray-300 mb-4">
              {t('footer.description')}
            </p>
            
            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-semibold mb-3">{t('footer.follow_us')}</h4>
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
              &copy; {currentYear} {t('header.academy')} {t('header.academy_full')}. {t('footer.rights')}.
            </p>
            <div className="flex space-x-6 text-sm text-gray-300">
              <LinkWithLang to="/privacy" className="hover:text-accent transition-colors">
                {t('footer.privacy')}
              </LinkWithLang>
              <LinkWithLang to="/terms" className="hover:text-accent transition-colors">
                {t('footer.terms')}
              </LinkWithLang>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
