import { Request, Response } from '../../../../../../types';
import { post } from '.';
import { ROUTES } from '../../../../../constants';
import { mockReq, mockRes, mockApplication } from '../../../../../test-mocks';
import FIELD_IDS from '../../../../../constants/field-ids/insurance/business';
import mapAndSave from '../../map-and-save';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';

const { INSURANCE_ROOT, ALL_SECTIONS, PROBLEM_WITH_SERVICE } = ROUTES.INSURANCE;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;
const { POSITION } = FIELD_IDS.CONTACT;

describe('controllers/insurance/business/contact/save-and-back', () => {
  let req: Request;
  let res: Response;

  let updateMapAndSave = jest.fn(() => Promise.resolve(true));

  beforeEach(() => {
    req = mockReq();
    res = mockRes();

    res.locals.application = mockApplication;

    mapAndSave.contact = updateMapAndSave;
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('post - save and back', () => {
    const validBody = {
      [FIRST_NAME]: 'firstName',
      [LAST_NAME]: 'lastName',
      [EMAIL]: 'test@test.com',
      [POSITION]: 'CEO',
    };

    describe('when there are no validation errors', () => {
      it('should redirect to all sections page', async () => {
        req.body = validBody;

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.contact once', async () => {
        req.body = validBody;

        await post(req, res);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there are validation errors', () => {
      it('should redirect to all sections page', async () => {
        req.body = {
          [FIRST_NAME]: 'firstName',
          [LAST_NAME]: 'lastName',
          [EMAIL]: 'test',
          [POSITION]: 'CEO',
        };

        await post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(`${INSURANCE_ROOT}/${req.params.referenceNumber}${ALL_SECTIONS}`);
      });

      it('should call mapAndSave.contact once', async () => {
        req.body = {
          [FIRST_NAME]: 'firstName',
          [LAST_NAME]: 'lastName',
          [EMAIL]: 'test',
          [POSITION]: 'CEO',
        };

        await post(req, res);

        expect(updateMapAndSave).toHaveBeenCalledTimes(1);
      });
    });

    describe('when there is no application', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });

    describe('when mapAndSave.contact fails', () => {
      beforeEach(() => {
        res.locals = { csrfToken: '1234' };
        updateMapAndSave = jest.fn(() => Promise.reject());
        mapAndSave.contact = updateMapAndSave;
      });

      it(`should redirect to ${PROBLEM_WITH_SERVICE}`, () => {
        post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(PROBLEM_WITH_SERVICE);
      });
    });
  });
});
