/**
 * Utility to reset language settings
 * Use this in browser console if language is stuck
 */

export const resetLanguage = () => {
  console.log('🔄 Resetting language settings...');
  
  // Clear all language-related localStorage items
  localStorage.removeItem('language');
  localStorage.removeItem('i18nextLng');
  
  console.log('✅ Language settings cleared');
  console.log('🔄 Reloading page...');
  
  // Reload page
  window.location.href = '/uk';
};

// Make available in console for debugging
if (typeof window !== 'undefined') {
  (window as any).resetLanguage = resetLanguage;
  console.log('💡 Tip: Run resetLanguage() in console to reset language settings');
}

export default resetLanguage;

