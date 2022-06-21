import buyerBasedPage from '../../pages/buyerBased';
import partials from '../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  PAGES,
  ERROR_MESSAGES,
} from '../../../../content-strings';
import CONSTANTS from '../../../../constants';

const CONTENT_STRINGS = PAGES.BUYER_BASED_PAGE;
const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Which country is your buyer based page', () => {
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

  describe('searchable autocomplete input', () => {
    it('renders an input', () => {
      buyerBasedPage.searchInput().should('exist');
    });

    it('renders `no results` message when no results are found', () => {
      buyerBasedPage.searchInput().type('test');

      const noResults = buyerBasedPage.noResults();
      noResults.should('exist');

      noResults.invoke('text').then((text) => {
        // this text is generated by external component.
        expect(text.trim()).equal('No results found');
      });
    });

    it('renders a single country result after searching', () => {
      // start searching for France
      buyerBasedPage.searchInput().type('Fra');

      const noResults = buyerBasedPage.noResults();
      noResults.should('not.exist');

      const results = buyerBasedPage.results();

      results.should('have.length', 1);
    });

    it('renders multiple country results after searching', () => {
      buyerBasedPage.searchInput().type('Be');

      const noResults = buyerBasedPage.noResults();
      noResults.should('not.exist');

      const results = buyerBasedPage.results();

      results.should('have.length.greaterThan', 1);
    });

    it('adds the country name to a hidden input value after searching', () => {
      buyerBasedPage.searchInput().type('Fra');

      const noResults = buyerBasedPage.noResults();
      noResults.should('not.exist');

      const results = buyerBasedPage.results();

      // select the first result (France)
      results.first().click();

      // check hidden input value
      const expectedValue = 'France';
      buyerBasedPage.hiddenInput().should('have.attr', 'value', expectedValue);
    });

    it('allows user to remove a selected country and search again', () => {
      buyerBasedPage.searchInput().type('Fra');
      const results = buyerBasedPage.results();

      // select the first result (France)
      results.first().click();

      // clear the input
      buyerBasedPage.searchInput().clear();

      // search for a different country, submit with enter key
      buyerBasedPage.searchInput().type('Belg{enter}');

      // check hidden input value
      const expectedValue = 'Belgium';
      buyerBasedPage.hiddenInput().should('have.attr', 'value', expectedValue);
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

        const expectedMessage = ERROR_MESSAGES[FIELD_IDS.BUYER_COUNTRY];

        partials.errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        buyerBasedPage.errorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });
    });

    describe('when submitting with a supported country', () => {
      it(`should redirect to ${ROUTES.TRIED_TO_OBTAIN_COVER}`, () => {
        buyerBasedPage.searchInput().type('Fra');

        const results = buyerBasedPage.results();
        results.first().click();

        buyerBasedPage.submitButton().click();

        cy.url().should('include', ROUTES.TRIED_TO_OBTAIN_COVER);
      });
    });
  });
});
