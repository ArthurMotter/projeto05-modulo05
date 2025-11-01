import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // ADD THIS LINE:
    specPattern: "cypress/**/*.cy.{js,jsx,ts,tsx}",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});