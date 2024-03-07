/// <reference types="Cypress" />
import sauceDemoPage from '../Pages/SauceDemoPage.js'

describe('Use of forEach method', () => {
    const sauceDemoPageObj = new sauceDemoPage()
    var loginData
    before('beforeAll', () => {
        cy.fixture('login_cred.json').then((data) => {
            loginData = data
        })
    })

    it('Use of for Each Method of javascript', () => {
        const itemsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light' , 'Sauce Labs Onesie']
        cy.visit(loginData.url)
        cy.login(loginData.emailId , loginData.pwd)
        itemsToAdd.forEach(sauceDemoPageObj.clickOnAddToCart)
                sauceDemoPageObj.shoppingCartBadge().should('be.visible')
                sauceDemoPageObj.shoppingCartBadge().should('have.text', '3')
                sauceDemoPageObj.shoppingCart().click()
                sauceDemoPageObj.clickOnCheckoutButton()
                sauceDemoPageObj.validateCheckoutPageTitle()
                sauceDemoPageObj.enterFirstName(loginData.firstName)
                sauceDemoPageObj.enterLastName(loginData.lastName)
                sauceDemoPageObj.enterPinCode(loginData.pinCode)
                sauceDemoPageObj.continueButtonOnCheckout().click()
                sauceDemoPageObj.finishButton().click()
                sauceDemoPageObj.successMessage().should('have.text', 'Thank you for your order!')
    })
})