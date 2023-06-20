class ProductsPage {
  get productsList() {
    return $$('.inventory_item')
  }

  get firstProductTitle() {
    return $('div.inventory_list >div .inventory_item_name')
  }

  get firstProductPrice() {
    return $('div.inventory_list >div .inventory_item_description > div.pricebar > div.inventory_item_price')
  }

  get productsFilter() {
    return $('.product_sort_container')
  }

  get lowToHighOption() {
    return $('.product_sort_container > [value="lohi"]')
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

  async lowToHighFiltering() {
    await this.productsFilter.click()
    await this.lowToHighOption.click()
  }

  async logout() {
    await this.hamburgerMenu.click()
    await this.logoutBtn.click()
  }
}

export default new ProductsPage()
