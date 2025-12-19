import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Map routes to Ukrainian labels
  const routeLabels: { [key: string]: string } = {
    about: 'Про академію',
    activity: 'Діяльність',
    education: 'Освіта програми',
    teachers: 'Вчителю',
    students: 'Учням/Конкурси',
    resources: 'Ресурси',
    news: 'Новини',
    contacts: 'Контакти',
    programs: 'Програми',
    courses: 'Курси',
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
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-primary transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="ml-1">Головна</span>
            </Link>
          </li>

          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const label = routeLabels[value] || value;

            return (
              <li key={to} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />
                {isLast ? (
                  <span className="text-primary font-medium">{label}</span>
                ) : (
                  <Link
                    to={to}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
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
