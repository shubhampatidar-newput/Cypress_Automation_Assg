/// <reference types="Cypress" />
describe('Mouse Hover via Trigger and invoke', () => {

    it('Check Mouse Hover using Invoke', () => {
        cy.visit('https://the-internet.herokuapp.com/hovers')
        cy.get(':nth-child(3) > .figcaption').invoke('show')
        cy.contains('View profile').click()
        cy.get('h1').should('have.text', 'Not Found')
    })

    it('Check Mouse Hover using Trigger', () => {
        cy.viewport(1500, 1000)
        cy.visit('https://www.spicejet.com/')
        cy.contains('Add-ons').trigger('mouseover')
        //Checking if the element is visible or not after hover
        cy.get('[data-testid="test-id-Zero Cancellation - International"]').should('be.visible')
    })

})