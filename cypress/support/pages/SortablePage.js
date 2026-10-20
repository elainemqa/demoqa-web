import BasePage from './BasePage';

const ASCENDING = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
const LIST_ITEMS = '#demo-tabpane-list .list-group-item';

class SortablePage extends BasePage {
  // ---------- Seletores ----------
  elements = {
    title: () => cy.get('h1.text-center'),
    listTab: () => cy.get('#demo-tab-list'),
    items: () => cy.get(LIST_ITEMS),
  };

  // ---------- Página ----------
  assertLoaded() {
    cy.location('pathname').should('eq', '/sortable');
    this.elements.title().should('have.text', 'Sortable');
    this.removeAds();
    this.elements.listTab().click();
    this.elements.items().should('have.length', ASCENDING.length);
  }

  // ---------- Leitura da lista ----------
  getTexts() {
    return this.elements
      .items()
      .then(($items) => Cypress._.map($items, (el) => el.innerText.trim()));
  }

  // ---------- Drag and drop ----------
  /**
   * Arrasta o item da posição `from` até a posição `to` usando eventos de mouse.
   * A lista usa react-sortable-hoc, que escuta mousedown / mousemove / mouseup
   * (o drag nativo do HTML5 não é usado), por isso os eventos são disparados
   * manualmente, com várias etapas de movimento.
   */
  dragItem(from, to) {
    if (from === to) return;

    this.elements.items().then(($items) => {
      const source = $items[from];
      const target = $items[to];
      const win = source.ownerDocument.defaultView;

      const a = source.getBoundingClientRect();
      const b = target.getBoundingClientRect();
      const start = { x: a.left + a.width / 2, y: a.top + a.height / 2 };
      // Passa um pouco do centro do destino (no sentido do movimento),
      // para garantir que a biblioteca troque as posições.
      const direction = to > from ? 1 : -1;
      const end = {
        x: b.left + b.width / 2,
        y: b.top + b.height / 2 + direction * b.height * 0.4,
      };

      const point = (p) => ({
        clientX: p.x,
        clientY: p.y,
        pageX: p.x + win.scrollX,
        pageY: p.y + win.scrollY,
        button: 0,
        which: 1,
        force: true,
      });

      cy.wrap(source).trigger('mousedown', point(start));
      cy.wait(100);

      const steps = 8;
      for (let i = 1; i <= steps; i += 1) {
        const p = {
          x: start.x + ((end.x - start.x) * i) / steps,
          y: start.y + ((end.y - start.y) * i) / steps,
        };
        cy.get('body').trigger('mousemove', point(p));
        cy.wait(30);
      }

      cy.get('body').trigger('mouseup', point(end));
      // aguarda a animação de reordenação da lista
      cy.wait(400);
      this.getTexts().then((texts) => {
        cy.log(`Arrastou ${from} -> ${to}: ${texts.join(', ')}`);
      });
    });
  }

  /**
   * Embaralha a lista invertendo a ordem (Six ... One), movendo
   * sempre o último item para a posição seguinte do topo.
   */
  reverseOrder() {
    const last = ASCENDING.length - 1;
    for (let position = 0; position < last; position += 1) {
      this.dragItem(last, position);
    }
  }

  /**
   * Coloca os itens em ordem crescente (One ... Six).
   * Para cada posição, localiza o item correto e arrasta até ela.
   */
  sortAscending() {
    ASCENDING.forEach((label, position) => {
      this.getTexts().then((texts) => {
        const current = texts.indexOf(label);
        if (current !== position) {
          this.dragItem(current, position);
        }
      });
    });
  }

  // ---------- Verificações ----------
  assertOrder(expected) {
    this.elements.items().should(($items) => {
      const actual = Cypress._.map($items, (el) => el.innerText.trim());
      expect(
        actual.join(', '),
        `ordem atual da lista (esperado: ${expected.join(', ')})`
      ).to.equal(expected.join(', '));
    });
  }

  assertAscending() {
    this.assertOrder(ASCENDING);
  }

  assertDescending() {
    this.assertOrder([...ASCENDING].reverse());
  }
}

export default new SortablePage();