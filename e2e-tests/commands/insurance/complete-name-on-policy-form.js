import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field } from '../../pages/shared';
import application from '../../fixtures/application';

const {
  POLICY: {
    NAME_ON_POLICY: {
      POSITION,
      SAME_NAME,
      OTHER_NAME,
    },
  },
} = INSURANCE_FIELD_IDS;

const { POLICY_CONTACT } = application;

/**
 * completeNameOnPolicyForm
 * completes name on policy form
 * if sameName selected, then clicks radio and fills in conditional field
 * if not sameName then only clicks other name radio
 * @param {Boolean} sameName - if name is the same name as owner - default true
 */
const completeNameOnPolicyForm = ({ sameName = true }) => {
  if (sameName) {
    field(SAME_NAME).input().click();
    cy.keyboardInput(field(POSITION).input(), POLICY_CONTACT[POSITION]);
  } else {
    field(OTHER_NAME).input().click();
  }
};

export default completeNameOnPolicyForm;
