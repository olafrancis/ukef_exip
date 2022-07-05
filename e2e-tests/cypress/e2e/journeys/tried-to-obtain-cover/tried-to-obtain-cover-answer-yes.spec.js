import {
  triedToObtainCoverPage,
  cannotObtainCoverPage,
} from '../../pages';
import partials from '../../partials';
import { PAGES } from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.CANNOT_OBTAIN_COVER_PAGE;
const { FIELD_IDS, ROUTES } = CONSTANTS;

context('Tried to obtain private cover page - answer `yes`', () => {
  before(() => {
    cy.visit(ROUTES.TRIED_TO_OBTAIN_COVER, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.TRIED_TO_OBTAIN_COVER);

    triedToObtainCoverPage[FIELD_IDS.TRIED_PRIVATE_COVER].yes().click();
    triedToObtainCoverPage.submitButton().click();
  });

  it('redirects to exit page', () => {
    cy.url().should('include', ROUTES.CANNOT_OBTAIN_COVER);
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');

    partials.backLink().should('have.attr', 'href', ROUTES.TRIED_TO_OBTAIN_COVER);
  });

  it('renders a specific reason', () => {
    cannotObtainCoverPage.reason().invoke('text').then((text) => {
      const expected = `${CONTENT_STRINGS.REASON.INTRO} ${CONTENT_STRINGS.REASON.CAN_GET_PRIVATE_INSURANCE}`;

      expect(text.trim()).equal(expected);
    });
  });
});
