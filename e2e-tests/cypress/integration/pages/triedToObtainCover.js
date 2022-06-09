import { FIELD_IDS } from '../../../constants';

const triedToObtainCoverPage = {
  heading: () => cy.get('[data-cy="heading"]'),
  warning: () => cy.get('[data-cy="warning"]'),
  [FIELD_IDS.TRIED_PRIVATE_COVER]: {
    yes: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-yes"]`),
    yesInput: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-yes-input"]`),
    no: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-no"]`),
    errorMessage: () => cy.get(`[data-cy="${FIELD_IDS.TRIED_PRIVATE_COVER}-error-message"]`),
  },
  submitButton: () => cy.get('[data-cy="submit-button"]'),
};

export default triedToObtainCoverPage;
