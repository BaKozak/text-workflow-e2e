import { loginData } from "../fixtures/credential-details";

describe('login to text', () => {
    beforeEach('', () => {
        cy.visit("https://platform.text.com/");
    });

    it('should successfully visit developers platform entry page', () => {
        cy.intercept('GET', 'https://accounts.livechat.com/v2/products').as('loginPage');
        cy.url().should('eq', 'https://platform.text.com/');
        cy.contains("Start building").click();
        cy.wait('@loginPage');
    });
});