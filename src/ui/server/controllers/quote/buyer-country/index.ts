import { LINKS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import isPopulatedArray from '../../../helpers/is-populated-array';
import { mapCisCountries } from '../../../helpers/mappings/map-cis-countries';
import singleInputPageVariables from '../../../helpers/page-variables/single-input/quote';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import { validation as generateValidationErrors } from '../../../shared-validation/buyer-country';
import isChangeRoute from '../../../helpers/is-change-route';
import getCountryByName from '../../../helpers/get-country-by-name';
import { canGetAQuoteOnline, canGetAQuoteByEmail, cannotGetAQuote } from '../../../helpers/country-support';
import { updateSubmittedData } from '../../../helpers/update-submitted-data/quote';
import { Request, Response } from '../../../../types';

export const PAGE_VARIABLES = {
  FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
  PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY,
};

export const TEMPLATE = TEMPLATES.SHARED_PAGES.BUYER_COUNTRY;

/**
 * If the user has come from the base root of the application (which redirects to this route)
 * Return the "Before you start" page, which is the original, external URL.
 * An empty base root is required to refresh req.session data.
 * This cannot be done in the first page (Buyer country) because there are scenarios/flows where the data needs to be populated.
 * Otherwise:
 * - if user has come from Check Answers or Quote page page, return the same URL.
 * - if it's Buyer country route, user has submitted the form and has validation errors.
 * @param {string} referer - Previous URL
 * @returns {string}
 */
export const getBackLink = (referer?: string): string => {
  if (!referer) {
    return LINKS.EXTERNAL.BEFORE_YOU_START;
  }

  if (referer.includes(ROUTES.QUOTE.CHECK_YOUR_ANSWERS)) {
    return referer;
  }

  if (referer.includes(ROUTES.QUOTE.YOUR_QUOTE)) {
    return referer;
  }

  if (referer.includes(ROUTES.QUOTE.BUYER_COUNTRY)) {
    return referer;
  }

  return LINKS.EXTERNAL.BEFORE_YOU_START;
};

export const get = async (req: Request, res: Response) => {
  if (!req.session.submittedData || !req.session.submittedData.quoteEligibility) {
    req.session.submittedData = {
      ...req.session.submittedData,
      quoteEligibility: {},
    };
  }

  try {
    const countries = await api.external.getCountries();

    if (!isPopulatedArray(countries)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    let countryValue;

    if (req.session.submittedData.quoteEligibility[FIELD_IDS.BUYER_COUNTRY]) {
      countryValue = req.session.submittedData.quoteEligibility[FIELD_IDS.BUYER_COUNTRY];
    }

    let mappedCountries;

    if (countryValue) {
      mappedCountries = mapCisCountries(countries, countryValue.isoCode);
    } else {
      mappedCountries = mapCisCountries(countries);
    }

    return res.render(TEMPLATE, {
      ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer) }),
      userName: getUserNameFromSession(req.session.user),
      countries: mappedCountries,
      submittedValues: req.session.submittedData?.quoteEligibility,
      isChangeRoute: isChangeRoute(req.originalUrl),
    });
  } catch (err) {
    console.error('Error getting CIS countries ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};

export const post = async (req: Request, res: Response) => {
  try {
    const countries = await api.external.getCountries();

    if (!isPopulatedArray(countries)) {
      return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
    }

    const mappedCountries = mapCisCountries(countries);

    const validationErrors = generateValidationErrors(req.body);

    if (validationErrors) {
      return res.render(TEMPLATE, {
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: getBackLink(req.headers.referer) }),
        userName: getUserNameFromSession(req.session.user),
        countries: mappedCountries,
        validationErrors,
        isChangeRoute: isChangeRoute(req.originalUrl),
      });
    }

    const submittedCountryName = req.body[FIELD_IDS.BUYER_COUNTRY];

    const country = getCountryByName(mappedCountries, submittedCountryName);

    if (!country) {
      return res.redirect(ROUTES.QUOTE.CANNOT_APPLY);
    }

    if (canGetAQuoteOnline(country)) {
      const populatedData = {
        ...req.body,
        [FIELD_IDS.BUYER_COUNTRY]: {
          name: country.name,
          isoCode: country.isoCode,
          riskCategory: country.riskCategory,
        },
      };

      req.session.submittedData.quoteEligibility = updateSubmittedData(populatedData, req.session.submittedData.quoteEligibility);

      if (isChangeRoute(req.originalUrl)) {
        return res.redirect(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
      }

      return res.redirect(ROUTES.QUOTE.BUYER_BODY);
    }

    if (canGetAQuoteByEmail(country)) {
      req.flash('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

      const { GET_A_QUOTE_BY_EMAIL } = PAGES.QUOTE;
      const { REASON } = GET_A_QUOTE_BY_EMAIL;

      req.flash('exitReason', REASON.BUYER_COUNTRY);
      req.flash('exitDescription', REASON.BUYER_COUNTRY_DESCRIPTION);

      return res.redirect(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
    }

    if (cannotGetAQuote(country)) {
      req.flash('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

      const { CANNOT_APPLY } = PAGES;
      const { REASON } = CANNOT_APPLY;

      const reason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${country.name}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

      req.flash('exitReason', reason);

      return res.redirect(ROUTES.QUOTE.CANNOT_APPLY);
    }
  } catch (err) {
    console.error('Error getting CIS countries ', { err });

    return res.redirect(ROUTES.PROBLEM_WITH_SERVICE);
  }
};
