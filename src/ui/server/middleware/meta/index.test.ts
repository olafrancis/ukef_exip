import { mockNext, mockReq, mockRes } from '../../test-mocks';
import { Request, Response } from '../../../types';
import { meta } from '.';
import { PRODUCT } from '../../content-strings';

const req: Request = mockReq();
const res: Response = mockRes();
const next = mockNext;

describe('meta-data middleware unit test cases', () => {
  it('should have all the properties in res.locals.meta object', () => {
    meta(req, res, next);
    expect(res.locals.meta).toEqual({
      url: `${req.hostname}${req.originalUrl}`,
      title: PRODUCT.DESCRIPTION.GENERIC,
      organisation: PRODUCT.DESCRIPTION.ORGANISATION,
    });
  });

  it('should have all meta-data properties defined', () => {
    meta(req, res, next);

    expect(res.locals.meta?.url).toBeDefined();
    expect(res.locals.meta?.title).toBeDefined();
    expect(res.locals.meta?.organisation).toBeDefined();
  });

  it('should have meta-data title set to generic production description', () => {
    meta(req, res, next);
    expect(res.locals.meta?.title).toEqual(PRODUCT.DESCRIPTION.GENERIC);
  });

  it('should call next()', () => {
    meta(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should merge new locals variable to existing res.locals', () => {
    res.locals.googleAnalyticsId = 'mock';
    meta(req, res, next);

    expect(res.locals.googleAnalyticsId).toBeDefined();
    expect(res.locals.googleAnalyticsId).toEqual('mock');
  });
});
