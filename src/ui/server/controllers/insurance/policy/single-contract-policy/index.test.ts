import { getDate, getMonth, getYear } from 'date-fns';
import { pageVariables, TEMPLATE, FIELD_IDS, get, post } from '.';
import { ROUTES, TEMPLATES } from '../../../../constants';
import POLICY_FIELD_IDS from '../../../../constants/field-ids/insurance/policy';
import { PAGES } from '../../../../content-strings';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import getUserNameFromSession from '../../../../helpers/get-user-name-from-session';
import constructPayload from '../../../../helpers/construct-payload';
import api from '../../../../api';
import { mapCurrencies } from '../../../../helpers/mappings/map-currencies';
import mapApplicationToFormFields from '../../../../helpers/mappings/map-application-to-form-fields';
import generateValidationErrors from './validation';
import mapAndSave from '../map-and-save/policy';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes, mockApplication, mockCurrencies } from '../../../../test-mocks';

const {
  INSURANCE: {
    INSURANCE_ROOT,
    POLICY: { SINGLE_CONTRACT_POLICY_SAVE_AND_BACK, ABOUT_GOODS_OR_SERVICES, CHECK_YOUR_ANSWERS },
    CHECK_YOUR_ANSWERS: { TYPE_OF_POLICY: CHECK_AND_CHANGE_ROUTE },
    PROBLEM_WITH_SERVICE,
  },
} = ROUTES;

