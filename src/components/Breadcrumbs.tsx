import { useLocation, useParams } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LinkWithLang from './LinkWithLang';

const Breadcrumbs = () => {
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation('navigation');
  
  // Split pathname and filter out empty strings and language code
  const pathnames = location.pathname
    .split('/')
    .filter((x) => x && x !== lang);

  // Map routes to translation keys
  const routeTranslationKeys: { [key: string]: string } = {
    about: 'menu.about',
    activity: 'menu.activity',
    education: 'menu.education',
    teachers: 'menu.teachers',
    students: 'menu.students',
    resources: 'menu.resources',
    news: 'menu.news',
    contacts: 'menu.contacts',
    programs: 'submenu.education.programs',
    courses: 'submenu.education.higher_education',
    events: 'submenu.teachers.events',
    competitions: 'submenu.students.competitions',
  };

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <LinkWithLang
              to="/"
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="ml-1">{t('breadcrumbs.home')}</span>
            </LinkWithLang>
          </li>

          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            
            // Get translated label or fallback to value
            const translationKey = routeTranslationKeys[value];
            const label = translationKey ? t(translationKey) : value;

            return (
              <li key={to} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                {isLast ? (
                  <span className="text-primary font-medium">{label}</span>
                ) : (
                  <LinkWithLang
                    to={to}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {label}
                  </LinkWithLang>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
