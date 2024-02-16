describe('Checkout flow', () => {

  it('Checkout flow with assertions at every page', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get("#user-name").type('standard_user')
    cy.get("#password").type('secret_sauce')
    cy.get("#login-button").click()
    cy.get('.inventory_list > .inventory_item').each($el => {
      const name = $el.find(".inventory_item_name").text()
      if (name == 'Sauce Labs Backpack') {
        const button = cy.wrap($el.find('button'))
        button.click()
        cy.get('.shopping_cart_badge').should('be.visible')
        cy.get('.shopping_cart_badge').should('have.text', '1')
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_item').find('.cart_quantity').should('have.text', '1')
        cy.get('.cart_item').find('.inventory_item_name').should('have.text', name)
        cy.get('#checkout').click()
        cy.get('.title').should('have.text', 'Checkout: Your Information')
        cy.get('#first-name').type('Shubham')
        cy.get('#last-name').type('Patidar')
        cy.get('#postal-code').type('452009')
        cy.get('#continue').click()
        cy.get('#finish').click()
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
      }
    })
  })
})