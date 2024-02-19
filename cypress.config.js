const { defineConfig } = require("cypress");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        convertExcelToJson(filePath) {
          const result = excelToJson({
            source: fs.readFileSync(filePath)
          });
          return result
        },
      })

      on('task', {
        appendToCsv (data) {
          csvdata.write('cypress/downloads/OnlyNames.csv', data, {append: true, header: 'stats,numusers'})
          return null
      }
    })
      
    },
    chromeWebSecurity: false,
    testIsolation: false,
  },
});
