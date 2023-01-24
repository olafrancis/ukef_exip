import { companyDetails } from '../../e2e/pages/your-business';
import { submitButton } from '../../e2e/pages/shared';
import { COMPANIES_HOUSE_NUMBER } from '../../../constants';

export default () => {
  companyDetails.companiesHouseSearch().clear().type(COMPANIES_HOUSE_NUMBER);
  companyDetails.tradingNameYesRadioInput().click();
  companyDetails.tradingAddressYesRadioInput().click();
  submitButton().click();
};