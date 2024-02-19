/// <reference types="Cypress" />
const neatCsv = require('neat-csv');
import CsvExcelPage from './Pages/CsvExcelPage';

describe('Read Write CSV file', () => {
    const CsvExcelPageObj = new CsvExcelPage()
    const expectedName = 'Dett'
    const csvFile = 'cypress/downloads/Free_Test_Data_200KB_CSV-1.csv'
    const excelFile = 'cypress/downloads/Free_Test_Data_100KB_XLSX.xlsx'
    const namesCSV = 'cypress/downloads/OnlyNames.csv'
    var csvExcelData

    before('call data', () => {
        cy.fixture('csvExcelDataWebSite.json').then((data) => {
            csvExcelData = data
        })
        cy.writeFile(namesCSV, '')
    })

    it('Download CSV and validate 1st Name from the data using read CSV', () => {
        cy.visit(csvExcelData.csvUrl)
        CsvExcelPageObj.downloadCSVFileButton().click()
        cy.readFile(csvFile).then(async (text) => {
            const data = await neatCsv(text)
            console.log(data[0].NAME)
            expect(data[0].NAME).to.eq(expectedName)
        })
    })

    it('Download EXCEL and validate 1st Name from the data using read CSV', () => {
        cy.visit(csvExcelData.excelUrl)
        CsvExcelPageObj.downloadExcelFileButton().click()
        cy.task('convertExcelToJson', excelFile).then((text) => {
            console.log(text.Sheet1[1].B)
            expect(text.Sheet1[1].B).to.eq(expectedName)
        })
    })

    it('Use downloaded CSV and write only names to other CSV file', () => {
        cy.readFile(csvFile).then(async (text) => {
            const data = await neatCsv(text)
            cy.writeFile(namesCSV, data[0].NAME)
            cy.readFile(namesCSV).then((nameInFile) => {
                //Validating after writing the file weather data is added or not
                expect(nameInFile).to.eq(data[0].NAME)
            })
        })
    })

})