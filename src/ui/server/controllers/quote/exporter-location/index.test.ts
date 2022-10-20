import { PAGE_VARIABLES, get, post } from '.';
import { PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/single-input-page-variables';
import generateValidationErrors from '../../../shared-validation/exporter-location';
import { updateSubmittedData } from '../../../helpers/update-submitted-data';
import { mockReq, mockRes } from '../../../test-mocks';
import { Request, Response } from '../../../../types';

describe('controllers/quote/exporter-location', () => {
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

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION, {
        ...singleInputPageVariables(PAGE_VARIABLES),
        BACK_LINK: req.headers.referer,
        submittedValues: req.session.submittedData,
      });
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.SHARED_PAGES.EXPORTER_LOCATION, {
          ...singleInputPageVariables(PAGE_VARIABLES),
          BACK_LINK: req.headers.referer,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when submitted answer is false', () => {
      beforeEach(() => {
        req.body = {
          [FIELD_IDS.VALID_EXPORTER_LOCATION]: 'false',
        };
      });

      it(`should redirect to ${ROUTES.QUOTE.CANNOT_OBTAIN_COVER}`, async () => {
        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CANNOT_OBTAIN_COVER);
      });

      it('should add previousRoute and exitReason to req.flash', async () => {
        await post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.QUOTE.EXPORTER_LOCATION);

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

      it('should update the session with submitted data', () => {
        post(req, res);

        const expected = updateSubmittedData(req.body, req.session.submittedData);

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.QUOTE.UK_GOODS_OR_SERVICES}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.UK_GOODS_OR_SERVICES);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${ROUTES.QUOTE.CHECK_YOUR_ANSWERS}`, () => {
          req.originalUrl = 'mock/change';

          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.QUOTE.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
