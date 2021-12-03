describe("renders the Create Problem page", ()=> {
    it("Able to create a problem", ()=> {
        cy.visit("/#Login")
        cy.get('#l_container > form > :nth-child(1) > .form-control').type('user_for_tests');
        cy.get('#l_container > form > :nth-child(2) > .form-control').type('user-007');
        cy.get('#l_container > form > .btn').click();

        cy.get(':nth-child(1) > .eform-control').type('Problem\'s title');
        cy.get(':nth-child(2) > .eform-control').type('Description of the problem and dataset...');
        cy.get('.btn').click();
    })
})