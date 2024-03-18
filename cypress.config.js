const { defineConfig } = require("cypress");
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const path = require("path");
const gmail = require("gmail-tester");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  projectId: "cs82jg",
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
        appendToCsv(data) {
          csvdata.write('cypress/downloads/OnlyNames.csv', data, { append: true, header: 'stats,numusers' })
          return null
        }
      })

      on("task", {
        "gmail:check": async (args) => {
          const { from, to, subject } = args;
          const email = await gmail.check_inbox(
            path.resolve("node_modules/gmail-tester/", "OAuth.json"),
            path.resolve("cypress/", "AccessToken.json"),
            {
              subject: subject,
              from: from,
              to: to,
              include_body: true,
              wait_time_sec: 10,
              max_wait_time_sec: 30,
            }
          );
          return email;
        },
      })

      on('file:preprocessor', cucumber())

    },
    chromeWebSecurity: false,
    testIsolation: false,
    specPattern: 'cypress/e2e/**/*.{cy.{js,jsx,ts,tsx},feature}'
  },
});
