class DetailsPage {
  get productTitle() {
    return $(
      '#inventory_item_container > div > div > div.inventory_details_desc_container > div.inventory_details_name.large_size'
    )
  }

  get cartBadge() {
    return $('.shopping_cart_badge')
  }

  get addToCartBtn() {
    return $('.inventory_details_desc_container > button')
  }
}

export default new DetailsPage()
