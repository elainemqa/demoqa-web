import BasePage from './BasePage';

class SamplePage extends BasePage {
  elements = {
    heading: () => cy.get('#sampleHeading'),
  };

  assertMessage(message) {
    this.elements.heading().should('have.text', message);
  }
}

export default new SamplePage();
