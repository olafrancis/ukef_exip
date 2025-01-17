import analytics from '../../analytics';
import {
  checkBuyerCountryInputHint,
  checkBuyerCountryValidationErrors,
  checkBuyerCountryFocusAfterSummaryErrorClick,
} from './check-buyer-country-form';
import { checkChangeLinkUrl, checkChangeAnswerRendered } from './check-summary-list-field-change';
import {
  checkActionReadAboutEligibility,
  checkActionReadAboutEligibilityLinkRedirect,
  checkActionContactApprovedBroker,
  checkActionTalkToYourNearestEFM,
  checkActionTalkToYourNearestEFMLink,
  checkActionApplyThroughPDF,
  checkActionContactUKEFTeam,
} from './actions';

Cypress.Commands.add('assertUrl', require('./assert-url'));

Cypress.Commands.add('checkAnalyticsCookiesConsentAndAccept', analytics.checkAnalyticsCookiesConsentAndAccept);
Cypress.Commands.add('checkAnalyticsCookieDoesNotExist', analytics.checkAnalyticsCookieDoesNotExist);
Cypress.Commands.add('checkAnalyticsCookieIsFalse', analytics.checkAnalyticsCookieIsFalse);
Cypress.Commands.add('checkAnalyticsCookieIsTrue', analytics.checkAnalyticsCookieIsTrue);
Cypress.Commands.add('checkAnalyticsScriptsAreNotRendered', analytics.checkAnalyticsScriptsAreNotRendered);
Cypress.Commands.add('checkAnalyticsScriptsAreRendered', analytics.checkAnalyticsScriptsAreRendered);

Cypress.Commands.add('checkAriaLabel', require('./check-aria-label'));

Cypress.Commands.add('checkAuthenticatedHeader', require('./check-authenticated-header'));

Cypress.Commands.add('checkBuyerCountryInputHint', checkBuyerCountryInputHint);
Cypress.Commands.add('checkBuyerCountryValidationErrors', checkBuyerCountryValidationErrors);
Cypress.Commands.add('checkBuyerCountryFocusAfterSummaryErrorClick', checkBuyerCountryFocusAfterSummaryErrorClick);

Cypress.Commands.add('checkChangeLinkUrl', checkChangeLinkUrl);
Cypress.Commands.add('checkChangeAnswerRendered', checkChangeAnswerRendered);

Cypress.Commands.add('checkCookiesConsentBannerDoesNotExist', analytics.checkCookiesConsentBannerDoesNotExist);

Cypress.Commands.add('assertCustomerServiceContactDetailsContent', require('./assert-customer-service-contact-details-content'));

Cypress.Commands.add('checkErrorSummaryListHeading', require('./check-error-summary-list-heading'));

Cypress.Commands.add('checkFooterLinks', require('./check-footer-links'));

Cypress.Commands.add('checkHeaderServiceNameAndHref', require('./check-header-service-name-href'));

Cypress.Commands.add('checkLink', require('./check-link'));

Cypress.Commands.add('checkPageNotFoundPageText', require('./check-page-not-found-page-text'));

Cypress.Commands.add('assertActivePaginationLink', require('../../pagination/assert-active-pagination-link'));
Cypress.Commands.add('assertPaginationDoesNotExist', require('../../pagination/assert-pagination-does-not-exist'));
Cypress.Commands.add('assertPaginationItemLink', require('../../pagination/assert-pagination-item-link'));
Cypress.Commands.add('assertPaginationItemEllipsis', require('../../pagination/assert-pagination-item-ellipsis'));
Cypress.Commands.add('assertPaginationNextLink', require('../../pagination/assert-pagination-next-link'));
Cypress.Commands.add('assertPaginationPreviousLink', require('../../pagination/assert-pagination-previous-link'));
Cypress.Commands.add('assertPaginationState', require('../../pagination/assert-pagination-state'));

Cypress.Commands.add('checkPhaseBanner', require('./check-phase-banner'));

Cypress.Commands.add('checkRadioInputYesAriaLabel', require('./check-radio-input-yes-aria-label'));
Cypress.Commands.add('checkRadioInputNoAriaLabel', require('./check-radio-input-no-aria-label'));

Cypress.Commands.add('assertSummaryListRow', require('./assert-summary-list-row'));
Cypress.Commands.add('assertSummaryListRowKey', require('./assert-summary-list-row-key'));
Cypress.Commands.add('assertSummaryListRowChangeText', require('./assert-summary-list-row-change-text'));
Cypress.Commands.add('assertSummaryListRowValue', require('./assert-summary-list-row-value'));

Cypress.Commands.add('checkTaskStatus', require('./check-task-status'));

Cypress.Commands.add('checkTaskStatusCompleted', require('./check-completed-task-status'));

Cypress.Commands.add('checkText', require('./check-text'));

Cypress.Commands.add('checkValue', require('./check-value'));

Cypress.Commands.add('checkActionReadAboutEligibility', checkActionReadAboutEligibility);
Cypress.Commands.add('checkActionReadAboutEligibilityLinkRedirect', checkActionReadAboutEligibilityLinkRedirect);
Cypress.Commands.add('checkActionContactApprovedBroker', checkActionContactApprovedBroker);
Cypress.Commands.add('checkActionTalkToYourNearestEFM', checkActionTalkToYourNearestEFM);
Cypress.Commands.add('checkActionTalkToYourNearestEFMLink', checkActionTalkToYourNearestEFMLink);
Cypress.Commands.add('checkActionApplyThroughPDF', checkActionApplyThroughPDF);
Cypress.Commands.add('checkActionContactUKEFTeam', checkActionContactUKEFTeam);
