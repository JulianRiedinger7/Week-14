import LoginPage from '../pageobjects/loginPage'
import ProductsPage from '../pageobjects/productsPage'
import DetailsPage from '../pageobjects/detailsPage'
import CartPage from '../pageobjects/cartPage'
import CheckoutPage from '../pageobjects/checkoutPage'

const validPassword = 'secret_sauce'
const canLoginUsernames = ['standard_user', 'performance_glitch_user', 'problem_user']

describe('Login errors functionality', () => {
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

describe('Specific usernames test', () => {
  canLoginUsernames.forEach((username) => {
    it(`${username} should login within specified duration`, async () => {
      await expect(LoginPage.usernameInput).toBeDisplayed()
      await expect(LoginPage.passwordInput).toBeDisplayed()

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
      const productTitleText = await ProductsPage.firstProductTitle.getText()
      await ProductsPage.firstProductTitle.click()

      await expect(DetailsPage.productTitle).toBeDisplayed()
      const detailsProductTitleText = await DetailsPage.productTitle.getText()
      await expect(detailsProductTitleText).toEqual(productTitleText)
      await DetailsPage.addToCartBtn.click()
      await expect(DetailsPage.cartBadge).toBeDisplayed()
      await expect(DetailsPage.cartBadge).toHaveTextContaining('1')
    })

    it(`${username} should see item in cart and proceed to checkout`, async () => {
      const detailsProductTitleText = await DetailsPage.productTitle.getText()
      await ProductsPage.cartIcon.click()

      await expect(CartPage.productTitle).toBeDisplayed()
      await expect(CartPage.checkoutBtn).toBeDisplayed()

      const cartProductTitleText = await CartPage.productTitle.getText()
      await expect(cartProductTitleText).toEqual(detailsProductTitleText)

      await CartPage.checkoutBtn.click()
      await expect(CheckoutPage.firstNameInput).toBeDisplayed()
    })

    it(`${username} should proceed to overview and finish purchase`, async () => {
      await expect(CheckoutPage.firstNameInput).toBeDisplayed()
      await expect(CheckoutPage.lastNameInput).toBeDisplayed()
      await expect(CheckoutPage.postalCodeInput).toBeDisplayed()

      await CheckoutPage.checkout('test', 'test', '8000')

      await expect(CheckoutPage.totalPrice).toBeDisplayed()
      await expect(CheckoutPage.finishBtn).toBeDisplayed()

      await CheckoutPage.finishBtn.click()
    })

    it(`${username} should back home and logout`, async () => {
      await expect(CheckoutPage.backHomeBtn).toBeDisplayed()

      await CheckoutPage.backHomeBtn.click()
      await expect(ProductsPage.productsList).toBeElementsArrayOfSize({ gte: 1 })

      await ProductsPage.logout()
      await expect(LoginPage.usernameInput).toBeDisplayed()
      await expect(LoginPage.passwordInput).toBeDisplayed()
    })
  })
})
