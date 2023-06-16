import LoginPage from '../pageobjects/loginPage'

describe('Login with correct credentials', () => {
  beforeAll('Open Browser URL', () => {
    browser.setWindowSize(1920, 1080)
    browser.url('https://www.saucedemo.com/')
  })

  it('should login correctly', async () => {
    const validPassword = 'secret_sauce'
    let validUser = 'standard_user'

    await expect(LoginPage.usernameInput).toBeDisplayed()
    await expect(LoginPage.passwordInput).toBeDisplayed()

    await LoginPage.login(validUser, validPassword)
  })
})
