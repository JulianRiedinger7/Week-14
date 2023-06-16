class LoginPage {
  get usernameInput() {
    return $('#user-name')
  }

  get passwordInput() {
    return $('#password')
  }

  get errorMessage() {
    return $('div.error-message-container.error > h3')
  }

  get loginBtn() {
    return $('#login-button')
  }

  async login(username, password) {
    await this.usernameInput.setValue(username)
    await this.passwordInput.setValue(password)
    await this.loginBtn.click()
  }
}

export default new LoginPage()
