import {
  completeStartForm,
  completeCheckIfEligibleForm,
  completeExporterLocationForm,
  completeCompaniesHouseNumberForm,
  completeInsuredAmountForm,
  completeInsuredPeriodForm,
  completeUkGoodsAndServicesForm,
  completeEligibleToApplyOnlineForm,
  completeAccountToApplyOnlineForm,
} from '../../insurance/eligibility/forms';

Cypress.Commands.add('completeStartForm', completeStartForm);
Cypress.Commands.add('completeCheckIfEligibleForm', completeCheckIfEligibleForm);
Cypress.Commands.add('completeExporterLocationForm', completeExporterLocationForm);
Cypress.Commands.add('completeCompaniesHouseNumberForm', completeCompaniesHouseNumberForm);
Cypress.Commands.add('completeInsuredAmountForm', completeInsuredAmountForm);
Cypress.Commands.add('completeInsuredPeriodForm', completeInsuredPeriodForm);
Cypress.Commands.add('completeUkGoodsAndServicesForm', completeUkGoodsAndServicesForm);
Cypress.Commands.add('completeEligibleToApplyOnlineForm', completeEligibleToApplyOnlineForm);
Cypress.Commands.add('completeAccountToApplyOnlineForm', completeAccountToApplyOnlineForm);

Cypress.Commands.add('submitInsuranceEligibilityAnswersFromExporterLocationHappyPath', require('../../insurance/eligibility/submit-answers-from-exporter-location-happy-path'));
