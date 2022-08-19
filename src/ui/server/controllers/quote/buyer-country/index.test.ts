import { PAGE_VARIABLES, getBackLink, get, post } from '.';
import { LINKS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import { validation as generateValidationErrors } from './validation';
import isChangeRoute from '../../../helpers/is-change-route';
import getCountryByName from '../../../helpers/get-country-by-name';
import api from '../../../api';
import { mapCountries } from '../../../helpers/mappings/map-countries';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import { mockReq, mockRes, mockAnswers, mockSession } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/buyer-country', () => {
  let req: Request;
  let res: Response;

  const mockCountriesResponse = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
      shortTermCoverAvailabilityDesc: 'No',
      ESRAClasificationDesc: 'Standard risk',
      NBIIssue: 'N',
    },
    {
      marketName: 'Algeria',
      isoCode: 'DZA',
      shortTermCoverAvailabilityDesc: 'Yes',
      ESRAClasificationDesc: 'Standard Risk',
      NBIIssue: 'Y',
    },
    {
      marketName: 'Egypt',
      isoCode: 'EGY',
      shortTermCoverAvailabilityDesc: 'Yes',
      ESRAClasificationDesc: 'Standard Risk',
      NBIIssue: 'N',
    },
  ];

  const countryUnsupported = mockCountriesResponse[0];
  const countrySupportedViaEmailOnly = mockCountriesResponse[2];

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.COUNTRY,
        PAGE_CONTENT_STRINGS: PAGES.BUYER_COUNTRY_PAGE,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('getBackLink', () => {
    describe('when there is no referer', () => {
      it(`should return ${LINKS.EXTERNAL.BEFORE_YOU_START}`, () => {
        const result = getBackLink();

        const expected = LINKS.EXTERNAL.BEFORE_YOU_START;
        expect(result).toEqual(expected);
      });
    });

    describe('when the referer is Check your answers', () => {
      it('should return the referer', () => {
        const result = getBackLink(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);

        const expected = ROUTES.QUOTE.CHECK_YOUR_ANSWERS;
        expect(result).toEqual(expected);
      });
    });

    describe('when the referer is Your quote', () => {
      it('should return the referer', () => {
        const result = getBackLink(ROUTES.QUOTE.YOUR_QUOTE);

        const expected = ROUTES.QUOTE.YOUR_QUOTE;
        expect(result).toEqual(expected);
      });
    });

    describe('when the referer is buyer country without change route', () => {
      it('should return the referer', () => {
        const result = getBackLink(ROUTES.QUOTE.BUYER_COUNTRY);

        const expected = ROUTES.QUOTE.BUYER_COUNTRY;
        expect(result).toEqual(expected);
      });
    });

    it(`should return ${LINKS.EXTERNAL.BEFORE_YOU_START}`, () => {
      const result = getBackLink(LINKS.EXTERNAL.BEFORE_YOU_START);

      const expected = LINKS.EXTERNAL.BEFORE_YOU_START;
      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    const getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      delete req.session.submittedData[FIELD_IDS.BUYER_COUNTRY];
      api.getCountries = getCountriesSpy;
    });

    it('should call api.getCountries', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables(PAGE_VARIABLES),
        BACK_LINK: getBackLink(req.headers.referer),
        HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
        countries: mapCountries(mockCountriesResponse),
        submittedValues: req.session.submittedData,
        isChangeRoute: isChangeRoute(req.originalUrl),
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.BUYER_COUNTRY, expectedVariables);
    });

    describe('when a country has been submitted', () => {
      it('should render template with countries mapped to submitted country', async () => {
        req.session.submittedData = mockSession.submittedData;

        await get(req, res);

        const expectedCountries = mapCountries(mockCountriesResponse, req.session.submittedData[FIELD_IDS.BUYER_COUNTRY].isoCode);

        const expectedVariables = {
          ...singleInputPageVariables(PAGE_VARIABLES),
          BACK_LINK: getBackLink(req.headers.referer),
          HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
          countries: expectedCountries,
          submittedValues: req.session.submittedData,
          isChangeRoute: isChangeRoute(req.originalUrl),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.BUYER_COUNTRY, expectedVariables);
      });
    });
  });

  describe('post', () => {
    const getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      api.getCountries = getCountriesSpy;
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.QUOTE.BUYER_COUNTRY, {
          ...singleInputPageVariables(PAGE_VARIABLES),
          BACK_LINK: getBackLink(req.headers.referer),
          HIDDEN_FIELD_ID: FIELD_IDS.BUYER_COUNTRY,
          countries: mapCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(req.body),
          isChangeRoute: isChangeRoute(req.originalUrl),
        });
      });
    });

    describe('when the submitted country can only get a quote via email', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = countrySupportedViaEmailOnly.marketName;
      });

      it(`should redirect to ${ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.GET_A_QUOTE_BY_EMAIL);
      });
    });

    describe('when the submitted country is not found', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = 'Country not in the mock response';
      });

      it(`should redirect to ${ROUTES.QUOTE.CANNOT_OBTAIN_COVER}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
      });
    });

    describe('when the submitted country is not supported', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.BUYER_COUNTRY] = countryUnsupported.marketName;
      });

      it(`should redirect to ${ROUTES.QUOTE.CANNOT_OBTAIN_COVER}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
      });

      it('should add previousRoute and exitReason to req.flash', async () => {
        await post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.QUOTE.BUYER_COUNTRY);

        const countryName = countryUnsupported.marketName;

        const { CANNOT_OBTAIN_COVER_PAGE } = PAGES;
        const { REASON } = CANNOT_OBTAIN_COVER_PAGE;

        const expectedReason = `${REASON.UNSUPPORTED_BUYER_COUNTRY_1} ${countryName}, ${REASON.UNSUPPORTED_BUYER_COUNTRY_2}`;

        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when the country is supported for an online quote and there are no validation errors', () => {
      const selectedCountryName = mockAnswers[FIELD_IDS.BUYER_COUNTRY];
      const mappedCountries = mapCountries(mockCountriesResponse);

      const selectedCountry = getCountryByName(mappedCountries, selectedCountryName);

      const validBody = {
        [FIELD_IDS.BUYER_COUNTRY]: selectedCountryName,
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data, popluated with country object', async () => {
        await post(req, res);

        const expectedPopulatedData = {
          ...validBody,
          [FIELD_IDS.BUYER_COUNTRY]: {
            name: selectedCountry?.name,
            isoCode: selectedCountry?.isoCode,
            riskCategory: selectedCountry?.riskCategory,
          },
        };

        const expected = updateSubmittedData(expectedPopulatedData, req.session.submittedData);

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.COMPANY_BASED}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.COMPANY_BASED);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = 'mock/change';

          await post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
