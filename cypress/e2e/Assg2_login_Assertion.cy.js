describe('Login and Assertion', () => {
  it('Login and add assertions for the first time', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get("#user-name").type('standard_user')
    cy.get("#password").type('secret_sauce')
    cy.get("#login-button").click()
    cy.title().should("equal", "Swag Labs")
  })
})