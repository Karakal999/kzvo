import { useState, useEffect, useMemo } from 'react';
import type { SearchResult } from '../types';
import { searchableContent } from '../data/searchData';

export const useSiteSearch = (query: string, debounceMs: number = 300) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce effect
  useEffect(() => {
    setIsSearching(true);
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [query, debounceMs]);

  // Search logic
  const results = useMemo(() => {
    if (!debouncedQuery.trim() || debouncedQuery.length < 2) {
      return [];
    }

    const searchTerm = debouncedQuery.toLowerCase();
    
    const matchedResults = searchableContent
      .map(item => {
        const titleMatch = item.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
        const categoryMatch = item.category?.toLowerCase().includes(searchTerm);
        const breadcrumbMatch = item.breadcrumb?.toLowerCase().includes(searchTerm);

        // Calculate relevance score
        let score = 0;
        if (titleMatch) {
          score += 3;
          // Exact match bonus
          if (item.title.toLowerCase() === searchTerm) {
            score += 5;
          }
          // Starts with bonus
          if (item.title.toLowerCase().startsWith(searchTerm)) {
            score += 2;
          }
        }
        if (descriptionMatch) score += 1;
        if (categoryMatch) score += 1;
        if (breadcrumbMatch) score += 0.5;

        return {
          ...item,
          score,
          matches: titleMatch || descriptionMatch || categoryMatch || breadcrumbMatch,
        };
      })
      .filter(item => item.matches)
      .sort((a, b) => b.score - a.score)
      .map(({ score, matches, ...item }) => item);

    return matchedResults;
  }, [debouncedQuery]);

  // Group results by type
  const groupedResults = useMemo(() => {
    const groups: Record<string, SearchResult[]> = {
      page: [],
      news: [],
      document: [],
      course: [],
      event: [],
    };

    results.forEach(result => {
      groups[result.type].push(result);
    });

    return groups;
  }, [results]);

  // Get suggestions for no results
  const suggestions = useMemo(() => {
    if (results.length > 0 || !debouncedQuery.trim()) {
      return [];
    }

    // Return popular/recent items as suggestions
    return searchableContent
      .filter(item => item.type === 'page' || item.type === 'course')
      .slice(0, 5);
  }, [results, debouncedQuery]);

  return {
    results,
    groupedResults,
    isSearching,
    hasResults: results.length > 0,
    suggestions,
    query: debouncedQuery,
  };
};

