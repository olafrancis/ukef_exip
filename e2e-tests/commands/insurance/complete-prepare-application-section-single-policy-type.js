import { submitButton, startNowLink } from '../../pages/shared';
import partials from '../../partials';
import { FIELD_VALUES } from '../../constants';

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

/**
 * completePrepareYourApplicationSectionSingle
 * Runs through the full prepare your application journey for a single policy type
 * @param {Object} Object with flags on how to complete specific parts of the application
 * - differentTradingAddress: Should submit "yes" to "trade from a different address" in the "your business - company details" form. Defaults to false.
 * - exporterHasTradedWithBuyer: Should submit "yes" to "have traded with buyer before" in the "working with buyer" form. Defaults to "yes".
 * - usingBroker: Should submit "yes" or "no" to "using a broker". Defaults to "no".
 * - policyMaximumValue: Should submit an application with the maximum value of 500000
 * - differentPolicyContact: Should submit an application with a different policy contact to the owner
 */
const completePrepareYourApplicationSectionSingle = ({
  differentTradingAddress = false,
  exporterHasTradedWithBuyer,
  usingBroker,
  policyMaximumValue = false,
  differentPolicyContact,
}) => {
  task.link().click();

  cy.completeAndSubmitPolicyTypeForm(FIELD_VALUES.POLICY_TYPE.SINGLE);
  cy.completeAndSubmitSingleContractPolicyForm({ policyMaximumValue });
  cy.completeAndSubmitAboutGoodsOrServicesForm();
  cy.completeAndSubmitNameOnPolicyForm({ sameName: !differentPolicyContact });

  if (differentPolicyContact) {
    cy.completeAndSubmitDifferentNameOnPolicyForm({});
  }

  // submit "policy and exports - check your answers" form
  submitButton().click();

  // start "your business" section
  startNowLink().click();

  cy.completeAndSubmitCompanyDetails({ differentTradingAddress });

  if (differentTradingAddress) {
    cy.completeAndSubmitAlternativeTradingAddressForm();
  }

  cy.completeAndSubmitNatureOfYourBusiness();
  cy.completeAndSubmitTurnoverForm();
  cy.completeAndSubmitCreditControlForm();
  cy.completeAndSubmitBrokerForm({ usingBroker });

  submitButton().click();

  cy.completeAndSubmitCompanyOrOrganisationForm({});
  cy.completeAndSubmitWorkingWithBuyerForm({ exporterHasTradedWithBuyer });

  submitButton().click();
};

export default completePrepareYourApplicationSectionSingle;
