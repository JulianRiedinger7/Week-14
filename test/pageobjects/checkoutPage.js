class CheckoutPage {
  get firstNameInput() {
    return $('#first-name')
  }

  get lastNameInput() {
    return $('#last-name')
  }

  get postalCodeInput() {
    return $('#postal-code')
  }

  get continueBtn() {
    return $('#continue')
  }

  get totalPrice() {
    return $('#checkout_summary_container > div > div.summary_info > div.summary_info_label.summary_total_label')
  }

  get finishBtn() {
    return $('#finish')
  }

  get backHomeBtn() {
    return $('#back-to-products')
  }

  get errorMessage() {
    return $('div.error-message-container.error > h3')
  }

  async checkout(firstName, lastName, postalCode) {
    await this.firstNameInput.setValue(firstName)
    await this.lastNameInput.setValue(lastName)
    await this.postalCodeInput.setValue(postalCode)
    await this.continueBtn.click()
  }
}

export default new CheckoutPage()
