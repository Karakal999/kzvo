/**
 * Debug component to show current language state
 * Place this in Header to see what's happening
 */
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

export const DebugLanguage = () => {
  const { i18n, t } = useTranslation('navigation');
  const { lang } = useParams<{ lang: string }>();
  
  if (import.meta.env.DEV) {
    return (
      <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs z-[9999] max-w-xs">
        <div className="font-bold mb-2">🐛 Language Debug</div>
        <div>URL lang: <span className="text-yellow-300">{lang || 'none'}</span></div>
        <div>i18n.language: <span className="text-green-300">{i18n.language}</span></div>
        <div>i18n ready: <span className="text-blue-300">{i18n.isInitialized ? 'Yes' : 'No'}</span></div>
        <div className="mt-2 text-gray-400">Test: {t('menu.about')}</div>
      </div>
    );
  }
  
  return null;
};
