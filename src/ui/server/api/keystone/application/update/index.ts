import broker from './broker';
import business from './business';
import businessContact from './businessContact';
import buyer from './buyer';
import company from './company';
import declarations from '../declarations';
import policy from './policy';
import sectionReview from './sectionReview';

/**
 * update
 * Various API update calls for an application
 * @returns {Object} API calls
 */
const update = {
  broker,
  business,
  businessContact,
  buyer,
  company,
  declarations: declarations.update,
  policy,
  sectionReview,
};

export default update;
