class ProductsPage {
  get productsTitle() {
    return $('.title')
  }

  get hamburgerMenu() {
    return $('#menu_button_container > div > div:nth-child(1) > div')
  }

  get logoutBtn() {
    return $('#logout_sidebar_link')
  }

  async logout() {
    await this.hamburgerMenu.click()
    await this.logoutBtn.click()
  }
}

export default new ProductsPage()
