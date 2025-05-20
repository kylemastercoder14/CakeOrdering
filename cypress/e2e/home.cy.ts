describe('Home Page', () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit('/');
  });

  it('should load the homepage successfully', () => {
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    cy.contains('Welcome').should('be.visible'); // Replace with actual heading/text
  });

  it('should have a navigation bar', () => {
    cy.get('nav').should('exist');
  });

  it('should navigate to About page when About link is clicked', () => {
    cy.contains('About').click(); // Replace 'About' with actual link text
    cy.url().should('include', '/about');
    cy.contains('About Us').should('be.visible'); // Replace with actual About page content
  });
});
