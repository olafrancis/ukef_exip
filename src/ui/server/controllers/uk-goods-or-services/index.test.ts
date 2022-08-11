import { PAGE_VARIABLES, get, post } from '.';
import { PAGES } from '../../content-strings';
import { FIELD_IDS, ROUTES, TEMPLATES } from '../../constants';
import singleInputPageVariables from '../../helpers/single-input-page-variables';
import generateValidationErrors from './validation';
import { updateSubmittedData } from '../../helpers/update-submitted-data';
import { mockReq, mockRes } from '../../test-mocks';
import { Request, Response } from '../../../types';

describe('controllers/uk-goods-or-services', () => {
  let req: Request;
  let res: Response;

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES,
        PAGE_CONTENT_STRINGS: PAGES.HAS_MINIMUM_UK_GOODS_OR_SERVICES_PAGE,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, {
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

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.HAS_MINIMUM_UK_GOODS_OR_SERVICES, {
          ...singleInputPageVariables(PAGE_VARIABLES),
          BACK_LINK: req.headers.referer,
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when the submitted answer is `false`', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES] = 'false';
      });

      it(`should redirect to ${ROUTES.CANNOT_OBTAIN_COVER}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.CANNOT_OBTAIN_COVER);
      });

      it('should add previousRoute and exitReason to req.flash', () => {
        post(req, res);

        expect(req.flash).toHaveBeenCalledWith('previousRoute', ROUTES.HAS_MINIMUM_UK_GOODS_OR_SERVICES);

        const expectedReason = PAGES.CANNOT_OBTAIN_COVER_PAGE.REASON.NOT_ENOUGH_HAS_MINIMUM_UK_GOODS_OR_SERVICES;
        expect(req.flash).toHaveBeenCalledWith('exitReason', expectedReason);
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.HAS_MINIMUM_UK_GOODS_OR_SERVICES]: 'true',
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data', () => {
        post(req, res);

        const expected = updateSubmittedData(req.body, req.session.submittedData);

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.POLICY_TYPE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.POLICY_TYPE);
      });

      describe("when the url's last substring is `change`", () => {
        it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
          req.originalUrl = 'mock/change';

          post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});