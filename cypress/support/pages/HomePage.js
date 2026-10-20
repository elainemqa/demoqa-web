import BasePage from './BasePage';

class HomePage extends BasePage {
  open() {
    this.visit('/');
    cy.get('.home-banner').should('exist');
    this.removeAds();
  }

  selectCard(cardName) {
    cy.contains('.card-body h5', cardName).scrollIntoView().click();
  }
}

export default new HomePage();
