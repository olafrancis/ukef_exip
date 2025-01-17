import {
  headingCaption,
  submitButton,
  saveAndBackButton,
} from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import {
  BUTTONS,
  PAGES,
} from '../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT,
  POLICY,
  EXPORTER_BUSINESS: {
    ROOT: EXPORTER_BUSINESS_ROOT,
  },
} = INSURANCE_ROUTES;

const CONTENT_STRINGS = PAGES.INSURANCE.POLICY.CHECK_YOUR_ANSWERS;

const { taskList } = partials.insurancePartials;

const task = taskList.prepareApplication.tasks.policy;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Policy - Check your answers - As an exporter, I want to check my answers to the type of policy section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      task.link().click();

      cy.completePolicySection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${POLICY.CHECK_YOUR_ANSWERS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${POLICY.CHECK_YOUR_ANSWERS}`,
      backLink: `${ROOT}/${referenceNumber}${POLICY.NAME_ON_POLICY}`,
      submitButtonCopy: BUTTONS.CONTINUE_NEXT_SECTION,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    it('renders a `save and back` button', () => {
      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });

    describe('form submission', () => {
      it(`should redirect to ${EXPORTER_BUSINESS_ROOT}`, () => {
        cy.navigateToUrl(url);

        submitButton().click();

        const expectedUrl = `${baseUrl}${ROOT}/${referenceNumber}${EXPORTER_BUSINESS_ROOT}`;
        cy.assertUrl(expectedUrl);
      });
    });
  });
});
