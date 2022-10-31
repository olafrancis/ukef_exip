import { PAGE_VARIABLES, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/single-input-page-variables';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

describe('controllers/insurance/eligibility/companies-house-number', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER,
        PAGE_CONTENT_STRINGS: PAGES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(
        TEMPLATES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER,
        singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
      );
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
          validationErrors: generateValidationErrors(req.body, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES.INSURANCE.ELIGIBILITY[PAGE_VARIABLES.FIELD_ID].IS_EMPTY),
        });
      });
    });

    describe('when submitted answer is false', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER]: 'false',
        };
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE);
      });

      it('should add exitReason to req.flash', async () => {
        await post(req, res);

        const expectedReason = PAGES.INSURANCE.ELIGIBILITY.APPLY_OFFLINE.REASON.NO_COMPANIES_HOUSE_NUMBER;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.INSURANCE.ELIGIBILITY.COMPANIES_HOUSE_NUMBER]: 'true',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.ELIGIBLE_TO_APPLY_ONLINE);
      });
    });
  });
});
