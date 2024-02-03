import { test } from '@playwright/test'

test.describe('user journey', () => {
    test('test', async ({ page }) => {
        await page.goto('/app')
        await page.getByRole('link', { name: 'Second post' }).click()
        await page.getByRole('heading', { name: 'Second post' }).click()
        await page.getByRole('link', { name: 'Search' }).click()
        await page.getByPlaceholder('cats, dogs').click()
        await page.getByPlaceholder('cats, dogs').fill('second')
        await page.getByRole('link', { name: 'Second post' }).click()
        await page.getByRole('link', { name: 'Configuration' }).click()
    })
})