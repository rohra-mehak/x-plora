describe("renders the homepage", ()=> {
    it("Shows logo", ()=> {
        cy.visit("/")
        cy.get("#logo").should("exist")
    })

    it("Shows homepage", ()=> {
        cy.visit("/")
        cy.get("#home").should("exist")
    })
    it("Opens #next and shows feature", ()=> {
        cy.visit("/#next")
        cy.get("#feature").should("exist")
    })
    it("Opens #Login and shows option to login", ()=> {
        cy.visit("/#Login")
        cy.get("#login").should("exist")
    })
    it("Opens #Contact and shows option to contact", ()=> {
        cy.visit("/#Contact")
        cy.get("#contact").should("exist")
    })
})