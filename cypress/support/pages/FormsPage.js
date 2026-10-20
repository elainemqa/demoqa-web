import BasePage from './BasePage';

class FormsPage extends BasePage {
  assertLoaded() {
    cy.location('pathname').should('eq', '/forms');
    this.removeAds();
  }

  selectSubMenu(menuName) {
    cy.contains('.menu-list li', menuName).scrollIntoView().click();
  }
}

export default new FormsPage();
