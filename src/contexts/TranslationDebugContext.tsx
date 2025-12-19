/**
 * Translation Debug Context
 * 
 * Provides tools for debugging and managing translations in development mode
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface MissingKey {
  key: string;
  namespace: string;
  timestamp: number;
}

interface TranslationDebugContextType {
  /**
   * Is translation debug mode enabled
   */
  isTranslationMode: boolean;

  /**
   * Toggle translation mode
   */
  toggleTranslationMode: () => void;

  /**
   * List of missing translation keys
   */
  missingKeys: MissingKey[];

  /**
   * Add a missing key
   */
  addMissingKey: (key: string, namespace: string) => void;

  /**
   * Clear missing keys
   */
  clearMissingKeys: () => void;

  /**
   * Show translation keys on hover
   */
  showKeysOnHover: boolean;

  /**
   * Toggle show keys on hover
   */
  toggleShowKeysOnHover: () => void;

  /**
   * Highlight untranslated keys
   */
  highlightUntranslated: boolean;

  /**
   * Toggle highlight untranslated
   */
  toggleHighlightUntranslated: () => void;
}

const TranslationDebugContext = createContext<TranslationDebugContextType | undefined>(undefined);

/**
 * Hook to use translation debug context
 */
export function useTranslationDebug() {
  const context = useContext(TranslationDebugContext);
  if (!context) {
    throw new Error('useTranslationDebug must be used within TranslationDebugProvider');
  }
  return context;
}

interface TranslationDebugProviderProps {
  children: ReactNode;
  /**
   * Enable only in development mode
   */
  enableInDev?: boolean;
}

/**
 * Translation Debug Provider
 * 
 * Enables development tools for managing translations
 * 
 * @example
 * <TranslationDebugProvider enableInDev>
 *   <App />
 * </TranslationDebugProvider>
 */
export function TranslationDebugProvider({ 
  children, 
  enableInDev = true 
}: TranslationDebugProviderProps) {
  const { i18n } = useTranslation();

  // Only enable in development
  const isDev = import.meta.env.DEV;
  const isEnabled = enableInDev && isDev;

  const [isTranslationMode, setIsTranslationMode] = useState(() => {
    if (!isEnabled) return false;
    return localStorage.getItem('translationMode') === 'true';
  });

  const [showKeysOnHover, setShowKeysOnHover] = useState(() => {
    if (!isEnabled) return false;
    return localStorage.getItem('showKeysOnHover') === 'true';
  });

  const [highlightUntranslated, setHighlightUntranslated] = useState(() => {
    if (!isEnabled) return false;
    return localStorage.getItem('highlightUntranslated') === 'true';
  });

  const [missingKeys, setMissingKeys] = useState<MissingKey[]>([]);

  const toggleTranslationMode = useCallback(() => {
    if (!isEnabled) return;
    
    setIsTranslationMode(prev => {
      const newValue = !prev;
      localStorage.setItem('translationMode', String(newValue));
      return newValue;
    });
  }, [isEnabled]);

  const toggleShowKeysOnHover = useCallback(() => {
    if (!isEnabled) return;
    
    setShowKeysOnHover(prev => {
      const newValue = !prev;
      localStorage.setItem('showKeysOnHover', String(newValue));
      return newValue;
    });
  }, [isEnabled]);

  const toggleHighlightUntranslated = useCallback(() => {
    if (!isEnabled) return;
    
    setHighlightUntranslated(prev => {
      const newValue = !prev;
      localStorage.setItem('highlightUntranslated', String(newValue));
      return newValue;
    });
  }, [isEnabled]);

  const addMissingKey = useCallback((key: string, namespace: string) => {
    if (!isEnabled) return;
    
    setMissingKeys(prev => {
      // Check if already exists
      if (prev.some(item => item.key === key && item.namespace === namespace)) {
        return prev;
      }
      
      return [...prev, { key, namespace, timestamp: Date.now() }];
    });
  }, [isEnabled]);

  const clearMissingKeys = useCallback(() => {
    setMissingKeys([]);
  }, []);

  // Listen for i18n missing key events
  useEffect(() => {
    if (!isEnabled || !isTranslationMode) return;

    const handleMissingKey = (_lngs: readonly string[], namespace: string, key: string) => {
      addMissingKey(key, namespace);
      console.warn(`[i18n] Missing translation: ${namespace}:${key}`);
    };

    i18n.on('missingKey', handleMissingKey);

    return () => {
      i18n.off('missingKey', handleMissingKey);
    };
  }, [i18n, isEnabled, isTranslationMode, addMissingKey]);

  // Add CSS for highlighting
  useEffect(() => {
    if (!isEnabled || !highlightUntranslated) return;

    const style = document.createElement('style');
    style.id = 'translation-debug-styles';
    style.innerHTML = `
      [data-translation-key] {
        outline: 1px dashed rgba(255, 0, 0, 0.3);
        position: relative;
      }
      
      [data-translation-key]:hover {
        outline: 2px solid rgba(255, 0, 0, 0.6);
        background-color: rgba(255, 255, 0, 0.1);
      }
      
      [data-translation-missing="true"] {
        background-color: rgba(255, 0, 0, 0.2);
        outline: 2px solid red;
      }
    `;

    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('translation-debug-styles');
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }
    };
  }, [isEnabled, highlightUntranslated]);

  if (!isEnabled) {
    return <>{children}</>;
  }

  return (
    <TranslationDebugContext.Provider
      value={{
        isTranslationMode,
        toggleTranslationMode,
        missingKeys,
        addMissingKey,
        clearMissingKeys,
        showKeysOnHover,
        toggleShowKeysOnHover,
        highlightUntranslated,
        toggleHighlightUntranslated,
      }}
    >
      {children}
    </TranslationDebugContext.Provider>
  );
}

