import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import './i18n/config' // Initialize i18n
import './utils/resetLanguage' // Make resetLanguage() available in console
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Завантаження...</div>
      </div>}>
        <AuthProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </AuthProvider>
      </Suspense>
    </HelmetProvider>
  </StrictMode>,
)
