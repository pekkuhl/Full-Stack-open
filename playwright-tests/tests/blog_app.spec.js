const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'testi ukko',
        username: 'testiukko',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameInput = page.getByLabel('username')
    const passwordInput = page.getByLabel('password')
    const loginBtn = page.getByText('login')

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginBtn).toBeVisible()
    
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testiukko')
      await page.getByLabel('password').fill('salainen')
      await page.getByText('login').click()

      await expect(page.getByText('logged in as testi ukko')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill('testi')
      await page.getByLabel('password').fill('sala')
      await page.getByText('login').click()

      await expect(page.getByLabel('username')).toBeVisible()
      await expect(page.getByLabel('password')).toBeVisible()
      await expect(page.getByText('login')).toBeVisible()
    })
  })
})
