import { test, expect } from '@playwright/test'

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForLoadState('networkidle')
  })

  test('should display dashboard page', async ({ page }) => {
    // Check for dashboard stats cards or content instead of h1
    await expect(page.locator('text=Total Views').first()).toBeVisible()
  })

  test('should display sidebar navigation', async ({ page }) => {
    // Check main nav items exist in sidebar
    const sidebar = page.locator('aside, nav').first()
    await expect(sidebar.locator('text=Dashboard').first()).toBeVisible()
    await expect(sidebar.locator('text=Assets').first()).toBeVisible()
  })

  test('should navigate to assets page', async ({ page }) => {
    await page.locator('aside a:has-text("Assets"), nav a:has-text("Assets")').first().click()
    await expect(page).toHaveURL('/assets')
  })

  test('should navigate to AI Studio', async ({ page }) => {
    await page.locator('aside, nav').first().locator('text=AI Studio').first().click()
    await expect(page).toHaveURL('/ai-studio')
  })
})
