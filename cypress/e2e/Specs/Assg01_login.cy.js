/// <reference types="Cypress" />
describe('Login for the first time via cypress', () => {

    it('Login for the first time without assertion', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get("#user-name").type('standard_user')
    cy.get("#password").type('secret_sauce')
    cy.get("#login-button").click()
  })
})