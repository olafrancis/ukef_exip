import { BUTTONS, COOKIES_CONSENT, FIELDS, FOOTER, PAGES, PRODUCT } from '../../../content-strings';
import { FIELD_IDS, PERCENTAGES_OF_COVER, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import { mapCurrencies } from '../../../helpers/mappings/map-currencies';
import generateValidationErrors from './validation';
import getCurrencyByCode from '../../../helpers/get-currency-by-code';
import mapPercentageOfCover from '../../../helpers/mappings/map-percentage-of-cover';
import mapCreditPeriod from '../../../helpers/mappings/map-credit-period';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import isChangeRoute from '../../../helpers/is-change-route';
import { isSinglePolicyType, isMultiPolicyType } from '../../../helpers/policy-type';
import { Request, Response, SelectOption, TellUsAboutPolicyPageVariables } from '../../../../types';

const { AMOUNT_CURRENCY, CONTRACT_VALUE, CREDIT_PERIOD, CURRENCY, MAX_AMOUNT_OWED, PERCENTAGE_OF_COVER, POLICY_TYPE } = FIELD_IDS;

const generatePageVariables = (policyType: string) => {
  const pageVariables: TellUsAboutPolicyPageVariables = {
    CONTENT_STRINGS: {
      PRODUCT,
      FOOTER,
      BUTTONS,
      COOKIES_CONSENT,
      ...PAGES.TELL_US_ABOUT_YOUR_POLICY_PAGE,
    },
    FIELDS: {
      AMOUNT_CURRENCY: {
        ID: AMOUNT_CURRENCY,
      },
      CURRENCY: {
        ID: CURRENCY,
        ...FIELDS[CURRENCY],
      },
      PERCENTAGE_OF_COVER: {
        ID: PERCENTAGE_OF_COVER,
      },
    },
  };

  const { TELL_US_ABOUT_YOUR_POLICY_PAGE } = PAGES;

  if (isSinglePolicyType(policyType)) {
    pageVariables.CONTENT_STRINGS.PAGE_TITLE = TELL_US_ABOUT_YOUR_POLICY_PAGE.SINGLE_POLICY_PAGE_TITLE;
    pageVariables.CONTENT_STRINGS.HEADING = TELL_US_ABOUT_YOUR_POLICY_PAGE.SINGLE_POLICY_HEADING;

    pageVariables.FIELDS.AMOUNT_CURRENCY = {
      ID: AMOUNT_CURRENCY,
      ...FIELDS[AMOUNT_CURRENCY].SINGLE_POLICY,
    };

    pageVariables.FIELDS.CONTRACT_VALUE = {
      ID: CONTRACT_VALUE,
      ...FIELDS[CONTRACT_VALUE],
    };

    pageVariables.FIELDS.PERCENTAGE_OF_COVER = {
      ID: PERCENTAGE_OF_COVER,
      ...FIELDS[PERCENTAGE_OF_COVER].SINGLE_POLICY,
    };
  }

  if (isMultiPolicyType(policyType)) {
    pageVariables.CONTENT_STRINGS.PAGE_TITLE = TELL_US_ABOUT_YOUR_POLICY_PAGE.MULTI_POLICY_PAGE_TITLE;
    pageVariables.CONTENT_STRINGS.HEADING = TELL_US_ABOUT_YOUR_POLICY_PAGE.MULTI_POLICY_HEADING;

    pageVariables.FIELDS.AMOUNT_CURRENCY = {
      ID: AMOUNT_CURRENCY,
      ...FIELDS[AMOUNT_CURRENCY].MULTI_POLICY,
    };

    pageVariables.FIELDS.MAX_AMOUNT_OWED = {
      ID: MAX_AMOUNT_OWED,
      ...FIELDS[MAX_AMOUNT_OWED],
    };

    pageVariables.FIELDS.PERCENTAGE_OF_COVER = {
      ID: PERCENTAGE_OF_COVER,
      ...FIELDS[PERCENTAGE_OF_COVER].MULTI_POLICY,
    };

    pageVariables.FIELDS.CREDIT_PERIOD = {
      ID: CREDIT_PERIOD,
      ...FIELDS[CREDIT_PERIOD],
    };
  }

  return pageVariables;
};

const get = async (req: Request, res: Response) => {
  const { submittedData } = req.session;
  const currencies = await api.getCurrencies();

  let mappedCurrencies;
  if (submittedData && submittedData[FIELD_IDS.CURRENCY]) {
    mappedCurrencies = mapCurrencies(currencies, submittedData[FIELD_IDS.CURRENCY].isoCode);
  } else {
    mappedCurrencies = mapCurrencies(currencies);
  }

  let mappedPercentageOfCover;

  if (submittedData && submittedData[PERCENTAGE_OF_COVER]) {
    mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER, Number(submittedData[PERCENTAGE_OF_COVER]));
  } else {
    mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER);
  }

  const creditPeriodOptions = FIELDS[FIELD_IDS.CREDIT_PERIOD].OPTIONS as Array<SelectOption>;
  let mappedCreditPeriod;

  if (submittedData && submittedData[CREDIT_PERIOD]) {
    mappedCreditPeriod = mapCreditPeriod(creditPeriodOptions, String(submittedData[CREDIT_PERIOD]));
  } else {
    mappedCreditPeriod = mapCreditPeriod(creditPeriodOptions);
  }

  const PAGE_VARIABLES = generatePageVariables(submittedData[POLICY_TYPE]);

  return res.render(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
    ...PAGE_VARIABLES,
    BACK_LINK: req.headers.referer,
    isSinglePolicyType: isSinglePolicyType(submittedData[POLICY_TYPE]),
    isMultiPolicyType: isMultiPolicyType(submittedData[POLICY_TYPE]),
    currencies: mappedCurrencies,
    percentageOfCover: mappedPercentageOfCover,
    creditPeriod: mappedCreditPeriod,
    submittedValues: submittedData,
  });
};

