import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
} from '../../../../support/quote/forms';
import { heading, submitButton } from '../../../pages/shared';
import { policyTypePage } from '../../../pages/quote';
import partials from '../../../partials';
import {
  ORGANISATION,
  BUTTONS,
  LINKS,
  FIELDS,
  PAGES,
} from '../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.QUOTE.POLICY_TYPE;

const { POLICY_TYPE } = FIELD_IDS;

const startRoute = ROUTES.QUOTE.START;

context('Policy type page - as an exporter, I want to get UKEF export insurance quote based on the export policy - provide policy type', () => {
  describe('rendering', () => {
    before(() => {
      cy.login();

      completeAndSubmitBuyerCountryForm();
      completeAndSubmitBuyerBodyForm();
      completeAndSubmitExporterLocationForm();
      completeAndSubmitUkContentForm();

      cy.url().should('include', ROUTES.QUOTE.POLICY_TYPE);
    });

    beforeEach(() => {
      Cypress.Cookies.preserveOnce('_csrf');
      Cypress.Cookies.preserveOnce('exip-session');
    });

    it('passes the audits', () => {
      cy.lighthouse({
        // accessibility threshold is reduced here because
        // the radio component from design system has an invalid aria attribute.
        // this is out of our control
        accessibility: 90,
        performance: 75,
        'best-practices': 100,
        seo: 60,
      });
    });

    it('renders a back link with correct url', () => {
      partials.backLink().should('exist');
      cy.checkText(partials.backLink(), LINKS.BACK);

      const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.UK_GOODS_OR_SERVICES}`;

      partials.backLink().should('have.attr', 'href', expected);
    });

    it('renders an analytics cookies consent banner that can be accepted', () => {
      cy.checkAnalyticsCookiesConsentAndAccept();
    });

    it('renders an analytics cookies consent banner that can be rejected', () => {
      cy.rejectAnalyticsCookies();
    });

    it('renders a phase banner', () => {
      cy.checkPhaseBanner();
    });

    it('should render a header with href to quote start', () => {
      partials.header.serviceName().should('have.attr', 'href', startRoute);
    });

    it('renders a page title and heading', () => {
      const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
      cy.title().should('eq', expectedPageTitle);

      cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
    });

    it('renders `policy type` radio inputs with labels and hints', () => {
      const fieldId = POLICY_TYPE;
      const field = policyTypePage[fieldId];

      field.single.input().should('exist');
      cy.checkText(field.single.label(), FIELDS[fieldId].OPTIONS.SINGLE.TEXT);

      cy.checkText(field.single.hint(), FIELDS[fieldId].OPTIONS.SINGLE.HINT);

      field.multiple.input().should('exist');
      cy.checkText(field.multiple.label(), FIELDS[fieldId].OPTIONS.MULTIPLE.TEXT);

      cy.checkText(field.multiple.hint(), FIELDS[fieldId].OPTIONS.MULTIPLE.HINT);
    });

    it('should not render policy length inputs by default', () => {
      const singlePolicyLength = policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH];
      singlePolicyLength.input().should('not.be.visible');
    });

    describe('when clicking `single` policy type', () => {
      it('should reveal policy length input with label and hint', () => {
        const singlePolicyType = policyTypePage[POLICY_TYPE].single;
        singlePolicyType.label().click();

        const singlePolicyLengthId = FIELD_IDS.SINGLE_POLICY_LENGTH;
        const singlePolicyLength = policyTypePage[singlePolicyLengthId];

        singlePolicyLength.label().should('be.visible');
        singlePolicyLength.hint().should('be.visible');
        singlePolicyLength.input().should('be.visible');

        cy.checkText(singlePolicyLength.label(), FIELDS[singlePolicyLengthId].LABEL);

        singlePolicyLength.hint().invoke('text').then((text) => {
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][0].text);
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][1].text);
          expect(text.trim()).includes(FIELDS[singlePolicyLengthId].HINT[0][2].text);
        });

        const expectedHref = LINKS.EXTERNAL.NBI_FORM;
        singlePolicyLength.hintLink().should('have.attr', 'href', expectedHref);
      });
    });

    describe('when clicking `multiple` policy type', () => {
      it('should reveal inset text and link', () => {
        const multiPolicyType = policyTypePage[POLICY_TYPE].multiple;
        multiPolicyType.label().click();

        const field = FIELDS[POLICY_TYPE];

        const insetText = field.OPTIONS.MULTIPLE.INSET[0];

        multiPolicyType.inset.text().invoke('text').then((text) => {
          expect(text.trim()).includes(insetText[0].text);
          expect(text.trim()).includes(insetText[1].text);
          expect(text.trim()).includes(insetText[2].text);
        });

        const expectedHref = LINKS.EXTERNAL.NBI_FORM;
        multiPolicyType.inset.link().should('have.attr', 'href', expectedHref);
      });
    });

    it('renders a submit button', () => {
      submitButton().should('exist');

      cy.checkText(submitButton(), BUTTONS.CONTINUE);
    });
  });

  describe('when form is valid', () => {
    it(`should redirect to ${ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY}`, () => {
      policyTypePage[POLICY_TYPE].single.input().click();
      policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input().type('8');

      submitButton().click();

      cy.url().should('include', ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY);
    });
  });
});
