import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';
import { PageSkeleton } from './components/LoadingSkeleton';

// Eager load critical pages
import Home from './pages/Home';

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

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path="about"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="activity"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Activity />
                </Suspense>
              }
            />
            <Route
              path="education"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Education />
                </Suspense>
              }
            />
            <Route
              path="teachers"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Teachers />
                </Suspense>
              }
            />
            <Route
              path="students"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Students />
                </Suspense>
              }
            />
            <Route
              path="resources"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Resources />
                </Suspense>
              }
            />
            <Route
              path="news"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <News />
                </Suspense>
              }
            />
            <Route
              path="contacts"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Contacts />
                </Suspense>
              }
            />
            <Route
              path="events"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Events />
                </Suspense>
              }
            />
            <Route
              path="competitions"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <Competitions />
                </Suspense>
              }
            />
            <Route
              path="programs"
              element={
                <Suspense fallback={<PageSkeleton />}>
                  <EducationPrograms />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
