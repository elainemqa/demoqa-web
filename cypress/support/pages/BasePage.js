export default class BasePage {
  visit(path = '/') {
    cy.visit(path);
  }

  /**
   * Remove banner fixo, rodapé e iframes de anúncios que cobrem elementos da página.
   */
  removeAds() {
    cy.document().then((doc) => {
      doc
        .querySelectorAll('#fixedban, footer, iframe')
        .forEach((el) => el.remove());
    });
  }
}
