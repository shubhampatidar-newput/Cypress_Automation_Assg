class GeoDataSoucePage {

    countrySelectDropdown() {
        return cy.get('[country-data-region-id="gds-cr-one"]')
    }
    countryDropdownOptions() {
        return cy.get('[country-data-region-id="gds-cr-one"] option')
    }
}

export default GeoDataSoucePage