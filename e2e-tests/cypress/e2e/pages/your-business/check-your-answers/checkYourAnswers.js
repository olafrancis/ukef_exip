import { FIELD_IDS } from '../../../../../constants';

const {
  INSURANCE: {
    EXPORTER_BUSINESS: {
      COMPANY_HOUSE: {
        COMPANY_NAME,
        COMPANY_NUMBER,
        COMPANY_ADDRESS,
        COMPANY_INCORPORATED,
        COMPANY_SIC,
        FINANCIAL_YEAR_END_DATE,
      },
      YOUR_COMPANY: {
        TRADING_ADDRESS,
        TRADING_NAME,
        WEBSITE,
        PHONE_NUMBER,
      },
      NATURE_OF_YOUR_BUSINESS: {
        YEARS_EXPORTING,
        GOODS_OR_SERVICES,
        EMPLOYEES_INTERNATIONAL,
        EMPLOYEES_UK,
      },
      TURNOVER: {
        ESTIMATED_ANNUAL_TURNOVER,
        PERCENTAGE_TURNOVER,
      },
    },
  },
} = FIELD_IDS;

const checkYourAnswers = {
  summaryList: {
    [COMPANY_NUMBER]: {
      key: () => cy.get(`.${COMPANY_NUMBER}-key`),
      value: () => cy.get(`.${COMPANY_NUMBER}-value`),
      changeLink: () => cy.get(`[data-cy="${COMPANY_NUMBER}-change-link"]`),
    },
    [COMPANY_NAME]: {
      key: () => cy.get(`.${COMPANY_NAME}-key`),
      value: () => cy.get(`.${COMPANY_NAME}-value`),
      changeLink: () => cy.get(`[data-cy="${COMPANY_NAME}-change-link"]`),
    },
    [COMPANY_ADDRESS]: {
      key: () => cy.get(`.${COMPANY_ADDRESS}-key`),
      value: () => cy.get(`.${COMPANY_ADDRESS}-value`),
      changeLink: () => cy.get(`[data-cy="${COMPANY_ADDRESS}-change-link"]`),
    },
    [COMPANY_INCORPORATED]: {
      key: () => cy.get(`.${COMPANY_INCORPORATED}-key`),
      value: () => cy.get(`.${COMPANY_INCORPORATED}-value`),
      changeLink: () => cy.get(`[data-cy="${COMPANY_INCORPORATED}-change-link"]`),
    },
    [COMPANY_SIC]: {
      key: () => cy.get(`.${COMPANY_SIC}-key`),
      value: () => cy.get(`.${COMPANY_SIC}-value`),
      changeLink: () => cy.get(`[data-cy="${COMPANY_SIC}-change-link"]`),
    },
    [FINANCIAL_YEAR_END_DATE]: {
      key: () => cy.get(`.${FINANCIAL_YEAR_END_DATE}-key`),
      value: () => cy.get(`.${FINANCIAL_YEAR_END_DATE}-value`),
      changeLink: () => cy.get(`[data-cy="${FINANCIAL_YEAR_END_DATE}-change-link"]`),
    },
    [TRADING_ADDRESS]: {
      key: () => cy.get(`.${TRADING_ADDRESS}-key`),
      value: () => cy.get(`.${TRADING_ADDRESS}-value`),
      changeLink: () => cy.get(`[data-cy="${TRADING_ADDRESS}-change-link"]`),
    },
    [TRADING_NAME]: {
      key: () => cy.get(`.${TRADING_NAME}-key`),
      value: () => cy.get(`.${TRADING_NAME}-value`),
      changeLink: () => cy.get(`[data-cy="${TRADING_NAME}-change-link"]`),
    },
    [WEBSITE]: {
      key: () => cy.get(`.${WEBSITE}-key`),
      value: () => cy.get(`.${WEBSITE}-value`),
      changeLink: () => cy.get(`[data-cy="${WEBSITE}-change-link"]`),
    },
    [PHONE_NUMBER]: {
      key: () => cy.get(`.${PHONE_NUMBER}-key`),
      value: () => cy.get(`.${PHONE_NUMBER}-value`),
      changeLink: () => cy.get(`[data-cy="${PHONE_NUMBER}-change-link"]`),
    },
    [GOODS_OR_SERVICES]: {
      key: () => cy.get(`.${GOODS_OR_SERVICES}-key`),
      value: () => cy.get(`.${GOODS_OR_SERVICES}-value`),
      changeLink: () => cy.get(`[data-cy="${GOODS_OR_SERVICES}-change-link"]`),
    },
    [YEARS_EXPORTING]: {
      key: () => cy.get(`.${YEARS_EXPORTING}-key`),
      value: () => cy.get(`.${YEARS_EXPORTING}-value`),
      changeLink: () => cy.get(`[data-cy="${YEARS_EXPORTING}-change-link"]`),
    },
    [EMPLOYEES_UK]: {
      key: () => cy.get(`.${EMPLOYEES_UK}-key`),
      value: () => cy.get(`.${EMPLOYEES_UK}-value`),
      changeLink: () => cy.get(`[data-cy="${EMPLOYEES_UK}-change-link"]`),
    },
    [EMPLOYEES_INTERNATIONAL]: {
      key: () => cy.get(`.${EMPLOYEES_INTERNATIONAL}-key`),
      value: () => cy.get(`.${EMPLOYEES_INTERNATIONAL}-value`),
      changeLink: () => cy.get(`[data-cy="${EMPLOYEES_INTERNATIONAL}-change-link"]`),
    },
    [ESTIMATED_ANNUAL_TURNOVER]: {
      key: () => cy.get(`.${ESTIMATED_ANNUAL_TURNOVER}-key`),
      value: () => cy.get(`.${ESTIMATED_ANNUAL_TURNOVER}-value`),
      changeLink: () => cy.get(`[data-cy="${ESTIMATED_ANNUAL_TURNOVER}-change-link"]`),
    },
    [PERCENTAGE_TURNOVER]: {
      key: () => cy.get(`.${PERCENTAGE_TURNOVER}-key`),
      value: () => cy.get(`.${PERCENTAGE_TURNOVER}-value`),
      changeLink: () => cy.get(`[data-cy="${PERCENTAGE_TURNOVER}-change-link"]`),
    },
  },
};

export default checkYourAnswers;
