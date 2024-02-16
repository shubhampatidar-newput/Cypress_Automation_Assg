describe('Alias, Contains and Static Drop down', () => {

  it('Use of Alias, Contains and Static Dropdown selections', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get("#user-name").type('standard_user')
    cy.get("#password").type('secret_sauce')
    cy.get("#login-button").click()
    cy.get('.inventory_list > .inventory_item').each($el => {
      const name = $el.find(".inventory_item_name").text()
      if (name == 'Sauce Labs Backpack') {
        const button = cy.wrap($el.find('button'))
        button.click()
        //Use of Alias
        cy.get('.shopping_cart_badge').as('cartIcon')
        cy.get('@cartIcon').should('be.visible')
        cy.get('@cartIcon').should('have.text', '1')
        //Static Drop downs
        //Select drop down value using index
        cy.get('select').select(1)
        //Select drop down value using value
        cy.get('select').select('lohi')
        //select drop down value using text
        cy.get('select').select('Price (high to low)')
        cy.get('.shopping_cart_link').click()
        //Use of Alias
        cy.get('.cart_item').as('ItemInCart')
        cy.get('@ItemInCart').find('.cart_quantity').should('have.text', '1')
        cy.get('@ItemInCart').find('.inventory_item_name').should('have.text', name)
        cy.get('#checkout').click()
        cy.get('.title').should('have.text', 'Checkout: Your Information')
        cy.get('#first-name').type('Shubham')
        cy.get('#last-name').type('Patidar')
        cy.get('#postal-code').type('452009')
        //Use of Contains
        cy.get('.checkout_buttons').contains('Continue').click()
        //Use of Contains directly if there is single name
        cy.contains('Finish').click()
        // cy.get('#finish').click()
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
      }
    })
  })
})