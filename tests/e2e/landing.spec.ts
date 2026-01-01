import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display hero section', async ({ page }) => {
    // Check main heading
    await expect(page.locator('h1')).toBeVisible()

    // Check CTA button exists (first one)
    await expect(page.getByRole('link', { name: 'Start Free', exact: true })).toBeVisible()
  })

  test('should navigate to login page', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click()
    await expect(page).toHaveURL('/login')
  })

  test('should navigate to signup page', async ({ page }) => {
    await page.getByRole('link', { name: 'Start Free', exact: true }).click()
    await expect(page).toHaveURL('/signup')
  })

  test('should have page sections', async ({ page }) => {
    // Check page has multiple sections
    await expect(page.locator('section, .section').first()).toBeVisible()
  })
})
