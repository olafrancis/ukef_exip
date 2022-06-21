import { checkYourAnswersPage } from '../pages';
import partials from '../partials';
import {
  ORGANISATION,
  BUTTONS,
  FIELDS,
  LINKS,
  PAGES,
  SUMMARY_ANSWERS,
} from '../../../content-strings';
import CONSTANTS from '../../../constants';
import FIELD_IDS from '../../../constants/field-ids';

const CONTENT_STRINGS = PAGES.CHECK_YOUR_ANSWERS_PAGE;
const { ROUTES, FIELD_VALUES } = CONSTANTS;

context('Check your answers page', () => {
  const {
    VALID_COMPANY_BASE,
    BUYER_COUNTRY,
    TRIED_PRIVATE_COVER,
    UK_CONTENT_PERCENTAGE,
    CURRENCY,
    AMOUNT,
    PRE_CREDIT_PERIOD,
    CREDIT_PERIOD,
    POLICY_TYPE,
    POLICY_LENGTH,
  } = FIELD_IDS;

  const submissionData = {
    [BUYER_COUNTRY]: 'France',
    [UK_CONTENT_PERCENTAGE]: '50',
    [CURRENCY]: 'GBP',
    [AMOUNT]: '100',
    [PRE_CREDIT_PERIOD]: '1',
    [CREDIT_PERIOD]: '2',
    [POLICY_TYPE]: FIELD_VALUES.POLICY_TYPE.SINGLE,
    [POLICY_LENGTH]: '13',
  };

  before(() => {
    cy.login();
    cy.submitAnswersHappyPath();
    cy.url().should('include', ROUTES.CHECK_YOUR_ANSWERS);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
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

    partials.backLink().should('have.attr', 'href', ROUTES.TELL_US_ABOUT_YOUR_DEAL);
  });

  it('renders a submit button', () => {
    const button = checkYourAnswersPage.submitButton();
    button.should('exist');

    button.invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.SUBMIT);
    });
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    checkYourAnswersPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });

  context('company summary list', () => {
    const list = checkYourAnswersPage.summaryLists.company;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_COMPANY);
      });
    });

    it('renders `Company` key, value and change link', () => {
      const row = list[VALID_COMPANY_BASE];
      const expectedKeyText = FIELDS[VALID_COMPANY_BASE].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY_ANSWERS[VALID_COMPANY_BASE]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.COMPANY_BASED_CHANGE);
    });
  });

  context('export summary list', () => {
    const list = checkYourAnswersPage.summaryLists.export;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_EXPORT);
      });
    });

    it('renders `Buyer based` key, value and change link', () => {
      const row = list[BUYER_COUNTRY];
      const expectedKeyText = FIELDS[BUYER_COUNTRY].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = submissionData[BUYER_COUNTRY];

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.BUYER_BASED_CHANGE);
    });

    it('renders `Private insurance` key, value and change link', () => {
      const row = list[TRIED_PRIVATE_COVER];
      const expectedKeyText = FIELDS[TRIED_PRIVATE_COVER].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY_ANSWERS[TRIED_PRIVATE_COVER]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.TRIED_TO_OBTAIN_COVER_CHANGE);
    });

    it('renders `UK goods` key, value and change link', () => {
      const row = list[UK_CONTENT_PERCENTAGE];
      const expectedKeyText = FIELDS[UK_CONTENT_PERCENTAGE].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(SUMMARY_ANSWERS[UK_CONTENT_PERCENTAGE]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.UK_CONTENT_PERCENTAGE_CHANGE);
    });
  });

  context('deal summary list', () => {
    const list = checkYourAnswersPage.summaryLists.deal;

    it('renders a heading', () => {
      list.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(CONTENT_STRINGS.GROUP_HEADING_DEAL);
      });
    });

    it('renders `Amount` key, value and change link', () => {
      const row = list[AMOUNT];
      const expectedKeyText = FIELDS[AMOUNT].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `£${submissionData[AMOUNT]}.00`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE);
    });

    it('renders `Currency` key, value and change link', () => {
      const row = list[CURRENCY];
      const expectedKeyText = FIELDS[CURRENCY].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `UK Sterling (${submissionData[CURRENCY]})`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE);
    });

    it('renders `Pre-credit period` key, value and change link', () => {
      const row = list[PRE_CREDIT_PERIOD];
      const expectedKeyText = FIELDS[PRE_CREDIT_PERIOD].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[PRE_CREDIT_PERIOD]} days`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE);
    });

    it('renders `Credit period` key, value and change link', () => {
      const row = list[CREDIT_PERIOD];
      const expectedKeyText = FIELDS[CREDIT_PERIOD].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[CREDIT_PERIOD]} days`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE);
    });

    it('renders `Policy type` key, value and change link', () => {
      const row = list[POLICY_TYPE];
      const expectedKeyText = FIELDS[POLICY_TYPE].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        expect(text.trim()).equal(submissionData[POLICY_TYPE]);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE);
    });

    it('renders `Policy length` key, value and change link', () => {
      const row = list[POLICY_LENGTH];
      const expectedKeyText = FIELDS[POLICY_LENGTH].SUMMARY.TITLE;

      row.key().invoke('text').then((text) => {
        expect(text.trim()).equal(expectedKeyText);
      });

      row.value().invoke('text').then((text) => {
        const expected = `${submissionData[POLICY_LENGTH]} months`;

        expect(text.trim()).equal(expected);
      });

      row.changeLink().invoke('text').then((text) => {
        const expected = `${LINKS.CHANGE} ${expectedKeyText}`;
        expect(text.trim()).equal(expected);
      });

      row.changeLink().should('have.attr', 'href', ROUTES.TELL_US_ABOUT_YOUR_DEAL_CHANGE);
    });
  });

  context('form submission', () => {
    it(`should redirect to ${ROUTES.PREMIUM_QUOTE}`, () => {
      checkYourAnswersPage.submitButton().click();

      cy.url().should('include', ROUTES.PREMIUM_QUOTE);
    });
  });
});