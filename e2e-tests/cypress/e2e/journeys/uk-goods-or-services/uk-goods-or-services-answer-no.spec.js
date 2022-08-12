import {
  ukGoodsOrServicesPage,
  cannotObtainCoverPage,
} from '../../pages';
import partials from '../../partials';
import {
  PAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_OBTAIN_COVER_PAGE;
const { ROUTES } = CONSTANTS;

context('UK goods or services page - as an exporter, I want to check if my export value is eligible for UKEF export insurance cover - submit `no - UK goods/services is below the minimum`', () => {
  beforeEach(() => {
    cy.visit(ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);

    ukGoodsOrServicesPage.no().click();
    ukGoodsOrServicesPage.submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.CANNOT_OBTAIN_COVER);
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);
  });

  it('renders a specific reason', () => {
    cannotObtainCoverPage.reason().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.NOT_ENOUGH_HAS_MINIMUM_UK_GOODS_OR_SERVICES}`;

      expect(text.trim()).equal(expected);
    });
  });
});
