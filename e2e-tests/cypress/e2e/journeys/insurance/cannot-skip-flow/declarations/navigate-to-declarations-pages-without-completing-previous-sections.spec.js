import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  ROOT: INSURANCE_ROOT,
  COMPLETE_OTHER_SECTIONS,
  DECLARATIONS: {
    CONFIDENTIALITY,
    ANTI_BRIBERY: {
      CODE_OF_CONDUCT,
      EXPORTING_WITH_CODE_OF_CONDUCT,
    },
    CONFIRMATION_AND_ACKNOWLEDGEMENTS,
    HOW_YOUR_DATA_WILL_BE_USED,
  },
} = INSURANCE_ROUTES;

context('Insurance - Declaration - cannot skip to any Declarations page without completing other required fields/sections', () => {
  const insuranceRoute = `${Cypress.config('baseUrl')}${INSURANCE_ROOT}`;

  let referenceNumber;
  let completeOtherSectionsUrl;

  before(() => {
    cy.completeSignInAndGoToApplication().then((refNumber) => {
      referenceNumber = refNumber;

      completeOtherSectionsUrl = `${insuranceRoute}/${referenceNumber}${COMPLETE_OTHER_SECTIONS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteAccountAndApplication();
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - Confidentiality page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${CONFIDENTIALITY}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - Anti-bribery - Code of conduct page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${CODE_OF_CONDUCT}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - Anti-bribery - Exporting with code of conduct page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${EXPORTING_WITH_CODE_OF_CONDUCT}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - Confirmation and acknowledgements page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${CONFIRMATION_AND_ACKNOWLEDGEMENTS}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });

  it(`should redirect to ${COMPLETE_OTHER_SECTIONS} when navigating to the Declarations - How your data will be used page directly`, () => {
    const url = `${insuranceRoute}/${referenceNumber}${HOW_YOUR_DATA_WILL_BE_USED}`;

    cy.navigateToUrl(url);

    cy.assertUrl(completeOtherSectionsUrl);
  });
});
