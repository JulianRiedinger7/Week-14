class CartPage {
  get productTitle() {
    return $('#item_4_title_link > div')
  }

  get checkoutBtn() {
    return $('#checkout')
  }
}

export default new CartPage()
