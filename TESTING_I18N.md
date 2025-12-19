# Testing Multilingual Functionality

Comprehensive testing guide for the i18n system.

## Table of Contents

1. [Unit Tests](#unit-tests)
2. [E2E Tests](#e2e-tests)
3. [Translation Validation](#translation-validation)
4. [Performance Testing](#performance-testing)
5. [CI/CD Integration](#cicd-integration)

---

## Unit Tests

### Running Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Structure

```
src/
├── components/
│   └── __tests__/
│       └── LanguageSwitcher.test.tsx
├── hooks/
│   └── __tests__/
│       └── useTypedTranslation.test.ts
└── test/
    ├── setup.ts
    └── test-utils.tsx
```

### Writing Unit Tests

```typescript
import { renderWithI18n, screen, userEvent } from '@/test/test-utils';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render in Ukrainian', () => {
    renderWithI18n(<MyComponent />, { language: 'uk' });
    expect(screen.getByText('Привіт')).toBeInTheDocument();
  });

  it('should render in English', () => {
    renderWithI18n(<MyComponent />, { language: 'en' });
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should switch language', async () => {
    const { i18n } = renderWithI18n(<MyComponent />);
    const user = userEvent.setup();

    await user.click(screen.getByText('EN'));

    await waitFor(() => {
      expect(i18n.language).toBe('en');
    });
  });
});
```

### Test Coverage

Current coverage targets:
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 80%
- **Lines**: 80%

---

## E2E Tests

### Running E2E Tests

```bash
# Open Cypress UI
npm run cypress:open

# Run Cypress headless
npm run cypress:run

# Run E2E tests with dev server
npm run test:e2e
```

### Test Structure

```
cypress/
├── e2e/
│   └── i18n/
│       ├── language-switching.cy.ts
│       └── content-translation.cy.ts
├── support/
│   ├── commands.ts
│   └── e2e.ts
└── cypress.config.ts
```

### Writing E2E Tests

```typescript
describe('Language Switching', () => {
  it('should switch to English and update URL', () => {
    cy.visit('/uk/about');
    
    // Check initial state
    cy.url().should('include', '/uk/about');
    cy.contains('Про академію').should('be.visible');
    
    // Switch language
    cy.get('button').contains('EN').click();
    
    // Check updated state
    cy.url().should('include', '/en/about');
    cy.contains('About academy').should('be.visible');
  });
});
```

### Custom Commands

```typescript
// Select language
cy.selectLanguage('en');

// Check current language
cy.checkLanguage('uk');

// Check localStorage
cy.checkLocalStorageLanguage('UA');
```

---

## Translation Validation

### Running Validation

```bash
# Validate all translations
npm run i18n:validate

# Check for missing keys
npm run i18n:check-missing

# Sync translations
npm run i18n:sync
```

### Validation Checks

The validation script checks for:

1. **Missing Keys**: Keys present in default language but missing in others
2. **Extra Keys**: Keys in translations not in default language
3. **Variable Consistency**: Interpolation variables match across languages
4. **HTML Balance**: HTML tags are properly balanced
5. **Empty Values**: No empty translation strings
6. **Untranslated Values**: Values still containing language prefixes

### Example Output

```
╔════════════════════════════════════════╗
║   Translation Validation Tool         ║
╚════════════════════════════════════════╝

📦 Validating namespace: common
  ✓ Validation complete

📦 Validating namespace: navigation
  ✓ Validation complete

═════════════════════════════════════════
          VALIDATION REPORT              
═════════════════════════════════════════

✓ No errors found!

✓ No warnings!

Summary:
  Errors: 0
  Warnings: 0

✅ Validation passed!
```

---

## Performance Testing

### Running Performance Checks

```bash
# Check translation bundle size and performance
npm run i18n:performance
```

### Performance Metrics

The performance script analyzes:

1. **File Sizes**: Individual translation file sizes
2. **Total Size**: Combined size of all translations
3. **Bundle Impact**: Percentage of total bundle size
4. **Load Time**: Estimated loading time on different connections
5. **Large Files**: Files exceeding 50KB threshold

### Example Output

```
╔════════════════════════════════════════╗
║   Translation Performance Check       ║
╚════════════════════════════════════════╝

📦 UK Translation Files:
  common.json          12.5 KB
  navigation.json       3.2 KB
  pages.json           8.7 KB
  Total:              24.4 KB

📦 EN Translation Files:
  common.json          11.8 KB
  navigation.json       2.9 KB
  pages.json           8.1 KB
  Total:              22.8 KB

═════════════════════════════════════════
          PERFORMANCE SUMMARY            
═════════════════════════════════════════

📊 Total Translation Size: 47.2 KB
📊 Average per Language: 23.6 KB

⏱️  Estimated Load Time:
  3G (100 KB/s): 0.47s
  4G (500 KB/s): 0.09s
  WiFi (5 MB/s): 0.01s

═════════════════════════════════════════
          PERFORMANCE SCORE              
═════════════════════════════════════════

95/100

✅ Excellent! Your translations are well optimized.
```

### Performance Recommendations

- Keep individual files under 50KB
- Use lazy loading for large namespaces
- Enable gzip compression on server
- Cache translation files with long TTL
- Consider CDN for static translation files

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: I18N Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Validate translations
        run: npm run i18n:validate
      
      - name: Check translation performance
        run: npm run i18n:performance
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
```

### Pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Validate translations before commit
npm run i18n:validate

# Run unit tests
npm run test -- --run
```

---

## Best Practices

### 1. Test Translation Keys, Not Values

❌ **Bad:**
```typescript
expect(screen.getByText('Про академію')).toBeInTheDocument();
```

✅ **Good:**
```typescript
const { t } = useTranslation('navigation');
expect(screen.getByText(t('header.about'))).toBeInTheDocument();
```

### 2. Test Language Switching Logic

```typescript
it('should update URL when language changes', async () => {
  const { user } = renderWithI18n(<App />);
  
  await user.click(screen.getByText('EN'));
  
  await waitFor(() => {
    expect(window.location.pathname).toMatch(/^\/en\//);
  });
});
```

### 3. Test Interpolation

```typescript
it('should interpolate variables correctly', () => {
  const { t } = useTranslation('common');
  
  expect(t('welcome', { name: 'John' })).toBe('Welcome, John!');
});
```

### 4. Test Pluralization

```typescript
it('should handle pluralization', () => {
  const { t } = useTranslation('common');
  
  expect(t('items', { count: 0 })).toBe('No items');
  expect(t('items', { count: 1 })).toBe('1 item');
  expect(t('items', { count: 5 })).toBe('5 items');
});
```

### 5. Test Fallback Behavior

```typescript
it('should fallback to default language', () => {
  const { i18n } = renderWithI18n(<App />, { language: 'fr' });
  
  // Should fallback to Ukrainian
  expect(i18n.language).toBe('uk');
});
```

---

## Troubleshooting

### Tests Failing After Translation Updates

1. Clear test cache: `npm run test -- --clearCache`
2. Rebuild: `npm run build`
3. Re-run tests: `npm run test`

### E2E Tests Timing Out

1. Increase timeout in `cypress.config.ts`:
   ```typescript
   defaultCommandTimeout: 10000
   ```
2. Add explicit waits:
   ```typescript
   cy.wait(500);
   ```

### Translation Keys Not Found

1. Check file exists: `src/locales/{lang}/{namespace}.json`
2. Verify key path: `common.buttons.submit`
3. Restart dev server: `npm run dev`

---

## Continuous Improvement

### Metrics to Track

- Test coverage percentage
- Number of missing translations
- Translation file sizes
- Load time performance
- E2E test execution time

### Regular Tasks

- [ ] Weekly: Review test coverage
- [ ] Monthly: Audit translation performance
- [ ] Quarterly: Update E2E test scenarios
- [ ] Before release: Run full test suite

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Library](https://testing-library.com/)
- [i18next Testing Guide](https://www.i18next.com/misc/testing)

