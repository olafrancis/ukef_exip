import { YOUR_BUYER as FIELD_IDS } from '../../../../../constants/field-ids/insurance/your-buyer';

const {
  COMPANY_OR_ORGANISATION: {
    NAME,
    ADDRESS,
    COUNTRY,
  },
} = FIELD_IDS;

const companyOrOrganisation = {
  [NAME]: {
    label: () => cy.get(`[data-cy="${NAME}-label"]`),
    input: () => cy.get(`[data-cy="${NAME}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${NAME}-error-message"]`),
  },
  [ADDRESS]: {
    label: () => cy.get(`[data-cy="${ADDRESS}-label"]`),
    input: () => cy.get(`[data-cy="${ADDRESS}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${ADDRESS}-error-message"]`),
  },
  [COUNTRY]: {
    label: () => cy.get(`[data-cy="${COUNTRY}-label"]`),
    input: () => cy.get(`[data-cy="${COUNTRY}-input"]`),
    inputOption: () => cy.get(`[data-cy="${COUNTRY}-input"]`).find('option'),
    inputFirstOption: () => cy.get(`[data-cy="${COUNTRY}-input"]`).find('option').eq(0),
    inputOptionSelected: () => cy.get(`[data-cy="${COUNTRY}-input"]`).find(':selected'),
    errorMessage: () => cy.get(`[data-cy="${COUNTRY}-error-message"]`),
  },
};

export default companyOrOrganisation;
