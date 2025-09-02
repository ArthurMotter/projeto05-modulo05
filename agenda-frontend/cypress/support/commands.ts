/// <reference types="cypress" />

Cypress.Commands.add('getComponent', (selector) => {
  return cy.get(selector).then($el => {
    const win = $el[0].ownerDocument.defaultView;
    // This is a type assertion to tell TypeScript that `ng` exists on the window
    const ng = (win as any).ng; 
    const el = $el[0];

    const component = ng.getComponent(el);
    if (!component) {
      throw new Error(`Could not find a component for selector: ${selector}`);
    }
    return component;
  });
});

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to get an Angular component instance from a DOM element.
       * @example cy.getComponent('app-my-component')
       */
      getComponent(selector: string): Chainable<any>;
    }
  }
}

// THIS IS THE FIX: This line makes TypeScript treat this file as a module.
export {};