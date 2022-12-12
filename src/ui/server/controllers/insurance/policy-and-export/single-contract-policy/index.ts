import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import { PAGES } from '../../../../content-strings';
import { FIELDS } from '../../../../content-strings/fields/insurance';
import { Request, Response } from '../../../../../types';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import api from '../../../../api';
import { mapCurrencies } from '../../../../helpers/mappings/map-currencies';

const {
  POLICY_AND_EXPORTS: { CONTRACT_POLICY },
} = FIELD_IDS.INSURANCE;

const {
  REQUESTED_START_DATE,
  SINGLE: { COMPLETION_OF_CONTRACT_DATE, TOTAL_CONTRACT_VALUE },
  CREDIT_PERIOD_WITH_BUYER,
  POLICY_CURRENCY_CODE,
} = CONTRACT_POLICY;

export const PAGE_VARIABLES = {
  FIELDS: {
    REQUESTED_START_DATE: {
      ID: REQUESTED_START_DATE,
      ...FIELDS.CONTRACT_POLICY[REQUESTED_START_DATE],
    },
    COMPLETION_OF_CONTRACT_DATE: {
      ID: COMPLETION_OF_CONTRACT_DATE,
      ...FIELDS.CONTRACT_POLICY.SINGLE[COMPLETION_OF_CONTRACT_DATE],
    },
    TOTAL_CONTRACT_VALUE: {
      ID: TOTAL_CONTRACT_VALUE,
      ...FIELDS.CONTRACT_POLICY.SINGLE[TOTAL_CONTRACT_VALUE],
    },
    CREDIT_PERIOD_WITH_BUYER: {
      ID: CREDIT_PERIOD_WITH_BUYER,
      ...FIELDS.CONTRACT_POLICY[CREDIT_PERIOD_WITH_BUYER],
    },
    POLICY_CURRENCY_CODE: {
      ID: POLICY_CURRENCY_CODE,
      ...FIELDS.CONTRACT_POLICY[POLICY_CURRENCY_CODE],
    },
  },
};

export const TEMPLATE = TEMPLATES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY;

/**
 * get
 * Get the application and render the Single contract policy page
 * @param {Express.Request} Express request
 * @param {Express.Response} Express response
 * @returns {Express.Response.render} Single contract policy page
 */
export const get = async (req: Request, res: Response) => {
  const { referenceNumber } = req.params;

  try {
    const application = await api.keystone.application.get(Number(referenceNumber));

    if (!application) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    try {
      const currencies = await api.external.getCurrencies();

      if (!currencies || !currencies.length) {
        return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
      }

      const mappedCurrencies = mapCurrencies(currencies);

      return res.render(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY_AND_EXPORTS.SINGLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        application,
        currencies: mappedCurrencies,
      });
    } catch (err) {
      console.error('Error getting currencies ', { err });

      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }
  } catch (err) {
    console.error('Error getting application ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};