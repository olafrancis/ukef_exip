import { submitButton } from '../../../../../pages/shared';
import partials from '../../../../../partials';
import { checkYourAnswersYourBusiness } from '../../../../../pages/insurance/check-your-answers';
import { broker } from '../../../../../pages/your-business';
import {
  checkChangeLinkUrl,
  changeAnswerField,
  checkChangeAnswerRendered,
} from '../../../../../../support/check-summary-list-field-change';
import { EXPORTER_BUSINESS_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/exporter-business';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';

const {
  ROOT,
  CHECK_YOUR_ANSWERS: {
    YOUR_BUSINESS,
  },
  EXPORTER_BUSINESS: {
    BROKER_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const {
  BROKER: {
    USING_BROKER,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    POSTCODE,
    EMAIL,
  },
} = INSURANCE_FIELD_IDS.EXPORTER_BUSINESS;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswersAndSubmit;

const { summaryList } = checkYourAnswersYourBusiness;

const getFieldVariables = (fieldId, referenceNumber) => ({
  route: BROKER_CHECK_AND_CHANGE,
  checkYourAnswersRoute: YOUR_BUSINESS,
  newValueInput: '',
  fieldId,
  referenceNumber,
  summaryList,
  changeLink: summaryList.field(fieldId).changeLink,
});

context('Insurance - Check your answers - Broker - Your business - Summary list', () => {
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

      url = `${Cypress.config('baseUrl')}${ROOT}/${referenceNumber}${YOUR_BUSINESS}`;

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

      it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
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
        changeAnswerField(fieldVariables, broker[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });

  describe('Address', () => {
    const fieldId = ADDRESS_LINE_1;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, BROKER_CHECK_AND_CHANGE, fieldId);
      });
    });

    describe('form submission with a new answer', () => {
      const addressLine1 = '25 test';
      const addressLine2 = '25 test 2';
      const town = 'Test London';
      const country = 'Test London';
      const postcode = 'SW1A 2AA';

      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.keyboardInput(broker[fieldId].input(), addressLine1);
        cy.keyboardInput(broker[ADDRESS_LINE_2].input(), addressLine2);
        cy.keyboardInput(broker[TOWN].input(), town);
        cy.keyboardInput(broker[COUNTY].input(), country);
        cy.keyboardInput(broker[POSTCODE].input(), postcode);

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer', () => {
        const expectedKey = FIELDS.BROKER[fieldId].SUMMARY.TITLE;

        const row = summaryList.field(fieldId);

        cy.checkText(
          row.key(),
          expectedKey,
        );

        // as html, cannot use checkText so checking contains following fields
        row.value().contains(addressLine1);
        row.value().contains(addressLine2);
        row.value().contains(town);
        row.value().contains(country);
        row.value().contains(postcode);
      });
    });
  });

  describe(EMAIL, () => {
    const fieldId = EMAIL;

    let fieldVariables = getFieldVariables(fieldId, referenceNumber);

    describe('when clicking the `change` link', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);
        fieldVariables = getFieldVariables(fieldId, referenceNumber);

        checkChangeLinkUrl(fieldVariables, referenceNumber);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        fieldVariables.newValueInput = 'testing321@test.com';
        changeAnswerField(fieldVariables, broker[fieldId].input());
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer', () => {
        fieldVariables.newValue = fieldVariables.newValueInput;
        checkChangeAnswerRendered(fieldVariables);
      });
    });
  });

  describe(USING_BROKER, () => {
    const fieldId = USING_BROKER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${BROKER_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl(referenceNumber, BROKER_CHECK_AND_CHANGE, USING_BROKER);
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        broker[fieldId].noRadioInput().click();

        submitButton().click();
      });

      it(`should redirect to ${YOUR_BUSINESS}`, () => {
        cy.assertChangeAnswersPageUrl(referenceNumber, YOUR_BUSINESS, fieldId);
      });

      it('should render the new answer and not render the optional broker sections', () => {
        cy.checkText(summaryList.field(fieldId).value(), 'No');

        summaryList.field(NAME).key().should('not.exist');
        summaryList.field(NAME).value().should('not.exist');
        summaryList.field(NAME).changeLink().should('not.exist');

        summaryList.field(ADDRESS_LINE_1).key().should('not.exist');
        summaryList.field(ADDRESS_LINE_1).value().should('not.exist');
        summaryList.field(ADDRESS_LINE_1).changeLink().should('not.exist');

        summaryList.field(EMAIL).key().should('not.exist');
        summaryList.field(EMAIL).value().should('not.exist');
        summaryList.field(EMAIL).changeLink().should('not.exist');
      });
    });
  });
});
