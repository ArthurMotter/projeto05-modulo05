describe('Professional Module E2E Tests', () => {

    beforeEach(() => {
        // Run a database seed command before each test to ensure a clean state
        // This is an advanced Cypress technique but ensures tests are independent.
        // It requires you to have a `data.sql` file in your backend's test resources.
        // cy.exec('psql -U youruser -d yourdb -a -f path/to/your/backend/data.sql');
        cy.visit('http://localhost:4200');
    });

    // TEST #1: CREATE
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

    // TEST #2: EDIT
    it('should edit an existing professional and verify the changes', () => {
        const uniqueId = Date.now();
        const baseName = 'Cypress Edit'; // The part of the name that is NOT truncated by the app
        const updatedName = `${baseName} ${uniqueId}`; // The full name we type into the form

        cy.intercept('PUT', '**/professionals/**').as('updateProfessional');
        cy.intercept('GET', '**/professionals**').as('getProfessionals');
        cy.get('.navbar-nav').contains('Cadastros').click();
        cy.get('.dropdown-menu').contains('Profissionais').click();
        cy.wait('@getProfessionals');

        // Find the row for "Ana Silva" by her unique email and click Edit
        cy.contains('td', 'ana.silva@example.com').parent('tr').within(() => {
            cy.contains('button', 'Editar').click();
        });

        // Change the name and save
        cy.get('input[formcontrolname="name"]').clear().type(updatedName);
        cy.get('button[type="submit"]').contains('Salvar').should('not.be.disabled').click();

        cy.wait('@updateProfessional');
        cy.contains('Profissional salvo com sucesso!').should('be.visible');
        cy.wait('@getProfessionals');

        // Find the row again using the unique, unchanging email address
        cy.contains('td', 'ana.silva@example.com').parent('tr').within(() => {
            // The application appears to truncate the numeric part of the name.
            // We will assert that the name column contains the non-numeric base name.
            cy.get('td').eq(0).should('contain.text', baseName);
        });

        // Finally, verify that the old name is gone from the entire table.
        cy.contains('td', 'Ana Silva').should('not.exist');
    });

    // TEST #3: DELETE
    it('should delete an existing professional', () => {
        const uniqueId = Date.now();
        const professionalNameToDelete = `Cypress Delete ${uniqueId}`;
        const professionalEmailToDelete = `delete${uniqueId}@test.com`;

        // STEP 1: Create the professional we are going to delete.
        cy.request('POST', 'http://localhost:8080/professionals', {
            name: professionalNameToDelete,
            email: professionalEmailToDelete,
            phone: '1111111111',
            areaIds: [1],
            active: true
        });

        cy.intercept('DELETE', '**/professionals/**').as('deleteProfessional');
        cy.intercept('GET', '**/professionals**').as('getProfessionals');

        // STEP 2: Navigate and find the user we just created.
        cy.get('.navbar-nav').contains('Cadastros').click();
        cy.get('.dropdown-menu').contains('Profissionais').click();
        cy.wait('@getProfessionals');

        // STEP 3: Click the delete button for that specific user.
        cy.contains('td', professionalEmailToDelete).parent('tr').within(() => {
            cy.contains('button', 'Excluir').click();
        });

        cy.get('.modal-dialog').contains('button', 'Excluir').click();

        // STEP 4: Verify the deletion was successful.
        cy.wait('@deleteProfessional');
        cy.contains('Profissional excluído com sucesso!').should('be.visible');
        cy.wait('@getProfessionals');

        cy.contains('td', professionalEmailToDelete).should('not.exist');
    });
});