import {
  headingCaption,
  submitButton,
  saveAndBackButton,
} from '../../../../pages/shared';
import { howYourDataWillBeUsedPage } from '../../../../pages/insurance/declarations';
import partials from '../../../../partials';
import {
  BUTTONS,
  PAGES,
  ERROR_MESSAGES,
  LINKS,
} from '../../../../../../content-strings';
import { DECLARATIONS_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/declarations';
import { FIELD_IDS } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

import api from '../../../../../support/api';
import flattenKeystoneDocument from '../../../../../support/flatten-keystone-document';

const { taskList } = partials.insurancePartials;

const CONTENT_STRINGS = PAGES.INSURANCE.DECLARATIONS.HOW_YOUR_DATA_WILL_BE_USED;

const {
  ROOT: INSURANCE_ROOT,
  DECLARATIONS: {
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    HOW_YOUR_DATA_WILL_BE_USED,
  },
  APPLICATION_SUBMITTED,
} = INSURANCE_ROUTES;

const FIELD_ID = FIELD_IDS.INSURANCE.DECLARATIONS.AGREE_HOW_YOUR_DATA_WILL_BE_USED;

context('Insurance - Declarations - How your data will be used page - As an Exporter, I want to have details of how my export insurance application data will be used, So that I can determine if I am okay with the use of my application in that format', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType();

      // go to the page we want to test.
      taskList.submitApplication.tasks.declarations.link().click();

      cy.completeAndSubmitDeclarationConfidentiality();
      cy.completeAndSubmitDeclarationAntiBribery();
      cy.completeAndSubmitDeclarationAntiBriberyCodeOfConduct();
      cy.completeAndSubmitDeclarationAntiBriberyExportingWithCodeOfConduct();
      cy.completeAndSubmitDeclarationConfirmationAndAcknowledgements();

      url = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`;

      cy.url().should('eq', url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication(referenceNumber);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${INSURANCE_ROOT}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`,
      backLink: `${INSURANCE_ROOT}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`,
      assertBackLink: false,
    });
  });

  describe('page tests', () => {
    let field;

    beforeEach(() => {
      cy.navigateToUrl(url);

      field = howYourDataWillBeUsedPage[FIELD_ID];
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe('latest confidentiality content', () => {
      let content;

      const {
        paragraph,
        link,
      } = howYourDataWillBeUsedPage;

      before(() => {
        api.declarations.getLatestHowDataWillBeUsed().then((data) => {
          content = flattenKeystoneDocument(data.content.document);
        });
      });

      it('renders paragraphs', () => {
        cy.checkText(paragraph(1), content[0].text);
        cy.checkText(paragraph(2), content[1].text);
        cy.checkText(paragraph(3), content[2].text);
      });

      it('renders a link', () => {
        cy.checkLink(link(3, 1), LINKS.EXTERNAL.ICO_MAKE_A_COMPLAINT, content[3].text);
      });
    });

    it("renders `I've read and agree` label and input", () => {
      field.label().should('exist');
      cy.checkText(field.label(), FIELDS[FIELD_ID].LABEL);

      field.input().should('exist');
    });

    it('renders a `save and back` button', () => {
      saveAndBackButton().should('exist');

      cy.checkText(saveAndBackButton(), BUTTONS.SAVE_AND_BACK);
    });
  });

  describe('form submission', () => {
    describe('when submitting an empty form', () => {
      let field;

      beforeEach(() => {
        cy.navigateToUrl(url);

        field = howYourDataWillBeUsedPage[FIELD_ID];
      });

      it('should render a validation error', () => {
        submitButton().click();

        partials.errorSummaryListItems().should('exist');
        partials.errorSummaryListItems().should('have.length', 1);

        const expectedMessage = ERROR_MESSAGES.INSURANCE.DECLARATIONS[FIELD_ID].IS_EMPTY;

        cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);

        cy.checkText(field.errorMessage(), `Error: ${expectedMessage}`);
      });

      it('should focus on input when clicking summary error message', () => {
        submitButton().click();

        partials.errorSummaryListItemLinks().eq(0).click();
        field.input().should('have.focus');
      });
    });

    describe('when submitting a fully completed form', () => {
      it(`should redirect to ${APPLICATION_SUBMITTED}`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitDeclarationHowYourDataWillBeUsed();

        const expectedUrl = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${APPLICATION_SUBMITTED}`;

        cy.url().should('eq', expectedUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted value', () => {
          // TEMP until previous page is built
          cy.navigateToUrl(`${Cypress.config('baseUrl')}${INSURANCE_ROOT}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`);

          const field = howYourDataWillBeUsedPage[FIELD_ID];

          field.input().should('be.checked');
        });
      });
    });
  });
});