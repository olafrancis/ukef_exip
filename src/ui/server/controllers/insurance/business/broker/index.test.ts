import { PAGES } from '../../../../content-strings';
import { pageVariables, get, post, TEMPLATE } from '.';
import { TEMPLATES, ROUTES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import { FIELDS } from '../../../../content-strings/fields/insurance/your-business';
import mapAndSave from '../map-and-save';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockBroker } from '../../../../test-mocks';

const { BROKER: BROKER_FIELDS } = FIELDS;

const { USING_BROKER, HEADING, NAME, ADDRESS_LINE_1, ADDRESS_LINE_2, COUNTY, TOWN, POSTCODE, EMAIL, DETAILS } = FIELD_IDS.BROKER;

const { BROKER } = PAGES.INSURANCE.EXPORTER_BUSINESS;
const { BROKER: BROKER_TEMPLATE } = TEMPLATES.INSURANCE.EXPORTER_BUSINESS;

const {
  INSURANCE_ROOT,
  EXPORTER_BUSINESS: EXPORTER_BUSINESS_ROUTES,
  CHECK_YOUR_ANSWERS: { YOUR_BUSINESS: CHECK_AND_CHANGE_ROUTE },
  PROBLEM_WITH_SERVICE,
} = ROUTES.INSURANCE;

const { BROKER_SAVE_AND_BACK, CHECK_YOUR_ANSWERS, BROKER_CHECK_AND_CHANGE } = EXPORTER_BUSINESS_ROUTES;

describe('controllers/insurance/business/broker', () => {
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
      expect(TEMPLATE).toEqual(BROKER_TEMPLATE);
    });
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELDS: {
          USING_BROKER: {
            ID: USING_BROKER,
          },
          HEADING: {
            ID: HEADING,
            ...BROKER_FIELDS[HEADING],
          },
          NAME: {
            ID: NAME,
            ...BROKER_FIELDS[NAME],
          },
          ADDRESS_LINE_1: {
            ID: ADDRESS_LINE_1,
            ...BROKER_FIELDS[ADDRESS_LINE_1],
          },
          ADDRESS_LINE_2: {
            ID: ADDRESS_LINE_2,
            ...BROKER_FIELDS[ADDRESS_LINE_2],
          },
          TOWN: {
            ID: TOWN,
            ...BROKER_FIELDS[TOWN],
          },
          COUNTY: {
            ID: COUNTY,
            ...BROKER_FIELDS[COUNTY],
          },
          POSTCODE: {
            ID: POSTCODE,
            ...BROKER_FIELDS[POSTCODE],
          },
          EMAIL: {
            ID: EMAIL,
            ...BROKER_FIELDS[EMAIL],
          },
          DETAILS: {
            ID: DETAILS,
            ...BROKER_FIELDS[DETAILS],
          },
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${BROKER_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('get', () => {
    describe('when the application exists', () => {
      it('should render the broker template with correct variables', () => {
        res.locals.application = mockApplication;

        get(req, res);

        expect(res.render).toHaveBeenCalledWith(BROKER_TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: BROKER,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplication),
          ...pageVariables(mockApplication.referenceNumber),
        });
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });

  describe('post', () => {
    mapAndSave.broker = jest.fn(() => Promise.resolve(true));

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        req.body = {};

        const submittedValues = {
          [USING_BROKER]: req.body[USING_BROKER],
        };

        await post(req, res);

        const validationErrors = generateValidationErrors(req.body);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: BROKER,
            BACK_LINK: req.headers.referer,
          }),
          userName: getUserNameFromSession(req.session.user),
          ...pageVariables(mockApplication.referenceNumber),
          validationErrors,
          application: mapApplicationToFormFields(mockApplication),
          submittedValues,
        });
      });
    });

    describe('when there are no validation errors', () => {
      it('should redirect to next page', async () => {
        req.body = mockBroker;

        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_YOUR_ANSWERS}`;
        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call mapAndSave.broker once with broker and application', async () => {
        req.body = mockBroker;

        await post(req, res);

        expect(mapAndSave.broker).toHaveBeenCalledTimes(1);

        expect(mapAndSave.broker).toHaveBeenCalledWith(req.body, mockApplication);
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.body = mockBroker;

          req.originalUrl = BROKER_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when application does not exist', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
