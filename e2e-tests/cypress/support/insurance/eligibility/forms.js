import { yesRadio, noRadio, submitButton } from '../../../e2e/pages/shared';

export const completeStartForm = () => {
  submitButton().click();
};

export const completeCheckIfEligibleForm = () => {
  submitButton().click();
};

export const completeExporterLocationForm = () => {
  yesRadio().click();
  submitButton().click();
};

export const completeUkGoodsAndServicesForm = () => {
  yesRadio().click();
  submitButton().click();
};

export const completeInsuredAmountForm = () => {
  noRadio().click();
  submitButton().click();
};

export const completeInsuredPeriodForm = () => {
  noRadio().click();
  submitButton().click();
};

export const completeOtherPartiesForm = () => {
  noRadio().click();
  submitButton().click();
};

export const completeLetterOfCreditForm = () => {
  noRadio().click();
  submitButton().click();
};

export const completePreCreditPeriodForm = () => {
  noRadio().click();
  submitButton().click();
};

export const completeCompaniesHouseNumberForm = () => {
  yesRadio().click();
  submitButton().click();
};

