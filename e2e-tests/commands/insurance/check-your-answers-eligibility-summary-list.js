import { FIELD_IDS, FIELD_VALUES } from '../../constants';
import { summaryList } from '../../pages/shared';
import { FIELDS_ELIGIBILITY as FIELDS } from '../../content-strings/fields/insurance/eligibility';
import { country } from '../../fixtures/application';
import getSummaryListField from './get-summary-list-field';

const {
  TOTAL_CONTRACT_VALUE,
  COVER_PERIOD,
  COMPANIES_HOUSE_NUMBER,
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

const checkYourAnswersEligibilitySummaryList = ({
  [BUYER_COUNTRY]: () => {
    const fieldId = BUYER_COUNTRY;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = country.name;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [VALID_EXPORTER_LOCATION]: () => {
    const fieldId = VALID_EXPORTER_LOCATION;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.YES;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: () => {
    const fieldId = HAS_MINIMUM_UK_GOODS_OR_SERVICES;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELDS[HAS_MINIMUM_UK_GOODS_OR_SERVICES].ANSWER;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [TOTAL_CONTRACT_VALUE]: () => {
    const fieldId = TOTAL_CONTRACT_VALUE;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELDS[fieldId].SUMMARY.BELOW;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [COVER_PERIOD]: () => {
    const fieldId = COVER_PERIOD;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.NO;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
  [COMPANIES_HOUSE_NUMBER]: () => {
    const fieldId = COMPANIES_HOUSE_NUMBER;

    const { expectedKey } = getSummaryListField(fieldId, FIELDS);
    const expectedValue = FIELD_VALUES.YES;

    cy.assertSummaryListRow(summaryList, fieldId, expectedKey, expectedValue);
  },
});

export default checkYourAnswersEligibilitySummaryList;
