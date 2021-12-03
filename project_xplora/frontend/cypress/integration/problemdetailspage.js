describe("renders the Create Problem page", ()=> {
    it("Shows problem details", () => {
        cy.visit("/#Login")
        cy.get('#l_container > form > :nth-child(1) > .form-control').type('user_for_tests');
        cy.get('#l_container > form > :nth-child(2) > .form-control').type('user-007');
        cy.get('#l_container > form > .btn').click();

        cy.get('#problem').click();
        cy.get('.Content > :nth-child(3)').should("exist");
        cy.get('.Content > :nth-child(4)').should("exist");
        cy.get('.Content > :nth-child(7)').should("exist");
        cy.get('.box').should("exist");
    })
    it("Shows problem stage", () => {
        cy.get('#solution').click();
        cy.get(':nth-child(1) > .Stage').click();
    })
    it("Shows stages guidance page", () => {
        cy.get('#support').click();
        cy.get('#supportgif').should("exist");
        cy.get('#green').should("exist");
        cy.get('#red').should("exist");
        cy.get('#yellow').should("exist");
    })
    it("Able to log out", () => {
        cy.get(':nth-child(4) > button').should("exist");
        cy.get(':nth-child(4) > button').click();
    })
})