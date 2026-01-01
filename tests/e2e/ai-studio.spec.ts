import { test, expect } from '@playwright/test'

test.describe('AI Studio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai-studio')
    await page.waitForLoadState('networkidle')
  })

  test('should display AI Studio page', async ({ page }) => {
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should display video generator section', async ({ page }) => {
    await expect(page.locator('text=Video Generator').first()).toBeVisible()
  })

  test('should display AI tools section', async ({ page }) => {
    await expect(page.locator('h3:has-text("AI Tools")').first()).toBeVisible()
  })

  test('should navigate to video generator', async ({ page }) => {
    // Click "Get Started" on AI Video Generator card
    const videoGeneratorCard = page.locator('text=AI Video Generator').locator('..')
    await videoGeneratorCard.locator('text=Get Started').click()
    await expect(page).toHaveURL(/video-generator/)
  })
})

test.describe('Shortform Creator', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai-studio/video-generator/shortform')
    await page.waitForLoadState('networkidle')
  })

  test('should display shortform creator page', async ({ page }) => {
    await expect(page.locator('h1').first()).toBeVisible()
  })

  test('should have prompt input', async ({ page }) => {
    await expect(page.locator('textarea, input[type="text"]').first()).toBeVisible()
  })

  test('should have generate button', async ({ page }) => {
    await expect(page.locator('button:has-text("Generate")').first()).toBeVisible()
  })
})
