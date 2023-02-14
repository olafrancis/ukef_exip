import { FIELD_IDS } from '../../../../../constants/field-ids';
import { yesRadioInput, noRadioInput } from '../../shared';

const {
  BROKER: {
    USING_BROKER,
    HEADING,
    NAME,
    ADDRESS_LINE_1,
    ADDRESS_LINE_2,
    TOWN,
    COUNTY,
    POSTCODE,
    EMAIL,
  },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

const broker = {
  [HEADING]: () => cy.get(`[data-cy="${HEADING}-heading`),
  [USING_BROKER]: {
    value: () => cy.get(`[data-cy="${USING_BROKER}`),
    yesRadioInput: () => yesRadioInput().eq(0),
    noRadioInput: () => noRadioInput().eq(0),
    errorMessage: () => cy.get(`[data-cy="${USING_BROKER}-error`),
  },
  [NAME]: {
    label: () => cy.get(`[data-cy="${NAME}-label`),
    input: () => cy.get(`[data-cy="${NAME}-input`),
    errorMessage: () => cy.get(`[data-cy="${NAME}-error`),
  },
  [ADDRESS_LINE_1]: {
    label: () => cy.get(`[data-cy="${ADDRESS_LINE_1}-label`),
    input: () => cy.get(`[data-cy="${ADDRESS_LINE_1}-input`),
    errorMessage: () => cy.get(`[data-cy="${ADDRESS_LINE_1}-error`),
  },
  [ADDRESS_LINE_2]: {
    label: () => cy.get(`[data-cy="${ADDRESS_LINE_2}-label`),
    input: () => cy.get(`[data-cy="${ADDRESS_LINE_2}-input`),
  },
  [TOWN]: {
    label: () => cy.get(`[data-cy="${TOWN}-label`),
    input: () => cy.get(`[data-cy="${TOWN}-input`),
    errorMessage: () => cy.get(`[data-cy="${TOWN}-error`),
  },
  [COUNTY]: {
    label: () => cy.get(`[data-cy="${COUNTY}-label`),
    input: () => cy.get(`[data-cy="${COUNTY}-input`),
  },
  [POSTCODE]: {
    label: () => cy.get(`[data-cy="${POSTCODE}-label`),
    input: () => cy.get(`[data-cy="${POSTCODE}-input`),
  },
  [EMAIL]: {
    label: () => cy.get(`[data-cy="${EMAIL}-label`),
    input: () => cy.get(`[data-cy="${EMAIL}-input`),
    errorMessage: () => cy.get(`[data-cy="${EMAIL}-error`),
  },
};

export default broker;