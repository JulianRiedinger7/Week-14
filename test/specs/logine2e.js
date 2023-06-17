import LoginPage from '../pageobjects/loginPage'
import ProductsPage from '../pageobjects/productsPage'
import DetailsPage from '../pageobjects/detailsPage'

const validPassword = 'secret_sauce'
const canLoginUsernames = ['standard_user', 'problem_user', 'performance_glitch_user']

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

  canLoginUsernames.forEach((username) => {
    it(`should login with username ${username} within specified duration`, async () => {
      const startTime = new Date().getTime()
      await LoginPage.login(username, validPassword)
      const endTime = new Date().getTime()

      const duration = endTime - startTime
      const maxDuration = 4000

      await expect(ProductsPage.hamburgerMenu).toBeDisplayed()
      await expect(ProductsPage.productsList).toBeElementsArrayOfSize({ gte: 1 })
      expect(duration).toBeLessThan(maxDuration, `Login took longer than ${maxDuration} miliseconds`)
    })

    it(`${username} should add one item and see the cart badge`, async () => {
      await ProductsPage.firstProductTitle.click()

      await expect(DetailsPage.productTitle).toBeDisplayed()
      await expect(DetailsPage.productTitle.getText()).toEqual(ProductsPage.firstProductTitle.getText())
      await DetailsPage.addToCartBtn.click()
      await expect(DetailsPage.cartBadge).toHaveTextContaining('1')

      await ProductsPage.logout()
      await expect(LoginPage.usernameInput).toBeDisplayed()
    })
  })
})
