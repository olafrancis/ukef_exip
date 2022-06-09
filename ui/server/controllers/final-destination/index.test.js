const controller = require('.');
const CONTENT_STRINGS = require('../../content-strings');
const { FIELD_IDS, ROUTES, TEMPLATES } = require('../../constants');
const singleInputPageVariables = require('../../helpers/single-input-page-variables');
const { validation: generateValidationErrors } = require('./validation');
const api = require('../../api');
const mapCountries = require('../../helpers/map-countries');
const updateSubmittedData = require('../../helpers/update-submitted-data');
const { mockReq, mockRes, mockAnswers } = require('../../test-mocks');

describe('controllers/final-destination', () => {
  let req;
  let res;
  const mockCountriesResponse = [
    {
      marketName: 'Abu Dhabi',
      isoCode: 'XAD',
    },
  ];

  beforeEach(() => {
    req = mockReq();
    res = mockRes();
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('PAGE_VARIABLES', () => {
    it('should have correct properties', () => {
      const expected = {
        FIELD_NAME: FIELD_IDS.COUNTRY,
        PAGE_CONTENT_STRINGS: CONTENT_STRINGS.PAGES.FINAL_DESTINATION_PAGE,
        BACK_LINK: ROUTES.TRIED_TO_OBTAIN_COVER,
      };

      expect(controller.PAGE_VARIABLES).toEqual(expected);
    });
  });

  describe('get', () => {
    const getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      delete req.session.submittedData;
      api.getCountries = getCountriesSpy;
    });

    it('should call api.getCountries', async () => {
      await controller.get(req, res);

      expect(getCountriesSpy).toHaveBeenCalledTimes(1);
    });

    it('should render template', async () => {
      await controller.get(req, res);

      const expectedVariables = {
        ...singleInputPageVariables(controller.PAGE_VARIABLES),
        HIDDEN_FIELD_NAME: FIELD_IDS.FINAL_DESTINATION,
        countries: mapCountries(mockCountriesResponse),
        submittedValues: req.session.submittedData,
      };

      expect(res.render).toHaveBeenCalledWith(TEMPLATES.FINAL_DESTINATION, expectedVariables);
    });

    describe('when a country has been submitted', () => {
      it('should render template with countries mapped to submitted country', async () => {
        req.session.submittedData = mockAnswers;

        await controller.get(req, res);

        const expectedCountries = mapCountries(
          mockCountriesResponse,
          req.session.submittedData[FIELD_IDS.FINAL_DESTINATION],
        );

        const expectedVariables = {
          ...singleInputPageVariables(controller.PAGE_VARIABLES),
          HIDDEN_FIELD_NAME: FIELD_IDS.FINAL_DESTINATION,
          countries: expectedCountries,
          submittedValues: req.session.submittedData,
        };

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.FINAL_DESTINATION, expectedVariables);
      });
    });
  });

  describe('post', () => {
    const getCountriesSpy = jest.fn(() => Promise.resolve(mockCountriesResponse));

    beforeEach(() => {
      api.getCountries = getCountriesSpy;
    });

    describe('when there are validation errors', () => {
      it('should render template with validation errors', async () => {
        await controller.post(req, res);

        expect(res.render).toHaveBeenCalledWith(TEMPLATES.FINAL_DESTINATION, {
          ...singleInputPageVariables(controller.PAGE_VARIABLES),
          HIDDEN_FIELD_NAME: FIELD_IDS.FINAL_DESTINATION,
          countries: mapCountries(mockCountriesResponse),
          validationErrors: generateValidationErrors(req.body),
        });
      });
    });

    describe('when there are no validation errors', () => {
      const validBody = {
        [FIELD_IDS.FINAL_DESTINATION]: mapCountries(mockCountriesResponse)[0].value,
      };

      beforeEach(() => {
        req.body = validBody;
      });

      it('should update the session with submitted data', () => {
        controller.post(req, res);

        const expected = updateSubmittedData(
          req.body,
          req.session.submittedData,
        );

        expect(req.session.submittedData).toEqual(expected);
      });

      it(`should redirect to ${ROUTES.UK_CONTENT_PERCENTAGE}`, async () => {
        await controller.post(req, res);

        expect(res.redirect).toHaveBeenCalledWith(ROUTES.UK_CONTENT_PERCENTAGE);
      });

      describe('when the url\'s last substring is `change`', () => {
        it(`should redirect to ${ROUTES.CHECK_YOUR_ANSWERS}`, () => {
          req.originalUrl = 'mock/change';

          controller.post(req, res);

          expect(res.redirect).toHaveBeenCalledWith(ROUTES.CHECK_YOUR_ANSWERS);
        });
      });
    });
  });
});
