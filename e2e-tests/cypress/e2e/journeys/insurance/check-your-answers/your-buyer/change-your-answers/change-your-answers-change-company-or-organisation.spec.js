import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { WEBSITE_EXAMPLES } from '../../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { checkYourAnswersYourBuyer } from '../../../../../pages/insurance/check-your-answers';
import { companyOrOrganisationPage } from '../../../../../pages/insurance/your-buyer';
import {
  checkChangeLinkUrl,
  changeAnswerField,
  checkChangeAnswerRendered,
} from '../../../../../../support/check-summary-list-field-change';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/your-buyer';
import application from '../../../../../../fixtures/application';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
    REGISTRATION_NUMBER,
    WEBSITE,
    FIRST_NAME,
    LAST_NAME,
    POSITION,
    EMAIL,
    CAN_CONTACT_BUYER,
  },
} = INSURANCE_FIELD_IDS.YOUR_BUYER;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswersAndSubmit;

const { summaryList } = checkYourAnswersYourBuyer;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE,
  checkYourAnswersRoute: YOUR_BUYER,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

context('Insurance - Check your answers - Company or organisation - Your buyer page- Summary list', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      task.link().click();

      // to get past eligibility check your answers page
      submitButton().click();
      // to get past policy and exports check your answers page
      submitButton().click();
      // to get past your business check your answers page
      submitButton().click();

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  describe(NAME, () => {
    const fieldId = NAME;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = 'Test name 2';
        changeAnswerField(fieldVariables, companyOrOrganisationPage[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });

  describe(ADDRESS, () => {
    const fieldId = ADDRESS;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = 'Address test 2';
        changeAnswerField(fieldVariables, companyOrOrganisationPage[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer', () => {
        const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

        const row = summaryList.field(fieldId);

        cy.checkText(
          row.key(),
          expectedKey,
        );

        // as html, cannot use checkText so checking contains following fields
        row.value().contains(fieldVariables.newValueInput);
        row.value().contains(application.BUYER[COUNTRY]);
      });
    });
  });

  describe(REGISTRATION_NUMBER, () => {
    const fieldId = REGISTRATION_NUMBER;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = '99999';
        changeAnswerField(fieldVariables, companyOrOrganisationPage[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });

  describe(WEBSITE, () => {
    const fieldId = WEBSITE;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = WEBSITE_EXAMPLES.VALID_UKEF;
        changeAnswerField(fieldVariables, companyOrOrganisationPage[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });

  describe(FIRST_NAME, () => {
    const fieldId = FIRST_NAME;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      const newAnswerFirstName = 'Jim';
      const newAnswerLastName = 'Jim';
      const newAnswerPosition = 'Worker';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(companyOrOrganisationPage[fieldId].input(), newAnswerFirstName);
        cy.keyboardInput(companyOrOrganisationPage[LAST_NAME].input(), newAnswerLastName);
        cy.keyboardInput(companyOrOrganisationPage[POSITION].input(), newAnswerPosition);

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer', () => {
        const expectedKey = FIELDS.COMPANY_OR_ORGANISATION[fieldId].SUMMARY.TITLE;

        const row = summaryList.field(fieldId);

        cy.checkText(
          row.key(),
          expectedKey,
        );

        // as html, cannot use checkText so checking contains following fields
        row.value().contains(newAnswerFirstName);
        row.value().contains(newAnswerLastName);
        row.value().contains(newAnswerPosition);
        row.value().contains(application.BUYER[EMAIL]);
      });
    });
  });

  describe(CAN_CONTACT_BUYER, () => {
    const fieldId = CAN_CONTACT_BUYER;
    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${COMPANY_OR_ORGANISATION_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        companyOrOrganisationPage[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUYER, fieldId);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = 'No';
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });
});