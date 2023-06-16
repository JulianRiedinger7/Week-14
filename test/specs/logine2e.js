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

  it('should login within a specified duration', async () => {
    const startTime = new Date().getTime()

    await LoginPage.login('performance_glitch_user', validPassword)

    const endTime = new Date().getTime()
    const duration = endTime - startTime

    const maxDuration = 4000

    expect(duration).toBeLessThan(maxDuration, `Login took longer than ${maxDuration} miliseconds`)
    await ProductsPage.logout()
  })

  it('should login correctly and logout', async () => {
    await LoginPage.login('standard_user', validPassword)
    await expect(ProductsPage.productsTitle).toBeDisplayed()
    await expect(ProductsPage.hamburgerMenu).toBeDisplayed()

    await expect(ProductsPage.productsTitle).toHaveTextContaining('Products')
    await ProductsPage.logout()
    await expect(LoginPage.usernameInput).toBeDisplayed()
    // luego chequear de hacer primero todos los casos negativos, y por ultimo este caso positivo.
    // y que este caso positivo no se desloguee, sino que en otro describe aprovechemos que esta logueado para poder hacer una compra
  })
})
