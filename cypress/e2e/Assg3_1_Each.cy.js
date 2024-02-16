describe('Use of EACH', () => {
  it('Use of Each and print Price and Name of each Product', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get("#user-name").type('standard_user')
    cy.get("#password").type('secret_sauce')
    cy.get("#login-button").click()
    cy.title().should("equal", "Swag Labs")
    cy.get('.inventory_list > .inventory_item').each($el => {
      const name = $el.find(".inventory_item_name").text()
      const price = $el.find(".inventory_item_price").text()
      //Printing name and price of all products
      cy.log("Product - " + name + " :: Price - " + price)
    })
    cy.get('.inventory_list > .inventory_item:nth-child(1)').find('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
    cy.get('.inventory_list > .inventory_item:nth-child(1)').find('.inventory_item_desc').should('have.text', 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.')
    cy.get('.inventory_list > .inventory_item:nth-child(1)').find('.inventory_item_price').should('have.text', '$29.99')
  })
})