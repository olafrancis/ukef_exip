import {
  headingCaption,
  heading,
  submitButton,
  saveAndBackButton,
} from '../../../pages/shared';
import { typeOfPolicyPage, singleContractPolicyPage } from '../../../pages/insurance/policy-and-export';
import partials from '../../../partials';
import {
  BUTTONS,
  LINKS,
  ORGANISATION,
  PAGES,
} from '../../../../../content-strings';
import { POLICY_AND_EXPORT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/policy-and-exports';
import { FIELD_IDS, ROUTES, SUPPORTED_CURRENCIES } from '../../../../../constants';
import getReferenceNumber from '../../../helpers/get-reference-number';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY;

const singlePolicyFieldId = FIELD_IDS.INSURANCE.POLICY_AND_EXPORTS.POLICY_TYPE;
const singlePolicyField = typeOfPolicyPage[singlePolicyFieldId].single;

const { INSURANCE } = ROUTES;

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      CONTRACT_POLICY,
    },
  },
} = FIELD_IDS;

const goToPageDirectly = (referenceNumber) => {
  cy.visit(`${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`, {
    auth: {
      username: Cypress.config('basicAuthKey'),
      password: Cypress.config('basicAuthSecret'),
    },
  });
};

context('Insurance - Policy and exports - Single contract policy page - As an exporter, I want to enter the type of policy I need for my export contract', () => {
  let referenceNumber;

  before(() => {
    cy.visit(INSURANCE.START, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    cy.submitInsuranceEligibilityAndStartApplication();

    taskList.prepareApplication.tasks.policyTypeAndExports.link().click();

    singlePolicyField.input().click();
    submitButton().click();

    getReferenceNumber().then((id) => {
      referenceNumber = id;
      const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY}`;

      cy.url().should('eq', expectedUrl);
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    partials.backLink().click();

    const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE.ROOT}/${referenceNumber}${INSURANCE.POLICY_AND_EXPORTS.TYPE_OF_POLICY}`;

    cy.url().should('eq', expectedUrl);

    goToPageDirectly(referenceNumber);
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

  it('renders `requested start date` label, hint and inputs', () => {
    const fieldId = CONTRACT_POLICY.REQUESTED_START_DATE;
    const field = singleContractPolicyPage[fieldId];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.CONTRACT_POLICY[fieldId].LABEL);
    });

    field.hint().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.CONTRACT_POLICY[fieldId].HINT);
    });

    field.dayInput().should('exist');
    field.monthInput().should('exist');
    field.yearInput().should('exist');
  });

  it('renders `contract completion date` label, hint and inputs', () => {
    const fieldId = CONTRACT_POLICY.SINGLE.COMPLETION_OF_CONTRACT_DATE;
    const field = singleContractPolicyPage[fieldId];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.CONTRACT_POLICY.SINGLE[fieldId].LABEL);
    });

    field.hint().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.CONTRACT_POLICY.SINGLE[fieldId].HINT);
    });

    field.dayInput().should('exist');
    field.monthInput().should('exist');
    field.yearInput().should('exist');
  });

  it('renders `total contract value` label, hint, prefix and input', () => {
    const fieldId = CONTRACT_POLICY.SINGLE.TOTAL_CONTRACT_VALUE;
    const field = singleContractPolicyPage[fieldId];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.CONTRACT_POLICY.SINGLE[fieldId].LABEL);
    });

    field.hint().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.CONTRACT_POLICY.SINGLE[fieldId].HINT);
    });

    field.prefix().invoke('text').then((text) => {
      expect(text.trim()).equal('£');
    });

    field.input().should('exist');
  });

  it('renders `buyer credit period` label, hint and input', () => {
    const fieldId = CONTRACT_POLICY.CREDIT_PERIOD_WITH_BUYER;
    const field = singleContractPolicyPage[fieldId];

    field.label().should('exist');
    field.label().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.CONTRACT_POLICY[fieldId].LABEL);
    });

    field.hint().invoke('text').then((text) => {
      expect(text.trim()).equal(FIELDS.CONTRACT_POLICY[fieldId].HINT);
    });

    field.input().should('exist');
  });

  describe('currency', () => {
    it('renders `currency` label and input', () => {
      const fieldId = CONTRACT_POLICY.POLICY_CURRENCY_CODE;
      const field = singleContractPolicyPage[fieldId];

      field.label().should('exist');
      field.label().invoke('text').then((text) => {
        expect(text.trim()).equal(FIELDS.CONTRACT_POLICY[fieldId].LABEL);
      });

      field.input().should('exist');
    });

    it('renders only supported currencies in alphabetical order', () => {
      const fieldId = CONTRACT_POLICY.POLICY_CURRENCY_CODE;
      const field = singleContractPolicyPage[fieldId];

      field.inputOption().should('have.length', SUPPORTED_CURRENCIES.length + 1);

      field.inputFirstOption().should('be.disabled');
      field.input().select(1).should('have.value', SUPPORTED_CURRENCIES[0]);
      field.input().select(2).should('have.value', SUPPORTED_CURRENCIES[1]);
      field.input().select(3).should('have.value', SUPPORTED_CURRENCIES[2]);
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
      expect(text.trim()).equal(BUTTONS.SAVE_AND_BACK);
    });
  });
});