import {
  FIELD_IDS,
  FIELD_VALUES,
} from '../../../../constants';

const policyTypePage = {
  [FIELD_IDS.POLICY_TYPE]: {
    single: {
      label: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.SINGLE}-label"]`),
      hint: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.SINGLE}-hint"]`),
      input: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.SINGLE}-input"]`),
    },
    multi: {
      label: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.MULTI}-label"]`),
      hint: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.MULTI}-hint"]`),
      input: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-${FIELD_VALUES.POLICY_TYPE.MULTI}-input"]`),
      inset: {
        text: () => cy.get('[data-cy="multi-policy-inset"] [data-cy="details-1"]'),
        link: () => cy.get('[data-cy="multi-policy-inset"] [data-cy="details-1"] a').eq(0),
      },
    },
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.POLICY_TYPE}-error-message"]`),
  },
  [FIELD_IDS.SINGLE_POLICY_LENGTH]: {
    label: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-label"]`),
    hint: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-hint"]`),
    hintLink: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-hint"] a`),
    input: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-input"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.SINGLE_POLICY_LENGTH}-error-message"]`),
  },
};

export default policyTypePage;