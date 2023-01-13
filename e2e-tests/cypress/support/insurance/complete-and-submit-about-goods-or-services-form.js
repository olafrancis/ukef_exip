import { FIELD_IDS } from '../../../constants';
import { aboutGoodsOrServicesPage } from '../../e2e/pages/insurance/policy-and-export';
import { submitButton } from '../../e2e/pages/shared';
import application from '../../fixtures/application';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      ABOUT_GOODS_OR_SERVICES: {
        DESCRIPTION,
        FINAL_DESTINATION,
      },
    },
  },
} = FIELD_IDS;

export default () => {
  aboutGoodsOrServicesPage[DESCRIPTION].input().type(application.POLICY_AND_EXPORTS[DESCRIPTION]);
  aboutGoodsOrServicesPage[FINAL_DESTINATION].input().select(application.POLICY_AND_EXPORTS[FINAL_DESTINATION]);

  submitButton().click();
};