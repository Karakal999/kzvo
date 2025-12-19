/**
 * Tests for LanguageSwitcher component
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { renderWithI18n, userEvent, changeLanguage } from '../../test/test-utils';
import LanguageSwitcher from '../LanguageSwitcher';

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Default variant', () => {
    it('should render with Ukrainian selected by default', () => {
      renderWithI18n(<LanguageSwitcher variant="default" />);
      
      const ukButton = screen.getByLabelText(/українська/i);
      const enButton = screen.getByLabelText(/english/i);
      
      expect(ukButton).toBeInTheDocument();
      expect(enButton).toBeInTheDocument();
      
      // UK should have active styles
      expect(ukButton.className).toContain('bg-blue-600');
    });

    it('should switch to English when EN button is clicked', async () => {
      renderWithI18n(<LanguageSwitcher variant="default" />);
      const user = userEvent.setup();
      
      const enButton = screen.getByLabelText(/english/i);
      await user.click(enButton);
      
      await waitFor(() => {
        expect(enButton.className).toContain('bg-blue-600');
      });
    });

    it('should save language preference to localStorage', async () => {
      renderWithI18n(<LanguageSwitcher variant="default" />);
      const user = userEvent.setup();
      
      const enButton = screen.getByLabelText(/english/i);
      await user.click(enButton);
      
      await waitFor(() => {
        // LanguageContext saves as 'EN', not 'en'
        const savedLang = localStorage.getItem('language');
        expect(savedLang).toBe('EN');
      });
    });

    it('should switch back to Ukrainian', async () => {
      renderWithI18n(<LanguageSwitcher variant="default" />);
      const user = userEvent.setup();
      
      const buttons = screen.getAllByRole('button');
      const ukButton = buttons.find(btn => btn.textContent?.includes('🇺🇦'));
      const enButton = buttons.find(btn => btn.textContent?.includes('🇬🇧'));
      
      expect(ukButton).toBeDefined();
      expect(enButton).toBeDefined();
      
      // First switch to English
      await user.click(enButton!);
      
      await waitFor(() => {
        expect(enButton!.className).toContain('bg-blue-600');
      });
      
      // Then switch back to Ukrainian
      await user.click(ukButton!);
      
      await waitFor(() => {
        expect(ukButton!.className).toContain('bg-blue-600');
      });
    });
  });

  describe('Compact variant', () => {
    it('should render flag buttons', () => {
      renderWithI18n(<LanguageSwitcher variant="compact" />);
      
      const ukButton = screen.getByLabelText(/українська/i);
      const enButton = screen.getByLabelText(/english/i);
      
      expect(ukButton).toBeInTheDocument();
      expect(enButton).toBeInTheDocument();
      
      // Check for flag emojis
      expect(ukButton.textContent).toContain('🇺🇦');
      expect(enButton.textContent).toContain('🇬🇧');
    });

    it('should switch language on flag click', async () => {
      renderWithI18n(<LanguageSwitcher variant="compact" />);
      const user = userEvent.setup();
      
      const enButton = screen.getByLabelText(/english/i);
      await user.click(enButton);
      
      await waitFor(() => {
        expect(enButton.className).toContain('ring-blue-600');
      });
    });
  });

  describe('Dropdown variant', () => {
    it('should render dropdown with current language', () => {
      renderWithI18n(<LanguageSwitcher variant="dropdown" />);
      
      // Dropdown variant uses <select>, not <button>
      const select = screen.getByRole('combobox');
      expect(select).toBeInTheDocument();
      expect((select as HTMLSelectElement).value).toBe('UA');
    });

    it('should show both language options', () => {
      renderWithI18n(<LanguageSwitcher variant="dropdown" />);
      
      const ukOption = screen.getByRole('option', { name: /українська/i });
      const enOption = screen.getByRole('option', { name: /english/i });
      
      expect(ukOption).toBeInTheDocument();
      expect(enOption).toBeInTheDocument();
    });

    it('should switch language on select change', async () => {
      renderWithI18n(<LanguageSwitcher variant="dropdown" />);
      const user = userEvent.setup();
      
      const select = screen.getByRole('combobox');
      
      // Select English option
      await user.selectOptions(select, 'EN');
      
      await waitFor(() => {
        expect((select as HTMLSelectElement).value).toBe('EN');
      });
    });
  });

  describe('Language persistence', () => {
    it('should load language from localStorage on mount', () => {
      localStorage.setItem('language', 'EN');
      
      renderWithI18n(<LanguageSwitcher variant="default" />);
      
      const enButton = screen.getByLabelText(/english/i);
      expect(enButton.className).toContain('bg-blue-600');
    });

    it('should persist language changes', async () => {
      renderWithI18n(<LanguageSwitcher variant="default" />);
      const user = userEvent.setup();
      
      const buttons = screen.getAllByRole('button');
      const ukButton = buttons.find(btn => btn.textContent?.includes('🇺🇦'));
      const enButton = buttons.find(btn => btn.textContent?.includes('🇬🇧'));
      
      // Switch to English
      await user.click(enButton!);
      
      await waitFor(() => {
        expect(localStorage.getItem('language')).toBe('EN');
      });
      
      // Switch back to Ukrainian
      await user.click(ukButton!);
      
      await waitFor(() => {
        expect(localStorage.getItem('language')).toBe('UA');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      renderWithI18n(<LanguageSwitcher variant="compact" />);
      
      expect(screen.getByLabelText(/українська/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/english/i)).toBeInTheDocument();
    });

    it('should have proper ARIA current attribute', () => {
      renderWithI18n(<LanguageSwitcher variant="default" />);
      
      const ukButton = screen.getByLabelText(/українська/i);
      const enButton = screen.getByLabelText(/english/i);
      
      expect(ukButton).toHaveAttribute('aria-current', 'true');
      expect(enButton).toHaveAttribute('aria-current', 'false');
    });

    it('should be keyboard navigable', async () => {
      renderWithI18n(<LanguageSwitcher variant="default" />);
      const user = userEvent.setup();
      
      const buttons = screen.getAllByRole('button');
      const ukButton = buttons.find(btn => btn.textContent?.includes('🇺🇦'));
      const enButton = buttons.find(btn => btn.textContent?.includes('🇬🇧'));
      
      // Tab to first button
      await user.tab();
      expect(ukButton).toHaveFocus();
      
      // Tab to second button
      await user.tab();
      expect(enButton).toHaveFocus();
      
      // Enter to activate
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(enButton!.className).toContain('bg-blue-600');
      });
    });
  });

  describe('Visual states', () => {
    it('should highlight active language', () => {
      renderWithI18n(<LanguageSwitcher variant="default" />);
      
      const buttons = screen.getAllByRole('button');
      const ukButton = buttons.find(btn => btn.textContent?.includes('🇺🇦'));
      const enButton = buttons.find(btn => btn.textContent?.includes('🇬🇧'));
      
      expect(ukButton!.className).toContain('bg-blue-600');
      expect(enButton!.className).not.toContain('bg-blue-600');
    });

    it('should update visual state on language change', async () => {
      renderWithI18n(<LanguageSwitcher variant="default" />);
      const user = userEvent.setup();
      
      const buttons = screen.getAllByRole('button');
      const ukButton = buttons.find(btn => btn.textContent?.includes('🇺🇦'));
      const enButton = buttons.find(btn => btn.textContent?.includes('🇬🇧'));
      
      expect(ukButton!.className).toContain('bg-blue-600');
      
      await user.click(enButton!);
      
      await waitFor(() => {
        expect(enButton!.className).toContain('bg-blue-600');
        expect(ukButton!.className).not.toContain('bg-blue-600');
      });
    });
  });
});

