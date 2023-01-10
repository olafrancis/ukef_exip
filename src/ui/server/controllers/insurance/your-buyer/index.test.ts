import { mockReq, mockRes, mockApplication, mockCisCountries } from '../../../test-mocks';
import api from '../../../api';
import { Request, Response } from '../../../../types';
import { ROUTES, TEMPLATES } from '../../../constants';
import { get } from '.';
import { mapCountriesSelect } from '../../../helpers/mappings/map-countries-select';
import { PAGES } from '../../../content-strings';
import { FIELDS } from '../../../content-strings/fields/insurance/your-buyer';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';

describe('controllers/insurance/your-buyer/your-buyer-details', () => {
  let req: Request;
  let res: Response;
  let getCountriesSpy = jest.fn(() => Promise.resolve(mockCisCountries));
  const TEMPLATE = TEMPLATES.INSURANCE.YOUR_BUYER.BUYER_BUYER_DETAILS;
  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
    req.params.referenceNumber = String(mockApplication.referenceNumber);
    api.external.getCountries = getCountriesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATE);
    });
  });

  describe('get', () => {
    it('should call api.external.getCountries', async () => {
      await get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedCountries = mapCountriesSelect(mockCisCountries);
      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.YOUR_BUYER_DETAILS,
          BACK_LINK: req.headers.referer,
        }),
        ...FIELDS,
        countries: expectedCountries,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('api error handling', () => {
      describe('when there are no countries returned from the API', () => {
        beforeEach(() => {
          // @ts-ignore
          getCountriesSpy = jest.fn(() => Promise.resolve());
          api.external.getCountries = getCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });

      describe('when there countries response is an empty array', () => {
        beforeEach(() => {
          getCountriesSpy = jest.fn(() => Promise.resolve([]));
          api.external.getCountries = getCountriesSpy;
        });

        it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
