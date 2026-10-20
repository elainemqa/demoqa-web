import BasePage from './BasePage';

class ProgressBarPage extends BasePage {
  // ---------- Seletores ----------
  elements = {
    title: () => cy.get('h1.text-center'),
    startStopButton: () => cy.get('#startStopButton'),
    resetButton: () => cy.get('#resetButton'),
    progressBar: () => cy.get('#progressBar .progress-bar'),
  };

  // ---------- Página ----------
  assertLoaded() {
    cy.location('pathname').should('eq', '/progress-bar');
    this.elements.title().should('have.text', 'Progress Bar');
    this.removeAds();
  }

  // ---------- Ações ----------
  /**
   * Lê o valor atual da barra (ex.: "25%" -> 25).
   */
  getValue() {
    return this.elements
      .progressBar()
      .invoke('text')
      .then((text) => parseInt(text, 10));
  }

  clickStart() {
    this.elements.startStopButton().scrollIntoView().should('have.text', 'Start');
    this.elements.startStopButton().click();
    this.elements.startStopButton().should('have.text', 'Stop');
  }

  /**
   * Espera a barra passar de `minValue` e clica em Stop logo em seguida.
   * Usar um `minValue` bem abaixo de 25 deixa margem para o tempo do clique.
   * Devolve (yield) o valor da barra no momento em que ela foi parada.
   */
  stopAfter(minValue) {
    this.elements.progressBar().should(($bar) => {
      expect(parseInt($bar.text(), 10)).to.be.at.least(minValue);
    });
    this.elements.startStopButton().click();
    this.elements.startStopButton().should('have.text', 'Start');
    return this.getValue();
  }

  waitUntilComplete() {
    cy.get('#progressBar .progress-bar', { timeout: 60000 }).should(
      'have.text',
      '100%'
    );
  }

  reset() {
    this.elements.resetButton().should('be.visible').click();
  }

  // ---------- Verificações ----------
  assertValueAtMost(value, max) {
    expect(value, `valor da barra (${value}%)`).to.be.at.most(max);
  }

  assertValueIsZero() {
    this.elements.progressBar().should('have.text', '0%');
    this.elements.startStopButton().should('have.text', 'Start');
  }
}

export default new ProgressBarPage();
