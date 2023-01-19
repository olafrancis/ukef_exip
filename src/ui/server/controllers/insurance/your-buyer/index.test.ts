import { get, post, PAGE_VARIABLES, TEMPLATE } from '.';
import { PAGES } from '../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../content-strings/fields/insurance';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import api from '../../../api';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import mapCountries from '../../../helpers/mappings/map-countries';
import yourBuyerDetailsValidation from './validation';
import { mockReq, mockRes, mockApplication, mockCountries } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

const {
  YOUR_BUYER: { COMPANY_OR_ORGANISATION },
} = FIELD_IDS.INSURANCE;

const { NAME, ADDRESS, COUNTRY } = COMPANY_OR_ORGANISATION;

describe('controllers/insurance/your-buyer', () => {
  let req: Request;
  let res: Response;
  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
    api.keystone.countries.getAll = getCountriesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          NAME: {
            ID: NAME,
            ...FIELDS.COMPANY_OR_ORGANISATION[NAME],
          },
          ADDRESS: {
            ID: ADDRESS,
            ...FIELDS.COMPANY_OR_ORGANISATION[ADDRESS],
          },
          COUNTRY: {
            ID: COUNTRY,
            ...FIELDS.COMPANY_OR_ORGANISATION[COUNTRY],
          },
        },
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION);
    });
  });

  describe('get', () => {
    it('should call api.keystone.countries.getAll', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedCountries = mapCountries(mockCountries);
      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
        countries: expectedCountries,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('api error handling', () => {
      describe('when there are no countries returned from the API', () => {
        beforeEach(() => {
          // @ts-ignore
          getCountriesSpy = jest.fn(() => Promise.resolve());
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there countries response is an empty array', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.keystone.countries.getAll = getCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    beforeEach(() => {
      getCountriesSpy = jest.fn(() => Promise.resolve(mockCountries));
      api.keystone.countries.getAll = getCountriesSpy;
    });

    const validBody = {
      [NAME]: 'Mock',
      [ADDRESS]: 'Mock free text',
      [COUNTRY]: mockCountries[0].isoCode,
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should redirect to needs_to_redirect_at_do_you_need_broker', async () => {
        await post(req, res);
        const expected = '/needs_to_redirect_at_do_you_need_broker';

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.countries', async () => {
        await get(req, res);

        expect(getCountriesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors', async () => {
        await post(req, res);

        const expectedCountries = mapCountries(mockCountries);
        const validationErrors = yourBuyerDetailsValidation(req.body);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER.COMPANY_OR_ORGANISATION,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          submittedValues: req.body,
          countries: expectedCountries,
          validationErrors,
        };
        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });
  });
});
