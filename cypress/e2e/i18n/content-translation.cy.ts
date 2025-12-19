/**
 * E2E tests for content translation
 */

describe('Content Translation', () => {
  describe('Navigation', () => {
    it('should translate all navigation items', () => {
      // Ukrainian
      cy.visit('/uk/');
      cy.contains('Про академію').should('be.visible');
      cy.contains('Освітня діяльність').should('be.visible');
      cy.contains('Викладачі').should('be.visible');
      cy.contains('Студентам').should('be.visible');
      cy.contains('Ресурси').should('be.visible');
      cy.contains('Новини').should('be.visible');
      cy.contains('Контакти').should('be.visible');
      
      // English
      cy.visit('/en/');
      cy.contains('About').should('be.visible');
      cy.contains('Education').should('be.visible');
      cy.contains('Teachers').should('be.visible');
      cy.contains('Students').should('be.visible');
      cy.contains('Resources').should('be.visible');
      cy.contains('News').should('be.visible');
      cy.contains('Contacts').should('be.visible');
    });
  });

  describe('Footer', () => {
    it('should translate footer content', () => {
      // Ukrainian
      cy.visit('/uk/');
      cy.get('footer').within(() => {
        cy.contains('Контакти').should('be.visible');
        cy.contains('Соціальні мережі').should('be.visible');
        cy.contains('Всі права захищені').should('be.visible');
      });
      
      // English
      cy.visit('/en/');
      cy.get('footer').within(() => {
        cy.contains('Contacts').should('be.visible');
        cy.contains('Social media').should('be.visible');
        cy.contains('All rights reserved').should('be.visible');
      });
    });
  });

  describe('Page Content', () => {
    it('should translate About page', () => {
      // Ukrainian
      cy.visit('/uk/about');
      cy.contains('Про академію').should('be.visible');
      
      // English
      cy.visit('/en/about');
      cy.contains('About academy').should('be.visible');
    });

    it('should translate buttons and CTAs', () => {
      cy.visit('/uk/');
      cy.contains('Детальніше').should('be.visible');
      
      cy.visit('/en/');
      cy.contains('Learn more').should('be.visible');
    });
  });

  describe('Forms', () => {
    it('should translate form placeholders', () => {
      cy.visit('/uk/contacts');
      
      // Check Ukrainian placeholders
      cy.get('input[type="text"]').first().should('have.attr', 'placeholder').and('match', /Ім'я|Ваше ім'я/i);
      cy.get('input[type="email"]').should('have.attr', 'placeholder').and('match', /Email|Ваш email/i);
      
      // Switch to English
      cy.visit('/en/contacts');
      
      // Check English placeholders
      cy.get('input[type="text"]').first().should('have.attr', 'placeholder').and('match', /Name|Your name/i);
      cy.get('input[type="email"]').should('have.attr', 'placeholder').and('match', /Email|Your email/i);
    });

    it('should translate validation messages', () => {
      cy.visit('/uk/contacts');
      
      // Try to submit empty form
      cy.get('button[type="submit"]').click();
      
      // Should show Ukrainian error messages
      cy.contains(/обов'язкове|заповніть/i).should('be.visible');
      
      // Switch to English
      cy.visit('/en/contacts');
      cy.get('button[type="submit"]').click();
      
      // Should show English error messages
      cy.contains(/required|fill/i).should('be.visible');
    });
  });

  describe('Meta Tags', () => {
    it('should have translated page titles', () => {
      cy.visit('/uk/about');
      cy.title().should('include', 'Про академію');
      
      cy.visit('/en/about');
      cy.title().should('include', 'About');
    });

    it('should have correct lang attribute', () => {
      cy.visit('/uk/');
      cy.get('html').should('have.attr', 'lang', 'uk');
      
      cy.visit('/en/');
      cy.get('html').should('have.attr', 'lang', 'en');
    });
  });

  describe('Dynamic Content', () => {
    it('should translate news items', () => {
      // Ukrainian
      cy.visit('/uk/news');
      cy.contains('Новини').should('be.visible');
      
      // English
      cy.visit('/en/news');
      cy.contains('News').should('be.visible');
    });
  });

  describe('Error Messages', () => {
    it('should show translated 404 page', () => {
      cy.visit('/uk/non-existent-page', { failOnStatusCode: false });
      cy.contains(/не знайдено|404/i).should('be.visible');
      
      cy.visit('/en/non-existent-page', { failOnStatusCode: false });
      cy.contains(/not found|404/i).should('be.visible');
    });
  });
});

