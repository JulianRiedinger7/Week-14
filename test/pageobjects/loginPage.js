class LoginPage {
  get usernameInput() {
    return $('#user-name')
  }

  get passwordInput() {
    return $('#password')
  }

  get loginBtn() {
    return $('#login-button')
  }

  async clickLoginBtn() {
    await this.loginBtn.click()
  }

  async login(username, password) {
    await this.usernameInput.setValue(username)
    await this.passwordInput.setValue(password)
  }
}

export default new LoginPage()
