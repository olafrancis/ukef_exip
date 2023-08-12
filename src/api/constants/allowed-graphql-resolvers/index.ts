import 'dotenv/config';

const { NODE_ENV } = process.env;

const isDevEnvironment = NODE_ENV === 'development';

/**
 * An array of allowed resolvers automatically generated by KeystoneJS.
 * All other automatically generated resolvers are not allowed to be executed.
 */
const DEFAULT_RESOLVERS = [
  // application
  'createApplication',
  'updateBroker',
  'updateBusinessContactDetail',
  'updateBusiness',
  'updateBuyer',
  'updateDeclaration',
  'updatePolicyAndExport',
  'updateSectionReview',
  'updateEligibility',
  'referenceNumber',
  'applications',

  // account
  'account',
  'updateAccount',

  // misc
  'countries',
  'page',
];

/**
 * An array of allowed resolvers manually generated outside of KeystoneJS.
 * Any other manually generated resolvers are not allowed to be executed.
 */
const CUSTOM_RESOLVERS = [
  // account
  'accountPasswordReset',
  'accountSignIn',
  'accountSignInSendNewCode',
  'createAnAccount',
  'sendEmailConfirmEmailAddress',
  'sendEmailPasswordResetLink',
  'sendEmailReactivateAccountLink',
  'verifyAccountEmailAddress',
  'verifyAccountPasswordResetToken',
  'verifyAccountReactivationToken',
  'verifyAccountSignInCode',

  // application
  'declarationAntiBriberies',
  'declarationConfirmationAndAcknowledgements',
  'declarationHowDataWillBeUsed',
  'deleteApplicationByReferenceNumber',
  'getCompaniesHouseInformation',
  'submitApplication',
  'updateCompanyAndCompanyAddress',

  // feedback
  'createFeedbackAndSendEmail',
];

/**
 * Add some additional resolvers.
 * These are only used for testing purposes.
 */
if (isDevEnvironment) {
  CUSTOM_RESOLVERS.push('addAndGetOTP', 'deleteAnAccount', 'getAccountPasswordResetToken');
}

/**
 * An array of allowed resolvers:
 * - Automatically generated by KeystoneJS
 * - Manually generated by KeystoneJS
 * Any other resolvers are not allowed to be executed.
 */
export const ALLOWED_GRAPHQL_RESOLVERS = [...DEFAULT_RESOLVERS, ...CUSTOM_RESOLVERS];

export default ALLOWED_GRAPHQL_RESOLVERS;