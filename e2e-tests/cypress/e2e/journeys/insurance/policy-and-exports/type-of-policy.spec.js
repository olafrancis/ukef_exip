import { headingCaption, heading, inlineErrorMessage, submitButton, saveAndBackButton } from '../../../pages/shared';
import { insurance } from '../../../pages';
import { backLink, errorSummaryListItems, errorSummaryListItemLinks, insurance as insurancePartials } from '../../../partials';
import { BUTTONS, ERROR_MESSAGES, LINKS, ORGANISATION, PAGES } from '../../../../../content-strings';
import { FIELDS } from '../../../../../content-strings/fields/insurance/policy-and-exports';
import CONSTANTS from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeUkGoodsAndServicesForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeOtherPartiesForm,
  completeLetterOfCreditForm,
  completePreCreditPeriodForm,
  completeCompaniesHouseNumberForm,
  completeEligibleToApplyOnlineForm,
} from '../../../../support/insurance/eligibility/forms';
import getApplicationId from '../../../helpers/get-application-id';

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY;

const { ROUTES, FIELD_IDS } = CONSTANTS;

const FIELD_ID = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;

const singlePolicyField = insurance.policyAndExport.typeOfPolicy[FIELD_ID].single;
const multiplePolicyField = insurance.policyAndExport.typeOfPolicy[FIELD_ID].multi;

const goToPageDirectly = (applicationId) => {
  cy.visit(`${ROUTES.INSURANCE.ROOT}/${applicationId}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`, {
    auth: {
      username: Cypress.config('basicAuthKey'),
      password: Cypress.config('basicAuthSecret'),
    },
  });
};

context('Insurance - Policy and exports - Type of policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let applicationId;

  before(() => {
    cy.visit(ROUTES.INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    completeStartForm();
    completeCheckIfEligibleForm();
    completeAndSubmitBuyerCountryForm();
    completeExporterLocationForm();
    completeUkGoodsAndServicesForm();
    completeInsuredAmountForm();
    completeInsuredPeriodForm();
    completeOtherPartiesForm();
    completeLetterOfCreditForm();
    completePreCreditPeriodForm();
    completeCompaniesHouseNumberForm();
    completeEligibleToApplyOnlineForm();

    insurancePartials.taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    getApplicationId().then((id) => {
      applicationId = id;

      const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${applicationId}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`;
      cy.url().should('eq', expected);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  // it('passes the audits', () => {
  //   cy.lighthouse({
  //     accessibility: 100,
  //     performance: 75,
  //     'best-practices': 100,
  //     seo: 70,
  //   });
  // });

  it('renders a back link with correct url', () => {
    backLink().should('exist');
    backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${applicationId}${ROUTES.INSURANCE.ALL_SECTIONS}`;

    cy.url().should('include', expectedUrl);

    goToPageDirectly(applicationId);
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a page title and heading with caption', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    headingCaption().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING_CAPTION);
    });

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('renders an intro paragraph', () => {
    insurance.policyAndExport.typeOfPolicy.intro().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.INTRO);
    });
  });

  it('renders `single` radio input with label and hint text list', () => {
    singlePolicyField.input().should('exist');
    singlePolicyField.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.TEXT);
    });

    singlePolicyField.hintList.item1().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[0]);
    });

    singlePolicyField.hintList.item2().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[1]);
    });

    singlePolicyField.hintList.item3().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[2]);
    });

    singlePolicyField.hintList.item4().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.SINGLE.HINT_LIST[3]);
    });
  });

  it('renders `multiple` radio input with label and hint text list', () => {
    multiplePolicyField.input().should('exist');
    multiplePolicyField.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.MULTI.TEXT);
    });

    multiplePolicyField.hintList.item1().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.MULTI.HINT_LIST[0]);
    });

    multiplePolicyField.hintList.item2().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.MULTI.HINT_LIST[1]);
    });

    multiplePolicyField.hintList.item3().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS[FIELD_ID].OPTIONS.MULTI.HINT_LIST[2]);
    });
  });

  it('renders a submit button', () => {
    submitButton().should('exist');

    submitButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.CONTINUE);
    });
  });

  it('renders a `save and back` button', () => {
    saveAndBackButton().should('exist');

    saveAndBackButton().invoke('text').then((text) => {
      expect(text.trim()).equal(BUTTONS.SAVE_AND_BACK_TO_ALL_SECTIONS);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      it('should render a validation error', () => {
        submitButton().click();

        errorSummaryListItems().should('exist');
        errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.POLICY_AND_EXPORTS[FIELD_ID].IS_EMPTY;

        errorSummaryListItems().first().invoke('text').then((text) => {
          expect(text.trim()).equal(expectedMessage);
        });

        inlineErrorMessage().invoke('text').then((text) => {
          expect(text.trim()).includes(expectedMessage);
        });
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        errorSummaryListItemLinks().eq(0).click();
        singlePolicyField.input().should('have.focus');
      });
    });

    describe('when submitting the answer as `single`', () => {
      it(`should redirect to ${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, () => {
        singlePolicyField.input().click();

        submitButton().click();

        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${applicationId}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`;

        cy.url().should('eq', expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          goToPageDirectly(applicationId);

          singlePolicyField.input().should('be.checked');
        });
      });
    });

    describe('when submitting the answer as `multiple`', () => {
      it(`should redirect to ${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`, () => {
        multiplePolicyField.input().click();

        submitButton().click();

        const expected = `${Cypress.config('baseUrl')}${ROUTES.INSURANCE.ROOT}/${applicationId}${ROUTES.INSURANCE.POLICY_AND_EXPORTS.ABOUT_GOODS_OR_SERVICES}`;

        cy.url().should('eq', expected);
      });

      describe('when going back to the page', () => {
        it('should have the originally submitted answer selected', () => {
          goToPageDirectly(applicationId);

          multiplePolicyField.input().should('be.checked');
        });
      });

    });
  });
});
