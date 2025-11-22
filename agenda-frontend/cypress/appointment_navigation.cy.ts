describe('Appointment Module E2E Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  // TEST #1: Appointment Page Navigation
  it('should navigate to the appointment page and verify key elements', () => {
    // 1. Navigate from Home to the Appointment page
    cy.get('.navbar-nav').contains('Agendamentos').click();
    cy.get('.dropdown-menu').contains('Agendar').click();

    // 2. Assert that we are on the correct page
    cy.url().should('include', '/agendamentos/agendar');

    // 3. Verify that key elements are visible on the page
    cy.contains('Fazer um agendamento:').should('be.visible');
    
    // verify a stable piece of text that proves the calendar component has loaded.
    cy.contains('Seg').should('be.visible'); // Checks for the "Monday" header
    
    cy.contains('Horários Disponíveis').should('be.visible');
  });
});