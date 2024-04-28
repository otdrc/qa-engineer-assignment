// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/')
});

test.describe('Title and Content Verification', () => {
  test('Ensure the title of the page form titles are correctly displayed', async ({ page }) => {
    
    await expect(page.locator('//header').locator('//h1')).toHaveText('The awesome Q/A tool');
    await expect(page.locator('//div[@class = "questions"]').locator('//h2')).toHaveText('Created questions');
    await expect(page.locator('//div[@class = "question-maker"]').locator('//h2')).toHaveText('Create a new question');

  });
});
