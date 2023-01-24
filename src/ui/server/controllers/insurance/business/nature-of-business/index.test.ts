import { PAGES } from '../../../../content-strings';
import { pageVariables, get, TEMPLATE, post } from '.';
import { Request, Response, Application } from '../../../../../types';
import { TEMPLATES, ROUTES, FIELD_IDS } from '../../../../constants';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import { mockReq, mockRes, mockApplication } from '../../../../test-mocks';

const { EXPORTER_BUSINESS } = FIELD_IDS.INSURANCE;
const { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK } = EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS;

const { NATURE_OF_YOUR_BUSINESS } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { NAURE_OF_YOUR_BUSINESS: NAURE_OF_YOUR_BUSINESS_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const { INSURANCE_ROOT, EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES } = ROUTES.INSURANCE;

const { NATURE_OF_BUSINESS_ROOT, TURNOVER_ROOT } = EXPORTER_BUSINESS_ROUTES;

const { NATURE_OF_YOUR_BUSINESS: NATURE_OF_YOUR_BUSINESS_FIELDS } = FIELDS;

describe('controllers/insurance/business/nature-of-business', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(NAURE_OF_YOUR_BUSINESS_TEMPLATE);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELDS: {
          GOODS_OR_SERVICES: {
            ID: GOODS_OR_SERVICES,
            ...NATURE_OF_YOUR_BUSINESS_FIELDS[GOODS_OR_SERVICES],
          },
          YEARS_EXPORTING: {
            ID: YEARS_EXPORTING,
            ...NATURE_OF_YOUR_BUSINESS_FIELDS[YEARS_EXPORTING],
          },
          EMPLOYEES_UK: {
            ID: EMPLOYEES_UK,
            ...NATURE_OF_YOUR_BUSINESS_FIELDS[EMPLOYEES_UK],
          },
          EMPLOYEES_INTERNATIONAL: {
            ID: EMPLOYEES_INTERNATIONAL,
            ...NATURE_OF_YOUR_BUSINESS_FIELDS[EMPLOYEES_INTERNATIONAL],
          },
        },
        POST_ROUTES: {
          NATURE_OF_BUSINESS: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${NATURE_OF_BUSINESS_ROOT}`,
          SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}`,
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    describe('when the application exists', () => {
      it('should render the nature-of-business template with correct variables', () => {
        const mockApplicationNoData = {
          ...mockApplication,
        } as Application;

        res.locals.application = mockApplicationNoData;

        get(req, res);

        expect(res.render).toHaveBeenCalledWith(NAURE_OF_YOUR_BUSINESS_TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplicationNoData.referenceNumber),
        });
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        req.body = {};

        const submittedValues = {
          [GOODS_OR_SERVICES]: req.body[GOODS_OR_SERVICES],
        };

        await post(req, res);

        const validationErrors = generateValidationErrors(req.body);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: NATURE_OF_YOUR_BUSINESS,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          submittedValues,
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = {
          [GOODS_OR_SERVICES]: 'test',
          [YEARS_EXPORTING]: '5',
          [EMPLOYEES_UK]: '3',
          [EMPLOYEES_INTERNATIONAL]: '25',
        };

        await post(req, res);

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(TURNOVER_ROOT);
      });
    });

    describe('when application does not exist', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
      });
    });
  });
});