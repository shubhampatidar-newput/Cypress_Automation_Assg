class SauceDemo{
    inventoryItemNameElement = '.inventory_item_name'
    cartQuantity = '.cart_quantity'
    addToCartButton = 'button'

    appLogo(){
        return cy.get('.app_logo')
    }
    inventoryItem(){
        return cy.get('.inventory_list > .inventory_item')
    }
    shoppingCartBadge(){
        return cy.get('.shopping_cart_badge')
    }
    shoppingCart(){
        return cy.get('.shopping_cart_link')
    }
    itemsInCart(){
        return cy.get('.cart_item')
    }
    clickOnCheckoutButton(){
        cy.get('#checkout').click()
    }
    validateCheckoutPageTitle(){
        cy.get('.title').should('have.text', 'Checkout: Your Information')
    }
    enterFirstName(firstName){
        cy.get('#first-name').type(firstName)
    }
    enterLastName(lastName){
        cy.get('#last-name').type(lastName)
    }
    enterPinCode(pinCode){
        cy.get('#postal-code').type(pinCode)
    }
    continueButtonOnCheckout(){
        return cy.get('#continue')
    }
    finishButton(){
        return cy.get('#finish')
    }
    successMessage(){
        return cy.get('.complete-header')
    }
    clickOnAddToCart(item){
        cy.get('.inventory_item').contains(item).parent().parent().find('button').click()
    }
}
export default SauceDemo