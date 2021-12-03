describe("renders the login/register page", ()=> {
    it("Able to register", ()=> {
        cy.visit("/#Login")
        cy.get('#r_container > form > :nth-child(1) > .form-control').type('user_for_tests'); // username
        cy.get('#r_container > form > :nth-child(2) > .form-control').type('User');  // First name
        cy.get('#r_container > form > :nth-child(3) > .form-control').type('Testing');  // Last name
        cy.get('#r_container > form > :nth-child(4) > .form-control').type('user@xplora.com');  // Email
        cy.get('#r_container > form > :nth-child(5) > .form-control').type('user-007');  // Password
        cy.get('#r_container > form > .btn').click();
    })
    it("Able to login", ()=> {
        cy.visit("/#Login")
        cy.get('#l_container > form > :nth-child(1) > .form-control').type('user_for_tests');
        cy.get('#l_container > form > :nth-child(2) > .form-control').type('user-007');
        cy.get('#l_container > form > .btn').click();
    })
})