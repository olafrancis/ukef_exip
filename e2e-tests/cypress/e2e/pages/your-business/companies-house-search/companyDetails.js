const companyDetails = {
  companiesHouseSearch: () => cy.get('[data-cy="companies-house-search'),
  companiesHouseSearchLabel: () => cy.get('[data-cy="companies-house-search-label'),
  companiesHouseSearchHint: () => cy.get('[data-cy="companies-house-search-hint'),
  companiesHouseSearchButton: () => cy.get('[data-cy="companies-house-search-button'),
  companiesHouseSearchError: () => cy.get('[data-cy="companies-house-search-error'),

  companiesHouseNoNumber: () => cy.get('[data-cy="do-not-have-number'),

  yourBusinessHeading: () => cy.get('[data-cy="your-business-heading'),
  yourBusinessSummaryList: () => cy.get('[data-cy="companies-house-summary-list'),

  tradingName: () => cy.get('[data-cy="trading-name'),
  tradingNameLabel: () => cy.get('[data-cy="trading-name-heading'),

  tradingAddress: () => cy.get('[data-cy="trading-address'),
  tradingAddressLabel: () => cy.get('[data-cy="trading-address-heading'),

  companyWebsiteLabel: () => cy.get('[data-cy="company-website-label'),
  companyWebsite: () => cy.get('[data-cy="company-website'),
  companyWebsiteError: () => cy.get('[data-cy="company-website-error'),

  phoneNumberLabel: () => cy.get('[data-cy="company-phone-label'),
  phoneNumberHint: () => cy.get('[data-cy="company-phone-hint'),
  phoneNumber: () => cy.get('[data-cy="company-phone'),
};

export default companyDetails;
