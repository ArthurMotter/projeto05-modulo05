describe('Professional Module E2E Tests', () => {

    beforeEach(() => {
        cy.visit('http://localhost:4200');
    });

    it('should navigate to the professionals page, create a new professional, and verify it in the list', () => {
        const uniqueId = Date.now();
        const professionalName = `Cypress Prof ${uniqueId}`; 
        const professionalEmail = `cypress${uniqueId}@test.com`;

        // Intercept network calls for a robust test
        cy.intercept('POST', '**/professionals').as('createProfessional');
        cy.intercept('GET', '**/professionals?page=0**').as('getProfessionals');

        // 1. Navigation and opening the modal
        cy.get('.navbar-nav').contains('Cadastros').click();
        cy.get('.dropdown-menu').contains('Profissionais').click();
        cy.url().should('include', '/cadastros/profissionais');
        cy.contains('Novo Profissional').click();

        // 2. Fill Form
        cy.get('input[formcontrolname="name"]').type(professionalName);
        cy.get('input[formcontrolname="email"]').type(professionalEmail);
        cy.get('input[formcontrolname="phone"]').type('99999888888');

        cy.get('select[formcontrolname="areaIds"]').find('option').contains('Cabelo').should('exist');
        cy.get('select[formcontrolname="areaIds"]').select('Cabelo');

        // 3. Submit Form
        cy.get('button[type="submit"]').contains('Salvar').should('not.be.disabled').click();

        // 4. Wait for network calls to complete
        cy.wait('@createProfessional').its('response.statusCode').should('eq', 201);
        cy.contains('Profissional salvo com sucesso!').should('be.visible');
        cy.wait('@getProfessionals');

        // Find the table cell (td) that contains our unique email address first.
        cy.get('td:visible').contains(professionalEmail)
            .parent('tr') // Go up to the parent table row
            .within(() => { // Limit all further commands to THIS specific row
                
                // Now verify the other columns within this row.
                cy.get('td').contains('Cypress Prof').should('be.visible');

                // Verify the other data points are also correct in this row.
                cy.contains('Cabelo').should('be.visible');
                cy.get('.badge.bg-success').should('be.visible');
            });
    });
});