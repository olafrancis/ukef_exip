import { ROUTES } from '../../../../../constants';

context('Manually going to the `Exporter location` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.EXPORTER_LOCATION);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});

context('Manually going to the `Change Company based` page via URL without completing the previous forms', () => {
  beforeEach(() => {
    cy.navigateToUrl(ROUTES.QUOTE.EXPORTER_LOCATION_CHANGE);
  });

  it('should redirect to the `need to start again` exit page', () => {
    cy.url().should('include', ROUTES.QUOTE.NEED_TO_START_AGAIN);
  });
});
