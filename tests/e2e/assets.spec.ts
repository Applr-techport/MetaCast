import { test, expect } from '@playwright/test'

test.describe('Assets Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/assets')
    await page.waitForLoadState('networkidle')
  })

  test('should display assets page content', async ({ page }) => {
    // Check page loaded with content
    await expect(page.locator('body')).toBeVisible()
    await expect(page.locator('text=Assets').first()).toBeVisible()
  })

  test('should display upload button', async ({ page }) => {
    await expect(page.locator('button:has-text("Upload")').first()).toBeVisible()
  })

  test('should open upload modal', async ({ page }) => {
    await page.locator('button:has-text("Upload")').first().click()
    // Wait for modal animation
    await page.waitForTimeout(300)
    // Check modal is visible
    await expect(page.locator('[role="dialog"], .fixed').first()).toBeVisible()
  })

  test('should display asset grid or list', async ({ page }) => {
    // Check that content area exists
    await expect(page.locator('main, .grid, .flex').first()).toBeVisible()
  })
})
