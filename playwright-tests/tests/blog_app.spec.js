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

  describe('When logged in', () => {
  beforeEach(async ({ page }) => {
    await page.getByLabel('username').fill('testiukko')
    await page.getByLabel('password').fill('salainen')
    await page.getByText('login').click()
  })

  test('a new blog can be created', async ({ page }) => {
    
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByLabel('title:').fill('testTitle')
    await page.getByLabel('author:').fill('testAuthor')
    await page.getByLabel('url:').fill('testUrl')
    await page.getByRole('button', { name: 'create' }).click()

    await expect(page.getByText('testTitle testAuthorview')).toBeVisible()
  })

  test('a new blog can be liked', async ({ page }) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByLabel('title:').fill('testTitle')
    await page.getByLabel('author:').fill('testAuthor')
    await page.getByLabel('url:').fill('testUrl')
    await page.getByRole('button', { name: 'create' }).click()
    
    await page.getByRole('button', { name: 'view' }).click()
    await page.getByRole('button', { name: 'like' }).click()


    await expect(page.getByText('likes 1')).toBeVisible()
  })

  test('a blog can be deleted by the user who made it', async ({ page }) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByLabel('title:').fill('removableTitle')
    await page.getByLabel('author:').fill('removableAuthor')
    await page.getByLabel('url:').fill('removableUrl')
    await page.getByRole('button', { name: 'create' }).click()

    await page.getByRole('button', { name: 'view' }).click()

    await page.getByText('remove').click()

    page.on('dialog', dialog => dialog.accept())

    await expect(page.getByLabel('title:')).not.toBeVisible()
  })

  test('user who hasnt made the blog cant see remove button', async ({ page, request }) => {
    await page.getByRole('button', { name: 'create new blog' }).click()
    await page.getByLabel('title:').fill('removableTitle')
    await page.getByLabel('author:').fill('removableAuthor')
    await page.getByLabel('url:').fill('removableUrl')
    await page.getByRole('button', { name: 'create' }).click()
    await page.getByRole('button', { name: 'logout' }).click()

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'anotherUser',
        username: 'another',
        password: 'secret'
      }
    })
    await page.getByLabel('username').fill('another')
    await page.getByLabel('password').fill('secret')
    await page.getByText('login').click()
    await page.getByRole('button', { name: 'view' }).click()
    await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
  })


})
})
