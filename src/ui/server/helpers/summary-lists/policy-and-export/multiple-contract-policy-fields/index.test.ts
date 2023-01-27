import generateMultipleContractPolicyFields from '.';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy-and-exports';
import { GBP_CURRENCY_CODE, ROUTES } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatCurrency from '../../../format-currency';
import mapMonthString from '../../../data-content-mappings/map-month-string';
import mockApplication, { mockMultiplePolicyAndExport } from '../../../../test-mocks/mock-application';

const {
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY_AND_EXPORTS: { MULTIPLE_CONTRACT_POLICY_CHANGE },
  },
} = ROUTES;

describe('server/helpers/summary-lists/policy-and-export/multiple-contract-policy-fields', () => {
  const mockAnswers = mockMultiplePolicyAndExport;
  const { referenceNumber } = mockApplication;

  const expectedBase = {
    [TOTAL_MONTHS_OF_COVER]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_MONTHS_OF_COVER),
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_CHANGE}#${TOTAL_MONTHS_OF_COVER}-label`,
    },
    [TOTAL_SALES_TO_BUYER]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_SALES_TO_BUYER),
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_CHANGE}#${TOTAL_SALES_TO_BUYER}-label`,
    },
    [MAXIMUM_BUYER_WILL_OWE]: {
      field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, MAXIMUM_BUYER_WILL_OWE),
      renderChangeLink: true,
      href: `${INSURANCE_ROOT}/${referenceNumber}${MULTIPLE_CONTRACT_POLICY_CHANGE}#${MAXIMUM_BUYER_WILL_OWE}-label`,
    },
  };

  it('should return fields and values from the submitted data/answers', () => {
    const result = generateMultipleContractPolicyFields(mockAnswers, referenceNumber);

    const expected = [
      fieldGroupItem(expectedBase[TOTAL_MONTHS_OF_COVER], mapMonthString(mockAnswers[TOTAL_MONTHS_OF_COVER])),
      fieldGroupItem(expectedBase[TOTAL_SALES_TO_BUYER], formatCurrency(mockAnswers[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
      fieldGroupItem(expectedBase[MAXIMUM_BUYER_WILL_OWE], formatCurrency(mockAnswers[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE)),
    ];

    expect(result).toEqual(expected);
  });

  describe('when there are no submitted data/answers', () => {
    it('should return fields without values', () => {
      const result = generateMultipleContractPolicyFields({ id: mockApplication.id }, referenceNumber);

      const expected = [
        fieldGroupItem(expectedBase[TOTAL_MONTHS_OF_COVER]),
        fieldGroupItem(expectedBase[TOTAL_SALES_TO_BUYER]),
        fieldGroupItem(expectedBase[MAXIMUM_BUYER_WILL_OWE]),
      ];

      expect(result).toEqual(expected);
    });
  });
});
