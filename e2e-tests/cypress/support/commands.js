// ***********************************************
// Custom commands
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import 'cypress-audit/commands';

import analytics from '../support/analytics';

Cypress.Commands.add('login', require('./login'));
Cypress.Commands.add('checkPhaseBanner', require('./check-phase-banner'));

Cypress.Commands.add('submitAnswersHappyPathSinglePolicy', require('./quote/submit-answers-happy-path-single-policy'));
Cypress.Commands.add('submitAnswersHappyPathMultiPolicy', require('./quote/submit-answers-happy-path-multi-policy'));

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
