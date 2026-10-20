import BasePage from './BasePage';

class BrowserWindowsPage extends BasePage {
  elements = {
    header: () => cy.get('h1.text-center'),
    newWindowButton: () => cy.get('#windowButton'),
  };

  assertLoaded() {
cy.location('pathname').should('eq', '/browser-windows');
  this.elements.header().should('have.text', 'Browser Windows');
  this.removeAds();
  }

  /**
   * O Cypress não consegue controlar outras janelas/abas do navegador.
   */
  clickNewWindowButton() {
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    this.elements.newWindowButton().scrollIntoView().click();
  }

  assertNewWindowOpened() {
    cy.get('@windowOpen').should('have.been.calledOnce');
    cy.get('@windowOpen').then((stub) => {
      expect(String(stub.firstCall.args[0])).to.include('/sample');
    });
  }

  /**
   * "Entra" na nova janela: abre, na própria aba do teste, a URL capturada.
   */
  switchToNewWindow() {
    cy.get('@windowOpen').then((stub) => {
      cy.visit(String(stub.firstCall.args[0]));
    });
  }

  /**
   * "Fecha" a nova janela: volta para a página Browser Windows.
   */
  closeNewWindow() {
    cy.go('back');
  }
}

export default new BrowserWindowsPage();
