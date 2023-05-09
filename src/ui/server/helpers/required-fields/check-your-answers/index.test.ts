import requiredFields from '.';
import POLICY_AND_EXPORT_FIELD_IDS from '../../../constants/field-ids/insurance/policy-and-exports';
import requiredEligibilityFields from '../eligibility';
import requiredPolicyAndExportFields from '../policy-and-exports';
import requiredBusinessFields from '../business';
import requiredYourBuyerFields from '../your-buyer';
import flattenApplicationData from '../../flatten-application-data';
import { mockApplication } from '../../../test-mocks';

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
} = POLICY_AND_EXPORT_FIELD_IDS;

describe('server/helpers/required-fields/check-your-answers', () => {
  it('should return array of required fields', () => {
    const flatApplicationData = flattenApplicationData(mockApplication);

    const result = requiredFields(flatApplicationData);

    const expected = [
      ...requiredEligibilityFields(),
      ...requiredPolicyAndExportFields(flatApplicationData[POLICY_TYPE]),
      ...requiredBusinessFields(),
      ...requiredYourBuyerFields(),
    ];

    expect(result).toEqual(expected);
  });
});