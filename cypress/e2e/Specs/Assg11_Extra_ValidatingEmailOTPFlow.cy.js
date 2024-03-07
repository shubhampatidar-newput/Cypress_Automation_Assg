/// <reference types="Cypress" />
import SalesforcePage from "../Pages/SalesforcePage"

describe('Get OTP from Email and validate login to Salesforce using the OTP', () => {
  const salesforcePageObj = new SalesforcePage()
  var salesforceData
  before('beforeAll', () => {
    cy.fixture('salesforce.json').then((data) => {
      salesforceData = data
    })
  })

  it('Extract OTP from email and validate login end to end flow', () => {
    cy.viewport(1500, 1000)
    cy.forceVisit(salesforceData.url);
    salesforcePageObj.emailAndOtpTextField().type(salesforceData.toEmail)
    salesforcePageObj.nextButtonOnEnterEmailPage().click()
    //Waiting for latest OTP to be received on mail
    cy.wait(5000)
    cy.task("gmail:check", {
      from: salesforceData.fromEmail,
      to: salesforceData.toEmail,
      subject: salesforceData.subject,
    }).then((email) => {
      let otp = email[0].body.text
      let getOTP = (otp) => {
        let match = otp.match(/\b\d{6}\b/)
        return match && match[0]
      }
      cy.log(getOTP(otp))
      salesforcePageObj.emailAndOtpTextField().type(getOTP(otp))
      salesforcePageObj.submitButton().click({force: true})
    })
  })

})