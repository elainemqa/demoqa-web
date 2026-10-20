/**
 * Menu lateral presente em todas as páginas de grupo do DemoQA
 * (Elements, Forms, Alerts, Frame & Windows, ...).
 */
class SideMenuComponent {
  assertGroupVisible(groupName) {
    cy.contains('.header-text', groupName).should('be.visible');
  }

  selectSubMenu(menuName) {
    cy.contains('.menu-list li', menuName).scrollIntoView().click();
  }
}

export default new SideMenuComponent();
