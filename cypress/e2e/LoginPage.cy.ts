import { loginData } from "../fixtures/credential-details";

describe('login to text', () => {
    before('login to developers platform', () => {
        cy.intercept("GET", 'https://accounts.livechat.com/v2/products').as('registerSite');
        cy.intercept('GET', '**/accounts/me**').as('myAccountDetails');

        cy.visit("https://accounts.livechat.com/");
        cy.wait('@registerSite');

        cy.get('[data-testid="sign-in-form-wrapper"] form').children().then(item => {
            cy.wrap(item).find('input').first().type(loginData.credentialDetails.USERNAME);
            cy.wrap(item).find('input').last().type(loginData.credentialDetails.PASSWORD);
        });
        cy.get('[data-testid="login-form-button"]').click();
        cy.wait('@myAccountDetails').its('response').then((response) =>{
            expect(response.statusCode).to.eq(200);
            
        });
    });

    beforeEach('', () => {
        cy.visit("https://platform.text.com/console");
    });

    it('should successfully visit developers platform entry page', () => {

    });
});