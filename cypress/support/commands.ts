/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/**
 * Select language using the language switcher
 */
Cypress.Commands.add('selectLanguage', (lang: 'uk' | 'en') => {
  const langMap = {
    uk: 'UA',
    en: 'EN',
  };
  
  // Find and click the appropriate language button
  cy.get('[data-testid="language-switcher"]').within(() => {
    cy.contains(langMap[lang]).click();
  });
  
  // Wait for language change to complete
  cy.wait(500);
});

/**
 * Check if the current page is in the specified language
 */
Cypress.Commands.add('checkLanguage', (lang: 'uk' | 'en') => {
  // Check URL contains language prefix
  cy.url().should('include', `/${lang}/`);
  
  // Check HTML lang attribute
  cy.get('html').should('have.attr', 'lang', lang);
});

/**
 * Check localStorage for language preference
 */
Cypress.Commands.add('checkLocalStorageLanguage', (lang: 'UA' | 'EN') => {
  cy.window().then((win) => {
    const storedLang = win.localStorage.getItem('language');
    expect(storedLang).to.equal(lang);
  });
});

// Prevent TypeScript errors
export {};

