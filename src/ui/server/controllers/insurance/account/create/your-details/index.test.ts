import { PAGE_VARIABLES, TEMPLATE, PAGE_CONTENT_STRINGS, get, post } from '.';
import { PAGES } from '../../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../../constants';
import { ACCOUNT_FIELDS as FIELDS } from '../../../../../content-strings/fields/insurance/account';
import insuranceCorePageVariables from '../../../../../helpers/page-variables/core/insurance';
import generateValidationErrors from './validation';
import saveData from './save-data';
import { Request, Response } from '../../../../../../types';
import { mockReq, mockRes, mockAccount } from '../../../../../test-mocks';

const {
  ACCOUNT: { FIRST_NAME, LAST_NAME, EMAIL, PASSWORD },
} = FIELD_IDS.INSURANCE;

const {
  INSURANCE: {
    ACCOUNT: {
      CREATE: { CONFIRM_EMAIL },
      SIGN_IN,
    },
  },
} = ROUTES;

describe('controllers/insurance/account/create/your-details', () => {
  let req: Request;
  let res: Response;

  jest.mock('./save-data');

  saveData.account = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELDS: {
          FIRST_NAME: {
            ID: FIRST_NAME,
            ...FIELDS.CREATE.YOUR_DETAILS[FIRST_NAME],
          },
          LAST_NAME: {
            ID: LAST_NAME,
            ...FIELDS.CREATE.YOUR_DETAILS[LAST_NAME],
          },
          EMAIL: {
            ID: EMAIL,
            ...FIELDS.CREATE.YOUR_DETAILS[EMAIL],
          },
          PASSWORD: {
            ID: PASSWORD,
            ...FIELDS.CREATE.YOUR_DETAILS[PASSWORD],
          },
        },
        SIGN_IN_LINK: SIGN_IN.ROOT,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS);
    });
  });

  describe('PAGE_CONTENT_STRINGS', () => {
    it('should have the correct strings', () => {
      expect(PAGE_CONTENT_STRINGS).toEqual(PAGES.INSURANCE.ACCOUNT.CREATE.YOUR_DETAILS);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS,
          BACK_LINK: req.headers.referer,
        }),
        ...PAGE_VARIABLES,
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [FIRST_NAME]: mockAccount.firstName,
      [LAST_NAME]: mockAccount.lastName,
      [EMAIL]: mockAccount.email,
      [PASSWORD]: mockAccount.password,
    };

    describe('when there are validation errors', () => {
      it('should render template with validation errors and submitted values', async () => {
        await post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS,
            BACK_LINK: req.headers.referer,
          }),
          ...PAGE_VARIABLES,
          submittedValues: req.body,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it('should call saveData.account with req.body', async () => {
        await post(req, res);

        expect(saveData.account).toHaveBeenCalledTimes(1);

        expect(saveData.account).toHaveBeenCalledWith(req.body);
      });

      it('should add the submitted email to req.session.emailAddressToConfirm', async () => {
        await post(req, res);

        expect(req.session.emailAddressToConfirm).toEqual(validBody[EMAIL]);
      });

      it(`should redirect to ${CONFIRM_EMAIL}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(CONFIRM_EMAIL);
      });
    });

    describe('api error handling', () => {
      describe('saveData.account call', () => {
        beforeEach(() => {
          req.body = validBody;
        });

        describe('when no application is returned', () => {
          beforeEach(() => {
            const saveDataSpy = jest.fn(() => Promise.resolve(false));

            saveData.account = saveDataSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });

        describe('when there is an error', () => {
          beforeEach(() => {
            const saveDataSpy = jest.fn(() => Promise.reject(new Error('Mock error')));

            saveData.account = saveDataSpy;
          });

          it(`should redirect to ${ROUTES.PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE);
          });
        });
      });
    });
  });
});
