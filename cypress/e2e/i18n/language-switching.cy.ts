/**
 * E2E tests for language switching functionality
 */

describe('Language Switching', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    
    // Visit home page (should redirect to /uk/)
    cy.visit('/');
  });

  it('should redirect to default language (Ukrainian)', () => {
    cy.url().should('include', '/uk/');
    cy.get('html').should('have.attr', 'lang', 'uk');
  });

  it('should display Ukrainian content by default', () => {
    cy.visit('/uk/');
    
    // Check for Ukrainian text in navigation
    cy.contains('Про академію').should('be.visible');
    cy.contains('Освітня діяльність').should('be.visible');
    cy.contains('Контакти').should('be.visible');
  });

  it('should switch to English and update URL', () => {
    cy.visit('/uk/about');
    
    // Check initial state
    cy.url().should('include', '/uk/about');
    cy.contains('Про академію').should('be.visible');
    
    // Find and click English language button
    cy.get('button').contains('EN').click();
    
    // Check URL changed
    cy.url().should('include', '/en/about');
    
    // Check content changed to English
    cy.contains('About academy').should('be.visible');
    cy.contains('Про академію').should('not.exist');
  });

  it('should persist language choice in localStorage', () => {
    cy.visit('/uk/');
    
    // Switch to English
    cy.get('button').contains('EN').click();
    
    // Check localStorage
    cy.window().then((win) => {
      const storedLang = win.localStorage.getItem('language');
      expect(storedLang).to.equal('EN');
    });
    
    // Reload page
    cy.reload();
    
    // Should still be in English
    cy.url().should('include', '/en/');
    cy.get('html').should('have.attr', 'lang', 'en');
  });

  it('should maintain language when navigating between pages', () => {
    cy.visit('/uk/');
    
    // Switch to English
    cy.get('button').contains('EN').click();
    cy.url().should('include', '/en/');
    
    // Navigate to About page
    cy.contains('About academy').click();
    cy.url().should('include', '/en/about');
    
    // Navigate to Contacts
    cy.contains('Contacts').click();
    cy.url().should('include', '/en/contacts');
    
    // Language should still be English
    cy.get('html').should('have.attr', 'lang', 'en');
  });

  it('should handle direct URL access with language prefix', () => {
    cy.visit('/en/about');
    
    // Should display English content
    cy.url().should('include', '/en/about');
    cy.contains('About academy').should('be.visible');
    cy.get('html').should('have.attr', 'lang', 'en');
  });

  it('should handle invalid language prefix', () => {
    cy.visit('/fr/about', { failOnStatusCode: false });
    
    // Should redirect to default language
    cy.url().should('include', '/uk/');
  });

  it('should update all page content when switching language', () => {
    cy.visit('/uk/');
    
    // Check Ukrainian content
    cy.get('footer').within(() => {
      cy.contains('Контакти').should('be.visible');
      cy.contains('Соціальні мережі').should('be.visible');
    });
    
    // Switch to English
    cy.get('button').contains('EN').click();
    
    // Check English content
    cy.get('footer').within(() => {
      cy.contains('Contacts').should('be.visible');
      cy.contains('Social media').should('be.visible');
    });
  });

  it('should highlight active language button', () => {
    cy.visit('/uk/');
    
    // Ukrainian button should be active
    cy.get('button').contains('UA').should('have.class', 'bg-blue-600');
    cy.get('button').contains('EN').should('not.have.class', 'bg-blue-600');
    
    // Switch to English
    cy.get('button').contains('EN').click();
    
    // English button should be active
    cy.get('button').contains('EN').should('have.class', 'bg-blue-600');
    cy.get('button').contains('UA').should('not.have.class', 'bg-blue-600');
  });

  describe('Accessibility', () => {
    it('should be keyboard navigable', () => {
      cy.visit('/uk/');
      
      // Tab to language switcher
      cy.get('body').tab();
      
      // Should be able to activate with Enter
      cy.focused().type('{enter}');
    });

    it('should have proper ARIA attributes', () => {
      cy.visit('/uk/');
      
      cy.get('button').contains('UA').should('have.attr', 'aria-current', 'true');
      cy.get('button').contains('EN').should('have.attr', 'aria-current', 'false');
    });
  });

  describe('Performance', () => {
    it('should switch language quickly', () => {
      cy.visit('/uk/');
      
      const startTime = Date.now();
      
      cy.get('button').contains('EN').click();
      
      cy.url().should('include', '/en/').then(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Language switch should take less than 1 second
        expect(duration).to.be.lessThan(1000);
      });
    });
  });
});

