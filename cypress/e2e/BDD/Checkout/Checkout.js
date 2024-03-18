import { Given, And, When, Then } from 'cypress-cucumber-preprocessor/steps'
import sauceDemoPage from '../../Pages/SauceDemoPage'

var loginData
const sauceDemoPageObj = new sauceDemoPage()
before('beforeAll', () => {
    cy.fixture('login_cred.json').then((data) => {
        loginData = data
    })
})
//Test Steps

Given('I open the Login Page on SauceDemo', () => {
    cy.visit(loginData.url)
})

When('I enter Valid Credentials and login', () => {
    cy.login(loginData.emailId, loginData.pwd)
})

And('Select and Item and click on Add to Cart', () => {
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
        }
    })
})

And('Enter user details and click on checkout', () => {
    sauceDemoPageObj.enterFirstName(loginData.firstName)
    sauceDemoPageObj.enterLastName(loginData.lastName)
    sauceDemoPageObj.enterPinCode(loginData.pinCode)
    sauceDemoPageObj.continueButtonOnCheckout().click()
    sauceDemoPageObj.finishButton().click()

})

Then('Item should be checkout successfully', () => {
    sauceDemoPageObj.successMessage().should('have.text', 'Thank you for your order!')
})