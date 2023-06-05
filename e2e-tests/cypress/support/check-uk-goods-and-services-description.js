import partials from '../e2e/partials';
import { UK_GOODS_AND_SERVICES_DESCRIPTION } from '../../content-strings';

const CONTENT_STRINGS = UK_GOODS_AND_SERVICES_DESCRIPTION;

const checkDescriptionSummaryText = () => {
  partials.ukGoodsOrServicesDescription.summary().should('exist');

  cy.checkText(partials.ukGoodsOrServicesDescription.summary(), CONTENT_STRINGS.INTRO);
};

const checkDescriptionSummaryClickRevealsContent = () => {
  partials.ukGoodsOrServicesDescription.summary().click();

  partials.ukGoodsOrServicesDescription.includes.intro().should('be.visible');
};

const checkDescriptionContentSections = {
  includes: () => {
    cy.checkText(partials.ukGoodsOrServicesDescription.includes.intro(), CONTENT_STRINGS.INCLUDES.INTRO);

    cy.checkText(partials.ukGoodsOrServicesDescription.includes.listItem1(), CONTENT_STRINGS.INCLUDES.PRODUCTS);

    cy.checkText(partials.ukGoodsOrServicesDescription.includes.listItem2(), CONTENT_STRINGS.INCLUDES.MANUFACTURED);

    const expectedStaffingCostText = `${CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.LINK.TEXT} ${CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.TEXT}`;
    cy.checkText(partials.ukGoodsOrServicesDescription.includes.listItem3(), expectedStaffingCostText);

    partials.ukGoodsOrServicesDescription.includes.listItem3Link().should('have.attr', 'href', CONTENT_STRINGS.INCLUDES.STAFFING_COSTS.LINK.HREF);

    const expectedPhysicalAssetsText = `${CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.TEXT} ${CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.TEXT}`;
    cy.checkText(partials.ukGoodsOrServicesDescription.includes.listItem4(), expectedPhysicalAssetsText);

    partials.ukGoodsOrServicesDescription.includes.listItem4Link().should('have.attr', 'href', CONTENT_STRINGS.INCLUDES.NON_PHYSICAL_ASSETS.LINK.HREF);

    cy.checkText(partials.ukGoodsOrServicesDescription.includes.canCountAs(), CONTENT_STRINGS.INCLUDES.CAN_COUNT_AS);
  },
  doesNotCount: () => {
    cy.checkText(partials.ukGoodsOrServicesDescription.doesNotCount.heading(), CONTENT_STRINGS.DOES_NOT_COUNT.HEADING);

    cy.checkText(partials.ukGoodsOrServicesDescription.doesNotCount.copy(), CONTENT_STRINGS.DOES_NOT_COUNT.TEXT);
  },
  staffingCosts: () => {
    cy.checkText(partials.ukGoodsOrServicesDescription.staffingCosts.heading(), CONTENT_STRINGS.STAFFING_COSTS.HEADING);

    cy.checkText(partials.ukGoodsOrServicesDescription.staffingCosts.copy(), CONTENT_STRINGS.STAFFING_COSTS.TEXT);

    cy.checkText(partials.ukGoodsOrServicesDescription.staffingCosts.listItem1(), CONTENT_STRINGS.STAFFING_COSTS.LIST[0].TEXT);

    cy.checkText(partials.ukGoodsOrServicesDescription.staffingCosts.listItem2(), CONTENT_STRINGS.STAFFING_COSTS.LIST[1].TEXT);

    cy.checkText(partials.ukGoodsOrServicesDescription.staffingCosts.listItem3(), CONTENT_STRINGS.STAFFING_COSTS.LIST[2].TEXT);
  },
  nonPhysicalAssets: () => {
    cy.checkText(partials.ukGoodsOrServicesDescription.nonPhysicalAssets.heading(), CONTENT_STRINGS.NON_PHYSICAL_ASSETS.HEADING);

    cy.checkText(partials.ukGoodsOrServicesDescription.nonPhysicalAssets.copy(), CONTENT_STRINGS.NON_PHYSICAL_ASSETS.TEXT);
  },
  notSure: () => {
    cy.checkText(partials.ukGoodsOrServicesDescription.notSure.heading(), CONTENT_STRINGS.NOT_SURE.HEADING);

    const expected = `${CONTENT_STRINGS.NOT_SURE.BODY_1} ${CONTENT_STRINGS.NOT_SURE.LINK.TEXT} ${CONTENT_STRINGS.NOT_SURE.BODY_2}`;
    cy.checkText(partials.ukGoodsOrServicesDescription.notSure.details(), expected);
  },
};

const checkDescriptionContent = () => {
  checkDescriptionContentSections.includes();
  checkDescriptionContentSections.doesNotCount();
  checkDescriptionContentSections.staffingCosts();
  checkDescriptionContentSections.nonPhysicalAssets();
  checkDescriptionContentSections.notSure();
};

export {
  checkDescriptionSummaryText,
  checkDescriptionSummaryClickRevealsContent,
  checkDescriptionContent,
};
