import { PAGE_VARIABLES, get, post } from '.';
import { PAGES, ERROR_MESSAGES } from '../../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../../constants';
import singleInputPageVariables from '../../../../helpers/single-input-page-variables';
import generateValidationErrors from '../../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../../types';
import { mockReq, mockRes } from '../../../../test-mocks';

describe('controllers/insurance/eligibility/exporter-location', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.VALID_EXPORTER_LOCATION,
        PAGE_CONTENT_STRINGS: PAGES.EXPORTER_LOCATION,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(
        TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION,
        singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
      );
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION, {
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer }),
          validationErrors: generateValidationErrors(req.body, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES[PAGE_VARIABLES.FIELD_ID]),
        });
      });
    });

    describe('when submitted answer is false', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_IDS.VALID_EXPORTER_LOCATION]: 'false',
        };
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.CANNOT_APPLY);
      });

      it('should add exitReason to req.flash', async () => {
        await post(req, res);

        const expectedReason = PAGES.CANNOT_APPLY.REASON.UNSUPPORTED_COMPANY_COUNTRY;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.VALID_EXPORTER_LOCATION]: 'true',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it(`should redirect to ${ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.INSURANCE.ELIGIBILITY.UK_GOODS_OR_SERVICES);
      });
    });
  });
});