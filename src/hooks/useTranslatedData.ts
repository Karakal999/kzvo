import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { 
  TranslatedContent, 
  ContentLanguage, 
  ExtractedTranslation 
} from '../types/translated-content';

/**
 * Hook to load and extract translated data based on current language
 * 
 * @example
 * const { data, loading, error } = useTranslatedData<TranslatedNews>('news', newsId);
 * 
 * if (loading) return <Loader />;
 * if (error) return <Error message={error} />;
 * 
 * return (
 *   <div>
 *     <h1>{data.title}</h1>
 *     <p>{data.content}</p>
 *   </div>
 * );
 */
export function useTranslatedData<T extends TranslatedContent>(
  type: string,
  id: string | number,
  options?: {
    skip?: boolean;
    refetchOnLangChange?: boolean;
  }
) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as ContentLanguage;

  const [data, setData] = useState<ExtractedTranslation<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options?.skip) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/${type}/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${type}`);
        }

        const rawData: T = await response.json();
        const extractedData = extractTranslation(rawData, currentLang);
        
        setData(extractedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id, currentLang, options?.skip, options?.refetchOnLangChange]);

  return { data, loading, error, refetch: () => {} };
}

/**
 * Hook to load translated list data
 * 
 * @example
 * const { data, loading } = useTranslatedList<TranslatedNews>('news', {
 *   category: 'announcements',
 *   limit: 10
 * });
 */
export function useTranslatedList<T extends TranslatedContent>(
  type: string,
  params?: Record<string, any>
) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as ContentLanguage;

  const [data, setData] = useState<ExtractedTranslation<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`/api/${type}?${queryString}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} list`);
        }

        const result = await response.json();
        const rawData: T[] = result.data || result;
        
        const extractedData = rawData.map(item => 
          extractTranslation(item, currentLang)
        );
        
        setData(extractedData);
        setTotal(result.total || rawData.length);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, JSON.stringify(params), currentLang]);

  return { data, loading, error, total };
}

/**
 * Extract translation for current language from multilingual object
 */
export function extractTranslation<T extends TranslatedContent>(
  data: T,
  lang: ContentLanguage
): ExtractedTranslation<T> {
  const { translations, ...rest } = data;
  const translatedData = translations[lang];

  return {
    ...rest,
    ...translatedData,
  } as ExtractedTranslation<T>;
}

/**
 * Hook to get translation extractor function
 * 
 * @example
 * const extract = useTranslationExtractor();
 * const localizedNews = extract(newsData);
 */
export function useTranslationExtractor() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as ContentLanguage;

  return <T extends TranslatedContent>(data: T) => 
    extractTranslation(data, currentLang);
}

/**
 * Hook to check if current language data exists
 */
export function useHasTranslation<T extends TranslatedContent>(
  data: T | null,
  lang?: ContentLanguage
): boolean {
  const { i18n } = useTranslation();
  const checkLang = lang || (i18n.language as ContentLanguage);

  if (!data || !data.translations) return false;
  
  return checkLang in data.translations && 
         !!data.translations[checkLang];
}