const {
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    REQUESTED_START_DATE_DAY,
    REQUESTED_START_DATE_MONTH,
    REQUESTED_START_DATE_YEAR,
    SINGLE: { CONTRACT_COMPLETION_DATE, CONTRACT_COMPLETION_DATE_DAY, CONTRACT_COMPLETION_DATE_MONTH, CONTRACT_COMPLETION_DATE_YEAR, TOTAL_CONTRACT_VALUE },
    CREDIT_PERIOD_WITH_BUYER,
    POLICY_CURRENCY_CODE,
  },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/single-contract-policy', () => {
  let req: Request;
  let res: Response;
  let refNumber: number;

  jest.mock('../save-data/policy');

  mapAndSave.policy = jest.fn(() => Promise.resolve(true));
  let getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));

  const mockApplicationWithoutCurrencyCode = {
    ...mockApplication,
    policy: {
      ...mockApplication.policy,
      [POLICY_CURRENCY_CODE]: null,
    },
  };

  const currencyCode = mockCurrencies[0].isoCode;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplicationWithoutCurrencyCode;

    req.params.referenceNumber = String(mockApplication.referenceNumber);
    refNumber = Number(mockApplication.referenceNumber);
    api.external.getCurrencies = getCurrenciesSpy;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(refNumber);

      const expected = {
        FIELDS: {
          REQUESTED_START_DATE: {
            ID: REQUESTED_START_DATE,
            ...FIELDS.CONTRACT_POLICY[REQUESTED_START_DATE],
          },
          CONTRACT_COMPLETION_DATE: {
            ID: CONTRACT_COMPLETION_DATE,
            ...FIELDS.CONTRACT_POLICY.SINGLE[CONTRACT_COMPLETION_DATE],
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
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${req.params.referenceNumber}${SINGLE_CONTRACT_POLICY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY);
    });
  });

  describe('FIELD_IDS', () => {
    it('should have the correct FIELD_IDS', () => {
      const expected = [
        REQUESTED_START_DATE_DAY,
        REQUESTED_START_DATE_MONTH,
        REQUESTED_START_DATE_YEAR,
        CONTRACT_COMPLETION_DATE_DAY,
        CONTRACT_COMPLETION_DATE_MONTH,
        CONTRACT_COMPLETION_DATE_YEAR,
        TOTAL_CONTRACT_VALUE,
        CREDIT_PERIOD_WITH_BUYER,
        POLICY_CURRENCY_CODE,
      ];

      expect(FIELD_IDS).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should call api.external.getCurrencies', async () => {
      await get(req, res);

      expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedCurrencies = mapCurrencies(mockCurrencies);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(refNumber),
        userName: getUserNameFromSession(req.session.user),
        application: mapApplicationToFormFields(mockApplicationWithoutCurrencyCode),
        currencies: expectedCurrencies,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when a policy currency code has been previously submitted', () => {
      const mockApplicationWithCurrencyCode = {
        ...mockApplication,
        policy: {
          ...mockApplication.policy,
          [POLICY_CURRENCY_CODE]: mockCurrencies[0].isoCode,
        },
      };

      beforeEach(() => {
        res.locals.application = mockApplicationWithCurrencyCode;
      });

      it('should render template with currencies mapped to submitted currency', async () => {
        await get(req, res);

        const expectedCurrencies = mapCurrencies(mockCurrencies, mockApplicationWithCurrencyCode.policy[POLICY_CURRENCY_CODE]);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplicationWithCurrencyCode),
          currencies: expectedCurrencies,
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when the get currencies API call fails', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.reject(new Error('mock')));
          api.external.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });

      describe('when the get currencies response does not return a populated array', () => {
        beforeEach(() => {
          getCurrenciesSpy = jest.fn(() => Promise.resolve([]));
          api.external.getCurrencies = getCurrenciesSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    beforeEach(() => {
      getCurrenciesSpy = jest.fn(() => Promise.resolve(mockCurrencies));
      api.external.getCurrencies = getCurrenciesSpy;
    });

    const date = new Date();

    // Add 1 day
    const initFutureDate = new Date(date.setDate(date.getDate() + 1));

    const validBody = {
      [`${REQUESTED_START_DATE}-day`]: getDate(initFutureDate),
      [`${REQUESTED_START_DATE}-month`]: getMonth(initFutureDate),
      [`${REQUESTED_START_DATE}-year`]: getYear(initFutureDate) + 1,
      [`${CONTRACT_COMPLETION_DATE}-day`]: getDate(initFutureDate),
      [`${CONTRACT_COMPLETION_DATE}-month`]: getMonth(initFutureDate),
      [`${CONTRACT_COMPLETION_DATE}-year`]: getYear(initFutureDate) + 2,
      [TOTAL_CONTRACT_VALUE]: '150000',
      [CREDIT_PERIOD_WITH_BUYER]: 'Mock text',
      [POLICY_CURRENCY_CODE]: mockCurrencies[0].isoCode,
    };

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call mapAndSave.policy with data from constructPayload function and application', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        expect(mapAndSave.policy).toHaveBeenCalledTimes(1);

        expect(mapAndSave.policy).toHaveBeenCalledWith(payload, res.locals.application);
      });

      it(`should redirect to ${ABOUT_GOODS_OR_SERVICES}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ABOUT_GOODS_OR_SERVICES}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${CHECK_YOUR_ANSWERS}`, async () => {
          req.originalUrl = ROUTES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_YOUR_ANSWERS}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });

      describe("when the url's last substring is `check-and-change`", () => {
        it(`should redirect to ${CHECK_AND_CHANGE_ROUTE}`, async () => {
          req.originalUrl = ROUTES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY_CHECK_AND_CHANGE;

          await post(req, res);

          const expected = `${INSURANCE_ROOT}/${refNumber}${CHECK_AND_CHANGE_ROUTE}`;

          expect(res.redirect).toHaveBeenCalledWith(expected);
        });
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.external.getCurrencies', async () => {
        await get(req, res);

        expect(getCurrenciesSpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors', async () => {
        await post(req, res);

        const payload = constructPayload(req.body, FIELD_IDS);

        const expectedCurrencies = mapCurrencies(mockCurrencies);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(refNumber),
          userName: getUserNameFromSession(req.session.user),
          application: mapApplicationToFormFields(mockApplicationWithoutCurrencyCode),
          submittedValues: payload,
          currencies: expectedCurrencies,
          validationErrors: generateValidationErrors(payload),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });

      describe('when a policy currency code is submitted', () => {
        const mockFormBody = {
          [POLICY_CURRENCY_CODE]: currencyCode,
        };

        beforeEach(() => {
          req.body = mockFormBody;
        });

        it('should render template with currencies mapped to submitted currency', async () => {
          await post(req, res);

          const payload = constructPayload(req.body, FIELD_IDS);

          const expectedCurrencies = mapCurrencies(mockCurrencies, currencyCode);

          const expectedVariables = {
            ...insuranceCorePageVariables({
              PAGE_CONTENT_STRINGS: PAGES.INSURANCE.POLICY.SINGLE_CONTRACT_POLICY,
              BACK_LINK: req.headers.referer,
            }),
            ...pageVariables(refNumber),
            userName: getUserNameFromSession(req.session.user),
            application: mapApplicationToFormFields(mockApplicationWithoutCurrencyCode),
            submittedValues: payload,
            currencies: expectedCurrencies,
            validationErrors: generateValidationErrors(payload),
          };

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
        });
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        delete res.locals.application;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('get currencies call', () => {
        describe('when the get currencies API call fails', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.reject(new Error('mock')));
            api.external.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the get currencies response does not return a populated array', () => {
          beforeEach(() => {
            getCurrenciesSpy = jest.fn(() => Promise.resolve([]));
            api.external.getCurrencies = getCurrenciesSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('mapAndSave.policy call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when no application is returned', () => {
          beforeEach(() => {
            const savePolicyDataSpy = jest.fn(() => Promise.resolve(false));

            mapAndSave.policy = savePolicyDataSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const savePolicyDataSpy = jest.fn(() => Promise.reject(new Error('mock')));

            mapAndSave.policy = savePolicyDataSpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
