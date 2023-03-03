import { YOUR_BUYER } from '../../../constants/routes/insurance/your-buyer';
import { get, post } from '../../../test-mocks/mock-router';
import { get as getCompanyOrOrganisation, post as postCompanyOrOrganisation } from '../../../controllers/insurance/your-buyer/company-or-organisation';
import { post as postCompanyOrOrganisationSaveAndBack } from '../../../controllers/insurance/your-buyer/company-or-organisation/save-and-back';

import { get as getWorkingWithBuyer, post as postWorkingWithBuyer } from '../../../controllers/insurance/your-buyer/working-with-buyer';
import { post as postWorkingWithBuyerSaveAndBack } from '../../../controllers/insurance/your-buyer/working-with-buyer/save-and-back';

describe('routes/insurance/your-buyer', () => {
  beforeEach(() => {
    require('.'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should setup all routes', () => {
    expect(get).toHaveBeenCalledTimes(2);
    expect(post).toHaveBeenCalledTimes(4);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, getCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION}`, postCompanyOrOrganisation);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.COMPANY_OR_ORGANISATION_SAVE_AND_BACK}`, postCompanyOrOrganisationSaveAndBack);

    expect(get).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER}`, getWorkingWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER}`, postWorkingWithBuyer);
    expect(post).toHaveBeenCalledWith(`/:referenceNumber${YOUR_BUYER.WORKING_WITH_BUYER_SAVE_AND_BACK}`, postWorkingWithBuyerSaveAndBack);
  });
});
