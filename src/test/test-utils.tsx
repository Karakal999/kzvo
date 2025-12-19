/**
 * Test utilities for i18n testing
 */

import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageProvider } from '../context/LanguageContext';

// Import test translations
import commonUk from '../locales/uk/common.json';
import commonEn from '../locales/en/common.json';
import navigationUk from '../locales/uk/navigation.json';
import navigationEn from '../locales/en/navigation.json';

/**
 * Create i18n instance for testing
 */
export function createTestI18n(language: 'uk' | 'en' = 'uk') {
  const testI18n = i18n.createInstance();

  testI18n
    .use(initReactI18next)
    .init({
      lng: language,
      fallbackLng: 'uk',
      resources: {
        uk: {
          common: commonUk,
          navigation: navigationUk,
        },
        en: {
          common: commonEn,
          navigation: navigationEn,
        },
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

  return testI18n;
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  language?: 'uk' | 'en';
  route?: string;
}

/**
 * Custom render with i18n and router
 */
export function renderWithI18n(
  ui: ReactElement,
  { language = 'uk', route = '/', ...renderOptions }: CustomRenderOptions = {}
) {
  const testI18n = createTestI18n(language);

  if (route !== '/') {
    window.history.pushState({}, 'Test page', route);
  }

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        <I18nextProvider i18n={testI18n}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </I18nextProvider>
      </BrowserRouter>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    i18n: testI18n,
  };
}

/**
 * Wait for i18n to be ready
 */
export async function waitForI18n(i18nInstance: typeof i18n) {
  if (i18nInstance.isInitialized) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const checkInit = () => {
      if (i18nInstance.isInitialized) {
        resolve();
      } else {
        setTimeout(checkInit, 50);
      }
    };
    checkInit();
  });
}

/**
 * Change language in tests
 */
export async function changeLanguage(i18nInstance: typeof i18n, language: 'uk' | 'en') {
  await i18nInstance.changeLanguage(language);
  // Wait for rerender
  await new Promise(resolve => setTimeout(resolve, 100));
}

// Re-export everything from testing library
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

