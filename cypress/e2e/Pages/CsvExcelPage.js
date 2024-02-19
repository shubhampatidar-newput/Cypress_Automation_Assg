class CsvExcelPage {

    downloadCSVFileButton() {
        return cy.get('[class="elementor-button-content-wrapper"]').eq(0)
    }
    downloadExcelFileButton() {
        return cy.get('[class="elementor-button-text"]').eq(0)
    }

}

export default CsvExcelPage