const post = async (req: Request, res: Response) => {
  const { submittedData } = req.session;

  const validationErrors = generateValidationErrors({
    ...submittedData,
    ...req.body,
  });

  const currencies = await api.getCurrencies();

  const submittedCurrencyCode = req.body[FIELD_IDS.CURRENCY];

  if (validationErrors) {
    // map currencies drop down options
    let mappedCurrencies = [];

    if (submittedCurrencyCode) {
      mappedCurrencies = mapCurrencies(currencies, submittedCurrencyCode);
    } else {
      mappedCurrencies = mapCurrencies(currencies);
    }

    // map percentage of cover drop down options
    let mappedPercentageOfCover = [];
    const submittedPercentageOfCover = req.body[PERCENTAGE_OF_COVER];

    if (submittedPercentageOfCover) {
      mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER, submittedPercentageOfCover);
    } else {
      mappedPercentageOfCover = mapPercentageOfCover(PERCENTAGES_OF_COVER);
    }

    // map credit period drop down options
    let mappedCreditPeriod = [];
    const submittedCreditPeriod = req.body[CREDIT_PERIOD];

    const creditPeriodOptions = FIELDS[FIELD_IDS.CREDIT_PERIOD].OPTIONS as Array<SelectOption>;

    if (submittedCreditPeriod) {
      mappedCreditPeriod = mapCreditPeriod(creditPeriodOptions, submittedCreditPeriod);
    } else {
      mappedCreditPeriod = mapCreditPeriod(creditPeriodOptions);
    }

    const PAGE_VARIABLES = generatePageVariables(submittedData[POLICY_TYPE]);

    return res.render(TEMPLATES.QUOTE.TELL_US_ABOUT_YOUR_POLICY, {
      ...PAGE_VARIABLES,
      BACK_LINK: req.headers.referer,
      isSinglePolicyType: isSinglePolicyType(submittedData[POLICY_TYPE]),
      isMultiPolicyType: isMultiPolicyType(submittedData[POLICY_TYPE]),
      currencies: mappedCurrencies,
      validationErrors,
      percentageOfCover: mappedPercentageOfCover,
      creditPeriod: mappedCreditPeriod,
      submittedValues: req.body,
    });
  }

  const populatedData = {
    ...req.body,
    [FIELD_IDS.CURRENCY]: getCurrencyByCode(currencies, submittedCurrencyCode),
  };

  req.session.submittedData = updateSubmittedData(populatedData, req.session.submittedData);

  if (isChangeRoute(req.originalUrl)) {
    return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
  }

  return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
};

export { generatePageVariables, get, post };
