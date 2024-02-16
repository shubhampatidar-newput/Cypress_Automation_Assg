/// <reference types="Cypress" />
import goibiboPage from "./Pages/goibiboPage"

describe('Alert, Checkbox, Radio Button, Viewport and Autocomplete drop down', () => {
  const goibiboPageObj = new goibiboPage()

  it('Validate click on Alert', () => {
    cy.visit('https://demo.guru99.com/test/delete_customer.php')
    //it Automatically clicks on Accept or Submit
    cy.get('[type="submit"]').click()
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Do you really want to delete this Customer?')
      //this is to cancle the popup
      return false
    })
  })

  it('Validate Dropdown autocomplete and Radio button check', () => {
    cy.visit('https://www.goibibo.com/')
    goibiboPageObj.MainPage().then(($el) => {
      //to Check wether login or signup popup is shown, if yes, we need to close it
      if ($el.find('[data-id="dweb-modal"]').length) {
        goibiboPageObj.closeLoginSignupPopup()
        goibiboPageObj.selectHotelTab()
        //Checked Radio button here by calling method
        goibiboPageObj.selectIndiaRadioButton()
        goibiboPageObj.citySearchField().type('ind')
        goibiboPageObj.allDropDownListedOptions().each($el => {
          var cityName = $el.text()
          if (cityName === 'Goa, India') {
            cy.wrap($el).click()
            goibiboPageObj.citySearchField().should('have.value', 'Goa, India')
          }
        })
      }
      //If login signup popup is not shown
      else {
        goibiboPageObj.selectHotelTab()
        //Checked Radio button here by calling method
        goibiboPageObj.selectIndiaRadioButton()
        goibiboPageObj.citySearchField().type('ind')
        goibiboPageObj.allDropDownListedOptions().each($el => {
          var cityName = $el.text()
          if (cityName === 'Goa, India') {
            cy.wrap($el).click()
            goibiboPageObj.citySearchField().should('have.value', 'Goa, India')
          }
        })
      }
    })
  })

  it('Validate checkboxes and viewport method', () => {
    cy.viewport(400, 800)
    cy.visit('https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/')
    //checking and assertion at the same time
    cy.get('[id="cond1"]').check().should('be.checked')
  })


})