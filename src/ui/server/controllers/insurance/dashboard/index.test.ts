import { TEMPLATE, get } from '.';
import { PAGES } from '../../../content-strings';
import { ROUTES, TEMPLATES } from '../../../constants';
import insuranceCorePageVariables from '../../../helpers/page-variables/core/insurance';
import { Request, Response } from '../../../../types';
import api from '../../../api';
import mapApplications from '../../../helpers/mappings/map-applications';
import { mockReq, mockRes, mockApplications } from '../../../test-mocks';

const {
  INSURANCE: { INSURANCE_ROOT, ALL_SECTIONS },
  PROBLEM_WITH_SERVICE,
} = ROUTES;

describe('controllers/insurance/dashboard', () => {
  let req: Request;
  let res: Response;

  let getApplicationsSpy = jest.fn(() => Promise.resolve(mockApplications));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    api.keystone.applications.getAll = getApplicationsSpy;
  });

  describe('TEMPLATE', () => {
    it('should have the correct template defined', () => {
      expect(TEMPLATE).toEqual(TEMPLATES.INSURANCE.DASHBOARD);
    });
  });

  describe('get', () => {
    it('should call api.keystone.applications.getAll', async () => {
      await get(req, res);

      expect(getApplicationsSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await get(req, res);

      const expectedVariables = {
        ...insuranceCorePageVariables({
          PAGE_CONTENT_STRINGS: PAGES.INSURANCE.DASHBOARD,
          BACK_LINK: req.headers.referer,
        }),
        applications: mapApplications(mockApplications),
        ROUTES: {
          INSURANCE_ROOT,
          ALL_SECTIONS,
        },
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATE, expectedVariables);
    });

    describe('api error handling', () => {
      describe('when there is an error', () => {
        beforeAll(() => {
          getApplicationsSpy = jest.fn(() => Promise.reject());
          api.keystone.applications.getAll = getApplicationsSpy;
        });

        it(`should redirect to ${PROBLEM_WITH_SERVICE}`, async () => {
          await get(req, res);

          expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
        });
      });
    });
  });
});
