class CartPage {
  get productTitle() {
    return $('div.cart_item >div .inventory_item_name')
  }

  get checkoutBtn() {
    return $('#checkout')
  }
}

export default new CartPage()
