import { PAGE_VARIABLES, TEMPLATE, get, post } from '.';
import { ERROR_MESSAGES, FIELDS, PAGES } from '../../../content-strings';
import { FIELD_IDS, FIELD_VALUES, ROUTES, TEMPLATES } from '../../../constants';
import singleInputPageVariables from '../../../helpers/page-variables/single-input';
import getUserNameFromSession from '../../../helpers/get-user-name-from-session';
import generateValidationErrors from '../../../shared-validation/yes-no-radios-form';
import { Request, Response } from '../../../../types';
import { mockReq, mockRes } from '../../../test-mocks';

describe('controllers/root/cookies', () => {
  let req: Request;
  let res: Response;

  const mockFlash = jest.fn();

  beforeEach(() => {
    req = mockReq();
    req.flash = mockFlash;

    res = mockRes();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_ID: FIELD_IDS.OPTIONAL_COOKIES,
        PAGE_CONTENT_STRINGS: PAGES.COOKIES_PAGE,
      };

      expect(PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.COOKIES);
    });
  });

  describe('get', () => {
    it('should render template', () => {
      get(req, res);

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
        userName: getUserNameFromSession(req.session.user),
        ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
        FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
        submittedValue: req.cookies.optionalCookies,
      });
    });

    it('should store the previous URL in req.flash', () => {
      get(req, res);

      expect(mockFlash).toHaveBeenCalledTimes(1);

      expect(mockFlash.mock.calls[0]).toEqual(['previousUrl', req.headers.referer]);
    });
  });

  describe('post', () => {
    describe('when there are validation errors', () => {
      it('should render template with validation errors and submittedValue', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          userName: getUserNameFromSession(req.session.user),
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
          FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
          validationErrors: generateValidationErrors(req.body, PAGE_VARIABLES.FIELD_ID, ERROR_MESSAGES[PAGE_VARIABLES.FIELD_ID]),
        });
      });
    });

    describe('when there are no validation errors', () => {
      beforeEach(() => {
        req.body[FIELD_IDS.OPTIONAL_COOKIES] = FIELD_VALUES.OPTIONAL_COOKIES.ACCEPT;
        req.cookies.optionalCookies = 'true';
      });

      it('should render template with flags and submittedValue', () => {
        post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
          userName: getUserNameFromSession(req.session.user),
          ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: req.headers.referer, ORIGINAL_URL: req.originalUrl }),
          FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
          submittedValue: req.cookies.optionalCookies,
          showSuccessMessage: true,
          showSuccessMessageGoBackLink: undefined,
        });
      });

      describe(`when req.flash('previousUrl') does NOT include ${ROUTES.COOKIES}`, () => {
        const mockPreviousUrl = '/mock';

        beforeEach(() => {
          req.headers.referer = mockPreviousUrl;

          req.flash = (property: string) => {
            const obj = {
              previousUrl: [mockPreviousUrl],
            };

            return obj[property];
          };
        });

        it('should render template with showSuccessMessageGoBackLink flag as true', async () => {
          await post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            userName: getUserNameFromSession(req.session.user),
            ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: mockPreviousUrl, ORIGINAL_URL: req.originalUrl }),
            FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
            submittedValue: req.cookies.optionalCookies,
            showSuccessMessage: true,
            showSuccessMessageGoBackLink: true,
          });
        });
      });

      describe(`when req.flash('previousUrl') includes ${ROUTES.COOKIES}`, () => {
        const mockPreviousUrl = ROUTES.COOKIES;

        beforeEach(() => {
          req.headers.referer = mockPreviousUrl;

          req.flash = (property: string) => {
            const obj = {
              previousUrl: [mockPreviousUrl],
            };

            return obj[property];
          };
        });

        it('should render template with showSuccessMessageGoBackLink flag as false', () => {
          req.flash('previousUrl', ROUTES.COOKIES);

          post(req, res);

          expect(res.render).toHaveBeenCalledWith(TEMPLATE, {
            userName: getUserNameFromSession(req.session.user),
            ...singleInputPageVariables({ ...PAGE_VARIABLES, BACK_LINK: ROUTES.COOKIES, ORIGINAL_URL: req.originalUrl }),
            FIELD: FIELDS[FIELD_IDS.OPTIONAL_COOKIES],
            submittedValue: req.cookies.optionalCookies,
            showSuccessMessage: true,
            showSuccessMessageGoBackLink: false,
          });
        });
      });
    });
  });
});
