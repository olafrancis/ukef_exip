import { pageVariables, TEMPLATE, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, TEMPLATES, ROUTES } from '../../../../constants';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance/declarations';
import insuranceCorePageVariables from '../../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../../types';
import api from '../../../../api';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import save from './save-data';
import { mockReq, mockRes, mockApplication, mockDeclarations } from '../../../../test-mocks';

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_CONFIDENTIALITY;

const { INSURANCE, PROBLEM_WITH_SERVICE } = ROUTES;

const {
  INSURANCE_ROOT,
  DECLARATIONS: { CONFIDENTIALITY_SAVE_AND_BACK, ANTI_BRIBERY },
} = INSURANCE;

describe('controllers/insurance/declarations/confidentiality', () => {
  jest.mock('./save-data');

  let mockSaveDeclaration = jest.fn(() => Promise.resolve({}));

  save.declaration = mockSaveDeclaration;

  let req: Request;
  let res: Response;

  let getLatestConfidentialitySpy = jest.fn(() => Promise.resolve(mockDeclarations.confidentiality));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    api.keystone.application.declarations.getLatestConfidentiality = getLatestConfidentialitySpy;
  });

  describe('pageVariables', () => {
    it('should have correct properties', () => {
      const result = pageVariables(mockApplication.referenceNumber);

      const expected = {
        FIELD: {
          ID: FIELD_ID,
          ...FIELDS[FIELD_ID],
        },
        SAVE_AND_BACK_URL: `${INSURANCE_ROOT}/${mockApplication.referenceNumber}${CONFIDENTIALITY_SAVE_AND_BACK}`,
      };

      expect(result).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.DECLARATIONS.CONFIDENTIALITY);
    });
  });

  describe('get', () => {
    it('should call api.keystone.application.declarations.getLatestConfidentiality', async () => {
      await get(req, res);

      expect(getLatestConfidentialitySpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY,
          BACK_LINK: req.headers.referer,
        }),
        ...pageVariables(mockApplication.referenceNumber),
        content: mockDeclarations.confidentiality.content.document,
        application: res.locals.application,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await get(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeAll(() => {
          getLatestConfidentialitySpy = jest.fn(() => Promise.reject());
          api.keystone.application.declarations.getLatestConfidentiality = getLatestConfidentialitySpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });

  describe('post', () => {
    const validBody = {
      [FIELD_ID]: 'true',
    };

    beforeEach(() => {
      getLatestConfidentialitySpy = jest.fn(() => Promise.resolve(mockDeclarations.confidentiality));

      api.keystone.application.declarations.getLatestConfidentiality = getLatestConfidentialitySpy;
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to ${ANTI_BRIBERY}`, async () => {
        await post(req, res);

        const expected = `${INSURANCE_ROOT}/${req.params.referenceNumber}${ANTI_BRIBERY}`;

        expect(res.redirect).toHaveBeenCalledWith(expected);
      });

      it('should call save.declaration with application and req.body', async () => {
        await post(req, res);

        expect(save.declaration).toHaveBeenCalledTimes(1);
        expect(save.declaration).toHaveBeenCalledWith(mockApplication, validBody);
      });
    });

    describe('when there are validation errors', () => {
      it('should call api.keystone.application.declarations.getLatestConfidentiality', async () => {
        await post(req, res);

        expect(getLatestConfidentialitySpy).toHaveBeenCalledTimes(1);
      });

      it('should render template with validation errors', async () => {
        await post(req, res);

        const expectedVariables = {
          ...insuranceCorePageVariables({
            PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DECLARATIONS.CONFIDENTIALITY,
            BACK_LINK: req.headers.referer,
          }),
          ...pageVariables(mockApplication.referenceNumber),
          content: mockDeclarations.confidentiality.content.document,
          validationErrors: generateValidationErrors(req.body, FIELD_ID, ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY),
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('api error handling', () => {
      describe('get countries call', () => {
        describe('when the get countries API call fails', () => {
          beforeEach(() => {
            getLatestConfidentialitySpy = jest.fn(() => Promise.reject());
            api.keystone.application.declarations.getLatestConfidentiality = getLatestConfidentialitySpy;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });
      });

      describe('save data call', () => {
        describe('when the save data API call does not return anything', () => {
          beforeEach(() => {
            mockSaveDeclaration = jest.fn(() => Promise.resolve(false));
            save.declaration = mockSaveDeclaration;

            req.body = validBody;
          });

          it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
            await post(req, res);

            expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
          });
        });

        describe('when the save data API call fails', () => {
          beforeEach(() => {
            mockSaveDeclaration = jest.fn(() => Promise.reject());
            save.declaration = mockSaveDeclaration;

            req.body = validBody;
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
