import { FIELD_IDS } from '../../../../constants';
import { LINKS } from '../../../links';

const {
  BUYER_COUNTRY,
  HAS_MINIMUM_UK_GOODS_OR_SERVICES,
  VALID_EXPORTER_LOCATION,
  WANT_COVER_OVER_MAX_AMOUNT,
  WANT_COVER_OVER_MAX_PERIOD,
  COMPANIES_HOUSE_NUMBER,
} = FIELD_IDS.INSURANCE.ELIGIBILITY;

export const FIELDS_ELIGIBILITY = {
  [BUYER_COUNTRY]: {
    SUMMARY: {
      TITLE: 'Buyer location',
    },
  },
  [VALID_EXPORTER_LOCATION]: {
    SUMMARY: {
      TITLE: 'In UK, Channel Islands or Isle of Man',
    },
  },
  [HAS_MINIMUM_UK_GOODS_OR_SERVICES]: {
    SUMMARY: {
      TITLE: 'UK goods or services',
    },
    ANSWER: 'At least 20%',
  },
  [WANT_COVER_OVER_MAX_AMOUNT]: {
    SUMMARY: {
      TITLE: 'Insured for more than £500,000',
    },
  },
  [WANT_COVER_OVER_MAX_PERIOD]: {
    SUMMARY: {
      TITLE: 'Insured for more than 2 years',
    },
  },
  [COMPANIES_HOUSE_NUMBER]: {
    HINT: `<p><span data-cy="hint-for-example">For example, 8989898 or SC907816. You'll find it on your incorporation certificate or on the </span><a class="govuk-link" href="${LINKS.EXTERNAL.COMPANIES_HOUSE}" data-cy="hint-link">Companies House website</a>.</p>`,
    SUMMARY: {
      TITLE: 'UK Companies House registration number and actively trading',
    },
  },
};
