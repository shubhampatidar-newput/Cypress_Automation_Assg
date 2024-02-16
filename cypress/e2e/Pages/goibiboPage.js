class goibibo{

    MainPage(){
        return cy.get('[class="desktop"]')
    }
    closeLoginSignupPopup(){
        cy.get('.logSprite.icClose').click()
    }
    selectHotelTab(){
        cy.get('[data-id="dweb-header-root"] [href="/hotels/"]').click()
    }
    //method to select India Radio Button
    selectIndiaRadioButton(){
        cy.get('[data-testid="search-radio-button-wrap"] input').check()
    }
    citySearchField(){
        return cy.get('[data-testid="home-autosuggest-input"]')
    }
    allDropDownListedOptions(){
        return cy.get('[id="downshift-1-menu"] li span')
    }
    hotelSearchButton(){
        return cy.get('[data-testid="searchHotelBtn"]')
    }
}

export default goibibo