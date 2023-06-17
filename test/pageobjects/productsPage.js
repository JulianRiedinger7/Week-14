class ProductsPage {
  get productsList() {
    return $$('.inventory_item')
  }

  get firstProductTitle() {
    return $('#item_4_title_link > div')
  }

  get cartIcon() {
    return $('.shopping_cart_link')
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
