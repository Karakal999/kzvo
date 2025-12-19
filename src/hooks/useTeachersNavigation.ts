import { useState, useCallback } from 'react';

export type TeachersSection = 'development' | 'nush' | 'journal';
export type DevelopmentTab = 'calendar' | 'communities' | 'attestation';

interface TeachersNavigationState {
  activeSection: TeachersSection;
  activeDevelopmentTab: DevelopmentTab;
}

export const useTeachersNavigation = () => {
  const [state, setState] = useState<TeachersNavigationState>({
    activeSection: 'development',
    activeDevelopmentTab: 'calendar',
  });

  const setActiveSection = useCallback((section: TeachersSection) => {
    setState((prev) => ({
      ...prev,
      activeSection: section,
    }));
  }, []);

  const setActiveDevelopmentTab = useCallback((tab: DevelopmentTab) => {
    setState((prev) => ({
      ...prev,
      activeDevelopmentTab: tab,
    }));
  }, []);

  return {
    activeSection: state.activeSection,
    activeDevelopmentTab: state.activeDevelopmentTab,
    setActiveSection,
    setActiveDevelopmentTab,
  };
};

