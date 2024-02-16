/// <reference types="Cypress" />
import sauceDemoPage from './Pages/SauceDemoPage.js'

describe('Modify script using Page Object', () => {
    const sauceDemoPageObj = new sauceDemoPage()
    var loginData
    before('beforeAll', () => {
        cy.fixture('login_cred.json').then((data) => {
            loginData = data
        })
    })

    it('Use of Page Object in Checkout flow', () => {
        cy.visit(loginData.url)
        cy.login(loginData.emailId , loginData.pwd)
        sauceDemoPageObj.inventoryItem().each($el => {
            const itemName = $el.find(sauceDemoPageObj.inventoryItemNameElement).text()
            if (itemName == 'Sauce Labs Backpack') {
                const ItemsAddToCartButton = cy.wrap($el.find(sauceDemoPageObj.addToCartButton))
                ItemsAddToCartButton.click()
                sauceDemoPageObj.shoppingCartBadge().should('be.visible')
                sauceDemoPageObj.shoppingCartBadge().should('have.text', '1')
                sauceDemoPageObj.shoppingCart().click()
                sauceDemoPageObj.itemsInCart().find(sauceDemoPageObj.cartQuantity).should('have.text', '1')
                sauceDemoPageObj.itemsInCart().find(sauceDemoPageObj.inventoryItemNameElement).should('have.text', itemName)
                sauceDemoPageObj.clickOnCheckoutButton()
                sauceDemoPageObj.validateCheckoutPageTitle()
                sauceDemoPageObj.enterFirstName(loginData.firstName)
                sauceDemoPageObj.enterLastName(loginData.lastName)
                sauceDemoPageObj.enterPinCode(loginData.pinCode)
                sauceDemoPageObj.continueButtonOnCheckout().click()
                sauceDemoPageObj.finishButton().click()
                sauceDemoPageObj.successMessage().should('have.text', 'Thank you for your order!')
            }
        })
    })
})