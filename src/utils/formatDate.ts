/**
 * Formats a date string to Ukrainian locale
 * @param dateString - Date string in ISO format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formats a date to relative time (e.g., "2 дні тому")
 * @param dateString - Date string in ISO format
 * @returns Relative time string
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Сьогодні';
  if (diffInDays === 1) return 'Вчора';
  if (diffInDays < 7) return `${diffInDays} днів тому`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} тижнів тому`;
  
  return formatDate(dateString);
};
