import { GraduationCap, BookOpen, Trophy, Calendar, Award, FileText, Users, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import CalendarWidget from '../components/CalendarWidget';
import NewsSection from '../components/NewsSection';
import Announcements from '../components/Announcements';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const Home = () => {
  const { t, i18n } = useTranslation('pages');
  
  // Force re-render when language changes
  useEffect(() => {
    console.log('[Home] Current language:', i18n.language);
    console.log('[Home] Test translation:', t('home.title'));
  }, [i18n.language, t]);
  const audienceButtons = [
    { id: 'teacher', label: t('home.hero.i_am_teacher'), icon: <GraduationCap className="h-6 w-6" /> },
    { id: 'student', label: t('home.hero.i_am_student'), icon: <BookOpen className="h-6 w-6" /> },
    { id: 'applicant', label: t('home.hero.i_am_applicant'), icon: <Users className="h-6 w-6" /> },
  ];

  const quickLinksTeachers = [
    {
      title: t('home.teachers.courses.title'),
      description: t('home.teachers.courses.description'),
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      url: '/teachers',
    },
    {
      title: t('home.teachers.competition.title'),
      description: t('home.teachers.competition.description'),
      icon: <Award className="h-8 w-8 text-primary" />,
      url: '/teachers',
    },
    {
      title: t('home.teachers.nush.title'),
      description: t('home.teachers.nush.description'),
      icon: <FileText className="h-8 w-8 text-primary" />,
      url: '/resources',
    },
  ];

  const quickLinksStudents = [
    {
      title: t('home.students.olympiads.title'),
      description: t('home.students.olympiads.description'),
      icon: <Trophy className="h-8 w-8 text-accent" />,
      url: '/students',
    },
    {
      title: t('home.students.competitions.title'),
      description: t('home.students.competitions.description'),
      icon: <Award className="h-8 w-8 text-accent" />,
      url: '/students',
    },
    {
      title: t('home.students.intellectual.title'),
      description: t('home.students.intellectual.description'),
      icon: <Users className="h-8 w-8 text-accent" />,
      url: '/students',
    },
  ];

  const quickLinksApplicants = [
    {
      title: t('home.applicants.master.title'),
      description: t('home.applicants.master.description'),
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      url: '/education',
    },
    {
      title: t('home.applicants.schedule.title'),
      description: t('home.applicants.schedule.description'),
      icon: <Calendar className="h-8 w-8 text-primary" />,
      url: '/contacts',
    },
    {
      title: t('home.applicants.specialties.title'),
      description: t('home.applicants.specialties.description'),
      icon: <Briefcase className="h-8 w-8 text-primary" />,
      url: '/education',
    },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary via-blue-800 to-blue-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo Icon */}
            <div className="mb-6 flex justify-center">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <GraduationCap className="h-16 w-16 text-accent" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {t('home.title')}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              {t('home.subtitle')}
            </p>

            {/* Audience Selector Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              {audienceButtons.map((button) => (
                <button
                  key={button.id}
                  className="flex items-center justify-center space-x-3 px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-accent hover:text-white transition-all transform hover:scale-105 shadow-lg"
                >
                  {button.icon}
                  <span>{button.label}</span>
                </button>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-accent mb-1">500+</div>
                <div className="text-sm">{t('home.stats.graduates')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-accent mb-1">50+</div>
                <div className="text-sm">{t('home.stats.programs')}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-accent mb-1">25+</div>
                <div className="text-sm">{t('home.stats.experience')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24">
          <svg 
            viewBox="0 0 1440 120" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Announcements Slider */}
      <Announcements />

      {/* Calendar Widget Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <CalendarWidget />
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            {t('home.quick_access.title')}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* For Teachers */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{t('home.quick_access.for_teachers')}</h3>
              </div>
              <div className="space-y-4">
                {quickLinksTeachers.map((link, index) => (
                  <Link
                    key={index}
                    to={link.url}
                    className="block p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                        {link.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600">{link.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* For Students */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <BookOpen className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{t('home.quick_access.for_students')}</h3>
              </div>
              <div className="space-y-4">
                {quickLinksStudents.map((link, index) => (
                  <Link
                    key={index}
                    to={link.url}
                    className="block p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-accent hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                        {link.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-accent transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600">{link.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* For Applicants */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">{t('home.quick_access.for_applicants')}</h3>
              </div>
              <div className="space-y-4">
                {quickLinksApplicants.map((link, index) => (
                  <Link
                    key={index}
                    to={link.url}
                    className="block p-5 bg-white border-2 border-gray-200 rounded-lg hover:border-primary hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 group-hover:scale-110 transition-transform">
                        {link.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                          {link.title}
                        </h4>
                        <p className="text-sm text-gray-600">{link.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <NewsSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/education"
              className="px-8 py-4 bg-accent text-primary rounded-lg font-bold text-lg hover:bg-accent/90 transition-colors inline-block"
            >
              {t('home.cta.programs_button')}
            </Link>
            <Link
              to="/contacts"
              className="px-8 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              {t('home.cta.contact_button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
