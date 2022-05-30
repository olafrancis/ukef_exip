const {
  get,
  post,
} = require('../test-mocks/mock-router');
const { ROUTES } = require('../constants');
const beforeYouStartController = require('../controllers/before-you-start');
const companyBasedController = require('../controllers/company-based');
const companyBasedUnavailableController = require('../controllers/company-based-unavailable');
const buyerBasedController = require('../controllers/buyer-based');
const buyerBasedUnavailableController = require('../controllers/buyer-based-unavailable');
const triedToObtainCoverController = require('../controllers/tried-to-obtain-cover');
const finalDestinationController = require('../controllers/final-destination');
const ukContentPercentageController = require('../controllers/uk-content-pecentage');
const tellUsAboutYourDealController = require('../controllers/tell-us-about-your-deal');
const problemWithServiceController = require('../controllers/problem-with-service');

describe('routes/index', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(10);
    expect(post).toHaveBeenCalledTimes(7);

    expect(get).toHaveBeenCalledWith(ROUTES.BEFORE_YOU_START, beforeYouStartController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.BEFORE_YOU_START, beforeYouStartController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.COMPANY_BASED, companyBasedController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.COMPANY_BASED_UNAVAILABLE, companyBasedUnavailableController);

    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_BASED, buyerBasedController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.BUYER_BASED, buyerBasedController.post);
    expect(get).toHaveBeenCalledWith(ROUTES.BUYER_BASED_UNAVAILABLE, buyerBasedUnavailableController);

    expect(get).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.TRIED_TO_OBTAIN_COVER, triedToObtainCoverController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.FINAL_DESTINATION, finalDestinationController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.FINAL_DESTINATION, finalDestinationController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.UK_CONTENT_PERCENTAGE, ukContentPercentageController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.UK_CONTENT_PERCENTAGE, ukContentPercentageController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_DEAL, tellUsAboutYourDealController.get);
    expect(post).toHaveBeenCalledWith(ROUTES.TELL_US_ABOUT_YOUR_DEAL, tellUsAboutYourDealController.post);

    expect(get).toHaveBeenCalledWith(ROUTES.PROBLEM_WITH_SERVICE, problemWithServiceController);
  });
});
