import LoginPage from '../pageobjects/loginPage'
import ProductsPage from '../pageobjects/productsPage'

const validPassword = 'secret_sauce'

describe('Login functionality', () => {
  beforeAll('Open Browser URL', () => {
    browser.setWindowSize(1920, 1080)
    browser.url('https://www.saucedemo.com/')
  })

  beforeEach(async () => {
    await expect(LoginPage.usernameInput).toBeDisplayed()
    await expect(LoginPage.passwordInput).toBeDisplayed()
  })

  it('should give an alert username required', async () => {
    await LoginPage.login('', '')
    await expect(LoginPage.errorMessage).toBeDisplayed()
    await expect(LoginPage.errorMessage).toHaveTextContaining('Epic sadface: Username is required')
  })

  it('should give an alert username incorrect', async () => {
    await LoginPage.login('juliantest', validPassword)

    await expect(LoginPage.errorMessage).toBeDisplayed()
    await expect(LoginPage.errorMessage).toHaveTextContaining(
      'Epic sadface: Username and password do not match any user in this service'
    )
  })

  it('should give an alert username locked', async () => {
    await LoginPage.login('locked_out_user', validPassword)
    await expect(LoginPage.errorMessage).toBeDisplayed()
    await expect(LoginPage.errorMessage).toHaveTextContaining('Epic sadface: Sorry, this user has been locked out.')
  })
})
