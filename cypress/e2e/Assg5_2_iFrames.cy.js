/// <reference types="Cypress" />
describe('Validate by typing text inside iFrames', () => {

  it('Validate iFrame, type text inside the iframe field', () => {
    cy.visit('https://demo.automationtesting.in/Frames.html')
    cy.get('iframe#singleframe').its('0.contentDocument.body').then(($el) => {
      const iFrame = cy.wrap($el)
      iFrame.should('be.visible')
      iFrame.find('[type="text"]').type('Shubham Patidar')
    })
  })

  it('Validate Nested iFrame and type text inside Nested iFrame', () => {
    cy.visit('https://demo.automationtesting.in/Frames.html')
    cy.get('[href="#Multiple"]').click()
    cy.get('iframe[src="MultipleFrames.html"]').its('0.contentDocument.body').then(($el) => {
      const iFrame = cy.wrap($el)
      iFrame.find('[src="SingleFrame.html"]').its('0.contentDocument.body').then(($el) => {
        const nestediFrame = cy.wrap($el)
        nestediFrame.should('be.visible')
        nestediFrame.find('[type="text"]').type('Shubham Patidar')
      })
    })
  })

})