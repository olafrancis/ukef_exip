// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import 'cypress-audit/commands';

import analytics from './analytics';

Cypress.Commands.add('login', require('./login'));
Cypress.Commands.add('checkPhaseBanner', require('./check-phase-banner'));
Cypress.Commands.add('navigateToUrl', require('./navigate-to-url'));

// TODO: rename
Cypress.Commands.add('submitAnswersHappyPathSinglePolicy', require('./quote/submit-answers-happy-path-single-policy'));
Cypress.Commands.add('submitAnswersHappyPathMultiPolicy', require('./quote/submit-answers-happy-path-multi-policy'));

Cypress.Commands.add('corePageChecks', require('./core-page-checks'));

Cypress.Commands.add('checkAnalyticsCookiesConsentAndAccept', analytics.checkAnalyticsCookiesConsentAndAccept);
Cypress.Commands.add('checkAnalyticsCookieDoesNotExist', analytics.checkAnalyticsCookieDoesNotExist);
Cypress.Commands.add('checkAnalyticsCookieIsFalse', analytics.checkAnalyticsCookieIsFalse);
Cypress.Commands.add('checkAnalyticsCookieIsTrue', analytics.checkAnalyticsCookieIsTrue);
Cypress.Commands.add('checkAnalyticsScriptsAreNotRendered', analytics.checkAnalyticsScriptsAreNotRendered);
Cypress.Commands.add('checkAnalyticsScriptsAreRendered', analytics.checkAnalyticsScriptsAreRendered);

Cypress.Commands.add('checkCookiesConsentBannerIsNotVisible', analytics.checkCookiesConsentBannerIsNotVisible);
Cypress.Commands.add('checkCookiesConsentBannerIsVisible', analytics.checkCookiesConsentBannerIsVisible);
Cypress.Commands.add('checkCookiesConsentBannerDoesNotExist', analytics.checkCookiesConsentBannerDoesNotExist);

Cypress.Commands.add('rejectAnalyticsCookies', analytics.rejectAnalyticsCookies);

Cypress.Commands.add('submitInsuranceEligibilityAnswersHappyPath', require('./insurance/eligibility/submit-answers-happy-path'));

Cypress.Commands.add('submitInsuranceEligibilityAndStartApplication', require('./insurance/submit-eligibility-and-start-an-application'));

Cypress.Commands.add('submitEligibilityAndStartAccountCreation', require('./insurance/submit-eligibility-and-start-account-creation'));
Cypress.Commands.add('submitEligibilityAndStartAccountSignIn', require('./insurance/submit-eligibility-and-start-account-sign-in'));

Cypress.Commands.add('completeAndSubmitCreateAccountForm', require('./insurance/account/complete-and-submit-create-account-form'));
Cypress.Commands.add('completeAndSubmitSignInAccountForm', require('./insurance/account/complete-and-submit-sign-in-form'));

Cypress.Commands.add('completeAndSubmitPolicyTypeForm', require('./insurance/complete-and-submit-policy-type-form'));
Cypress.Commands.add('completeAndSubmitSingleContractPolicyForm', require('./insurance/complete-and-submit-single-contract-policy-form'));
Cypress.Commands.add('completeAndSubmitMultipleContractPolicyForm', require('./insurance/complete-and-submit-multiple-contract-policy-form'));

Cypress.Commands.add('completeAndSubmitAboutGoodsOrServicesForm', require('./insurance/complete-and-submit-about-goods-or-services-form'));

Cypress.Commands.add('completeAndSubmitCompanyDetails', require('./insurance/complete-and-submit-company-details'));

Cypress.Commands.add('completeAndSubmitNatureOfYourBusiness', require('./insurance/complete-and-submit-nature-of-your-business'));
Cypress.Commands.add('completeAndSubmitTurnoverForm', require('./insurance/complete-and-submit-turnover-form'));

Cypress.Commands.add('assertChangeAnswersPageUrl', require('./insurance/assert-change-answers-page-url'));
Cypress.Commands.add('assertSummaryListRowValue', require('./assert-summary-list-row-value'));
Cypress.Commands.add('submitAndAssertRadioErrors', require('./submit-and-assert-radio-errors'));
Cypress.Commands.add('submitAndAssertFieldErrors', require('./submit-and-assert-field-errors'));

Cypress.Commands.add('assertPasswordRevealButton', require('./insurance/account/assert-password-reveal-button'));
Cypress.Commands.add('assertConfirmEmailPageContent', require('./insurance/account/assert-confirm-email-page-content'));

Cypress.Commands.add('checkText', require('./check-text'));
Cypress.Commands.add('checkAriaLabel', require('./check-aria-label'));
Cypress.Commands.add('checkTaskStatus', require('./check-task-status'));
Cypress.Commands.add('checkLink', require('./check-link'));
Cypress.Commands.add('getReferenceNumber', require('./get-reference-number'));
