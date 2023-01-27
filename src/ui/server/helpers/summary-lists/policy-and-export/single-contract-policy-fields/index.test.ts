import generateSingleContractPolicyFields from '.';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy-and-exports';
import { GBP_CURRENCY_CODE, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import formatCurrency from '../../../format-currency';
import mockApplication, { mockSinglePolicyAndExport } from '../../../../test-mocks/mock-application';

const {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { SINGLE_CONTRACT_POLICY_CHANGE },
  },
} = ROUTES;

describe('server/helpers/summary-lists/policy-and-export/single-contract-policy-fields', () => {
  const mockAnswers = mockSinglePolicyAndExport;
  const { referenceNumber } = mockApplication;

  const expectedBase = {
    [CONTRACT_COMPLETION_DATE]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, CONTRACT_COMPLETION_DATE),
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHANGE}#${CONTRACT_COMPLETION_DATE}-label`,
    },
    [TOTAL_CONTRACT_VALUE]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, TOTAL_CONTRACT_VALUE),
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${SINGLE_CONTRACT_POLICY_CHANGE}#${TOTAL_CONTRACT_VALUE}-label`,
    },
  };

  it('should return fields and values from the submitted data/answes', () => {
    const result = generateSingleContractPolicyFields(mockAnswers, referenceNumber);

    const expected = [
      fieldGroupItem(expectedBase[CONTRACT_COMPLETION_DATE], formatDate(mockAnswers[CONTRACT_COMPLETION_DATE])),
      fieldGroupItem(expectedBase[TOTAL_CONTRACT_VALUE], formatCurrency(mockAnswers[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE)),
    ];

    expect(result).toEqual(expected);
  });

  describe('when there are no submitted data/answers', () => {
    it('should return fields without values', () => {
      const result = generateSingleContractPolicyFields({ id: mockApplication.id }, referenceNumber);

      const expected = [fieldGroupItem(expectedBase[CONTRACT_COMPLETION_DATE]), fieldGroupItem(expectedBase[TOTAL_CONTRACT_VALUE])];

      expect(result).toEqual(expected);
    });
  });
});
