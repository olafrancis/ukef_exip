import CONSTANTS from '../../../../constants';
const { ROUTES } = CONSTANTS;

context('Manually going to the `Check your answers` via URL page without completing the previous forms', () => {
  beforeEach(() => {
    cy.visit(ROUTES.CHECK_YOUR_ANSWERS, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.NEED_TO_START_AGAIN);
  });
});
