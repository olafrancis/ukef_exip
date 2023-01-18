import { Request, Response } from '../../types';
import mockAnswers from './mock-answers';
import mockSession from './mock-session';
import mockQuote from './mock-quote';
import mockCisCountries from './mock-cis-countries';
import mockCountries from './mock-countries';
import mockCurrencies from './mock-currencies';
import mockCompany from './mock-company';
import mockApplication from './mock-application';
import mockPhoneNumbers from './mock-phone-numbers';
import mockSicCodes from './mock-sic-codes';

const mockReq = () => {
  let req = {} as Request;

  req = {
    body: {},
    cookies: {},
    csrfToken: () => 'mock',
    flash: jest.fn(),
    headers: {
      referer: '/mock',
    },
    method: 'GET',
    originalUrl: 'mock',
    params: {
      referenceNumber: mockApplication.referenceNumber.toString(),
    },
    redirect: jest.fn(),
    session: {
      submittedData: {
        quoteEligibility: {},
        insuranceEligibility: {},
      },
    },
  };

  return req;
};

const mockRes = () => {
  const res = {} as Response;

  res.redirect = jest.fn();
  res.render = jest.fn();

  res.locals = {
    csrfToken: 'mock',
  };

  return res;
};

const mockNext = jest.fn();

export {
  mockAnswers,
  mockApplication,
  mockCisCountries,
  mockCountries,
  mockCompany,
  mockCurrencies,
  mockNext,
  mockSession,
  mockSicCodes,
  mockQuote,
  mockPhoneNumbers,
  mockReq,
  mockRes,
};
