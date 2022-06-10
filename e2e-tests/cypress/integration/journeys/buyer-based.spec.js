import buyerBasedPage from '../pages/buyerBased';
import partials from '../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';

const CONTENT_STRINGS = PAGES.BUYER_BASED_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Buyer based outside of the UK, Channel Islands and Isle of Man page', () => {
  beforeEach(() => {
    cy.visit(ROUTES.BUYER_BASED, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
    cy.url().should('include', ROUTES.BUYER_BASED);
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 80,
      'best-practices': 100,
      seo: 75,
    });
  });

  it('renders a back button with correct link', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    cy.url().should('include', ROUTES.COMPANY_BASED);
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    buyerBasedPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  it('renders yes and no radio buttons', () => {
    const yesRadio = buyerBasedPage[FIELD_IDS.VALID_BUYER_BASE].yes();
    yesRadio.should('exist');

    yesRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('Yes');
    });

    const noRadio = buyerBasedPage[FIELD_IDS.VALID_BUYER_BASE].no();
    noRadio.should('exist');

    noRadio.invoke('text').then((text) => {
      expect(text.trim()).equal('No');
    });
  });

  it('renders a submit button', () => {
    const button = buyerBasedPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render validation errors', () => {
        buyerBasedPage.submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.VALID_BUYER_BASE];

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        buyerBasedPage[FIELD_IDS.VALID_BUYER_BASE].errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });
    });

    describe('when submitting the answer as `no`', () => {
      it(`should redirect to ${ROUTES.BUYER_BASED_UNAVAILABLE}`, () => {
        buyerBasedPage[FIELD_IDS.VALID_BUYER_BASE].no().click();
        buyerBasedPage.submitButton().click();

        cy.url().should('include', ROUTES.BUYER_BASED_UNAVAILABLE);
      });
    });

    describe('when submitting the answer as `yes`', () => {
      it(`should redirect to ${ROUTES.TRIED_TO_OBTAIN_COVER}`, () => {
        buyerBasedPage[FIELD_IDS.VALID_BUYER_BASE].yes().click();
        buyerBasedPage.submitButton().click();

        cy.url().should('include', ROUTES.TRIED_TO_OBTAIN_COVER);
      });
    });
  });
});
