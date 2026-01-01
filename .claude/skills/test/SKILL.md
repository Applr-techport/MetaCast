---
name: test
description: Playwright E2E test creation. Use when writing automated UI tests.
---

# MetaCast Test Rules

## File Structure

```
tests/
├── e2e/
│   ├── auth.spec.ts       # Login/signup tests
│   ├── dashboard.spec.ts  # Dashboard tests
│   ├── streams.spec.ts    # Stream management tests
│   ├── assets.spec.ts     # Assets page tests
│   └── live.spec.ts       # Live streaming tests
├── fixtures/
│   └── test-data.ts       # Test data
└── playwright.config.ts   # Playwright config
```

## Playwright Config

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

## Test Template

```typescript
import { test, expect } from '@playwright/test'

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: navigate to page
    await page.goto('/dashboard')
  })

  test('should do something', async ({ page }) => {
    // Arrange
    await page.waitForLoadState('networkidle')

    // Act
    await page.click('button:has-text("Create")')

    // Assert
    await expect(page.locator('h1')).toHaveText('Expected Title')
  })
})
```

## Common Test Patterns

### Page Navigation
```typescript
test('should navigate to assets page', async ({ page }) => {
  await page.goto('/dashboard')
  await page.click('a:has-text("Assets")')

  await expect(page).toHaveURL('/assets')
  await expect(page.locator('h1')).toHaveText('Assets')
})
```

### Form Submission
```typescript
test('should create new stream', async ({ page }) => {
  await page.goto('/schedule/new')

  // Fill form
  await page.fill('input[name="title"]', 'Test Stream')
  await page.fill('textarea[name="description"]', 'Test description')
  await page.selectOption('select[name="platform"]', 'youtube')

  // Submit
  await page.click('button:has-text("Schedule")')

  // Verify
  await expect(page.locator('.toast')).toHaveText('Stream scheduled')
})
```

### Modal Interaction
```typescript
test('should open and close modal', async ({ page }) => {
  await page.goto('/assets')

  // Open modal
  await page.click('button:has-text("Upload")')
  await expect(page.locator('[role="dialog"]')).toBeVisible()

  // Close modal
  await page.click('button[aria-label="Close"]')
  await expect(page.locator('[role="dialog"]')).not.toBeVisible()
})
```

### Pagination
```typescript
test('should paginate through items', async ({ page }) => {
  await page.goto('/assets')

  // Check initial page
  await expect(page.locator('.asset-card')).toHaveCount(12)

  // Go to next page
  await page.click('button:has-text("Next")')

  // Verify page changed
  await expect(page.locator('text=Page 2')).toBeVisible()
})
```

### Dropdown Selection
```typescript
test('should filter by folder', async ({ page }) => {
  await page.goto('/assets')

  // Open dropdown
  await page.click('[data-testid="folder-filter"]')

  // Select option
  await page.click('text=Marketing')

  // Verify filter applied
  await expect(page.locator('.asset-card')).toHaveCount(5)
})
```

## Authentication Helper

```typescript
// tests/fixtures/auth.ts
import { Page } from '@playwright/test'

export async function login(page: Page, email: string, password: string) {
  await page.goto('/login')
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button:has-text("Sign In")')
  await page.waitForURL('/dashboard')
}

// Usage in tests
test.beforeEach(async ({ page }) => {
  await login(page, 'test@example.com', 'password123')
})
```

## Screenshot Comparison

```typescript
test('should match visual snapshot', async ({ page }) => {
  await page.goto('/dashboard')
  await page.waitForLoadState('networkidle')

  await expect(page).toHaveScreenshot('dashboard.png', {
    maxDiffPixels: 100,
  })
})
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/e2e/assets.spec.ts

# Run with UI
npx playwright test --ui

# Run headed (see browser)
npx playwright test --headed

# Generate report
npx playwright show-report
```

## Test Data IDs

Add `data-testid` attributes for reliable selection:

```tsx
// In component
<button data-testid="create-stream-btn">Create Stream</button>
<input data-testid="stream-title-input" />
<div data-testid="stream-card">...</div>

// In test
await page.click('[data-testid="create-stream-btn"]')
await page.fill('[data-testid="stream-title-input"]', 'My Stream')
```

## Checklist

Before writing test:
- [ ] Use descriptive test names
- [ ] Add proper waits (waitForLoadState, waitForSelector)
- [ ] Clean up test data after tests
- [ ] Use data-testid for reliable selectors
- [ ] Handle async operations properly
- [ ] Add screenshots for visual regression
- [ ] Test both success and error cases
