/// <reference types="Cypress" />
describe('Validate file upload', () => {

  it('Validate file attach using html', () => {
    cy.visit('https://the-internet.herokuapp.com/upload')
    cy.get('[id="file-upload"]').attachFile('filesToUpload/myData.csv');
    cy.get('#file-submit').click()
    cy.get('h3').should('have.text', 'File Uploaded!')
  })

  it('Validate file attach using drag and drop', () => {
    cy.visit('https://the-internet.herokuapp.com/upload')
    cy.get('#drag-drop-upload').attachFile('filesToUpload/myData.csv', { subjectType: 'drag-n-drop' });
    cy.get('#drag-drop-upload .dz-success-mark').should('be.visible')
  })

  it('Validate multiple file update with drag and drop', () => {
    cy.visit('https://the-internet.herokuapp.com/upload')
    cy.get('#drag-drop-upload').attachFile(['filesToUpload/myData.csv', 'filesToUpload/myData2.csv'], { subjectType: 'drag-n-drop' });
    debugger
    cy.get('#drag-drop-upload .dz-success-mark').each($el => {
      cy.wrap($el).should('be.visible')
    })
  })
  
})