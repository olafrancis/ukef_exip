const yourContactPage = {
  contactDetailsHeading: () => cy.get('[data-cy="contact-details-heading"]'),
  contactDetailsHint: () => cy.get('[data-cy="contact-details-hint"]'),
  field: (field) => ({
    label: () => cy.get(`[data-cy="${field}-label"]`),
    hint: () => cy.get(`[data-cy="${field}-hint"]`),
    input: () => cy.get(`[data-cy="${field}"]`),
    details: () => cy.get(`[data-cy="${field}"]`),
    errorMessage: () => cy.get(`[data-cy="${field}-error"]`),
  }),
};

export default yourContactPage;