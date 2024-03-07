/// <reference types="Cypress" />
import CommonApis from "../Pages/APIPage"

describe('Validate by Intercepting API response', () => {
  const CommonApisPageObj = new CommonApis()
  var loginData
  before('beforeAll', () => {
    cy.fixture('login_cred.json').then((data) => {
      loginData = data
    })
  })

  it('Validate by Intercepting API response', () => {
    cy.visit(loginData.api)
    cy.intercept('GET', loginData.api + '/api/users/2', {
      //Changing Status code and response of API
      statusCode: 201,
      body: {
        name: 'Peter Pan',
      },
    }).as('changeStatus') //creating Alias
    CommonApisPageObj.getSpecificUserDetailsAPIButton().click()
    cy.get('@changeStatus').then((res) => {
      cy.log(res)
      //Asserting Stubbed Response and Status
      expect(res.response.body.name).to.eq('Peter Pan')
      expect(res.response.statusCode).to.eq(201)
    })
  })
})