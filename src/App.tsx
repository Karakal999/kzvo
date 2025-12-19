import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';
import { PageSkeleton } from './components/LoadingSkeleton';

// Eager load critical pages
import Home from './pages/Home';

// Language validator wrapper
const LanguageValidator = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useParams<{ lang: string }>();
  
  // Only allow 'uk' and 'en'
  if (lang && lang !== 'uk' && lang !== 'en') {
    return <Navigate to="/uk" replace />;
  }
  
  return <>{children}</>;
};

// Lazy load heavy pages
const About = lazy(() => import('./pages/About'));
const Activity = lazy(() => import('./pages/Activity'));
const Education = lazy(() => import('./pages/Education'));
const Teachers = lazy(() => import('./pages/Teachers'));
const Students = lazy(() => import('./pages/Students'));
const Resources = lazy(() => import('./pages/Resources'));
const News = lazy(() => import('./pages/News'));
const Contacts = lazy(() => import('./pages/Contacts'));
const Events = lazy(() => import('./pages/Events'));
const Competitions = lazy(() => import('./pages/Competitions'));
const EducationPrograms = lazy(() => import('./pages/EducationPrograms'));

/**
 * App Component with Language-aware Routing
 * 
 * URL Structure:
 * - / → redirects to /uk (default language)
 * - /:lang/ → language-specific home page
 * - /:lang/about → language-specific about page
 * - etc.
 * 
 * Supported languages: uk (Ukrainian), en (English)
 * Invalid languages redirect to Ukrainian version
 */
function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Root redirect to default language */}
          <Route path="/" element={<Navigate to="/uk" replace />} />
          
          {/* Language-specific routes */}
          <Route path="/:lang" element={
            <LanguageValidator>
              <MainLayout />
            </LanguageValidator>
          }>
            {/* Home page */}
            <Route index element={<Home />} />
            
            {/* About page */}
            <Route
              path="about"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <About />
                </Suspense>
              }
            />
            
            {/* Activity page */}
            <Route
              path="activity"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Activity />
                </Suspense>
              }
            />
            
            {/* Education page */}
            <Route
              path="education"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Education />
                </Suspense>
              }
            />
            
            {/* Teachers page */}
            <Route
              path="teachers"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Teachers />
                </Suspense>
              }
            />
            
            {/* Students page */}
            <Route
              path="students"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Students />
                </Suspense>
              }
            />
            
            {/* Resources page */}
            <Route
              path="resources"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Resources />
                </Suspense>
              }
            />
            
            {/* News page */}
            <Route
              path="news"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <News />
                </Suspense>
              }
            />
            
            {/* Contacts page */}
            <Route
              path="contacts"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Contacts />
                </Suspense>
              }
            />
            
            {/* Events page */}
            <Route
              path="events"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Events />
                </Suspense>
              }
            />
            
            {/* Competitions page */}
            <Route
              path="competitions"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Competitions />
                </Suspense>
              }
            />
            
            {/* Education Programs page */}
            <Route
              path="programs"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <EducationPrograms />
                </Suspense>
              }
            />
            
            {/* Privacy & Terms */}
            <Route path="privacy" element={<div>Privacy Policy</div>} />
            <Route path="terms" element={<div>Terms of Use</div>} />
          </Route>
          
          {/* Catch-all for invalid routes - redirect to home with default language */}
          <Route path="*" element={<Navigate to="/uk" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
