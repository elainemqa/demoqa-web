import BasePage from './BasePage';

class WebTablesPage extends BasePage {
  // ---------- Seletores ----------
  elements = {
    title: () => cy.get('h1.text-center'),
    addButton: () => cy.get('#addNewRecordButton'),
    searchBox: () => cy.get('#searchBox'),
    modal: () => cy.get('.modal-content'),
    modalTitle: () => cy.get('#registration-form-modal'),
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    email: () => cy.get('#userEmail'),
    age: () => cy.get('#age'),
    salary: () => cy.get('#salary'),
    department: () => cy.get('#department'),
    submit: () => cy.get('#submit'),
    rows: () => cy.get('.rt-tbody .rt-tr-group'),
    rowByEmail: (email) => cy.contains('.rt-tbody .rt-tr-group', email),
    noRows: () => cy.get('.rt-noData'),
  };

  // ---------- Página ----------
  assertLoaded() {
    cy.location('pathname').should('eq', '/webtables');
    this.elements.title().should('have.text', 'Web Tables');
    this.removeAds();
  }

  // ---------- Formulário (criar / editar) ----------
  openAddForm() {
    this.elements.addButton().scrollIntoView().click();
    this.elements.modal().should('be.visible');
    this.elements.modalTitle().should('have.text', 'Registration Form');
  }

  /**
   * Preenche o formulário. Limpa cada campo antes de digitar,
   * o que também serve para o modo de edição (campos já preenchidos).
   */
  fillForm(data) {
    this.elements.firstName().clear().type(data.firstName);
    this.elements.lastName().clear().type(data.lastName);
    this.elements.email().clear().type(data.email);
    this.elements.age().clear().type(data.age);
    this.elements.salary().clear().type(data.salary);
    this.elements.department().clear().type(data.department);
  }

  submitForm() {
    this.elements.submit().click();
    this.elements.modal().should('not.exist');
  }

  createRecord(data) {
    this.openAddForm();
    this.fillForm(data);
    this.submitForm();
  }

  // ---------- Busca ----------
  /**
   * Filtra a tabela pelo e-mail (único) para encontrar o registro
   * independentemente da paginação.
   */
  searchBy(text) {
    this.elements.searchBox().clear().type(text);
  }

  clearSearch() {
    this.elements.searchBox().clear();
  }

  // ---------- Edição / exclusão ----------
  editRecord(email, newData) {
    this.searchBy(email);
    this.elements.rowByEmail(email).find('span[title="Edit"]').click();
    this.elements.modal().should('be.visible');
    this.fillForm(newData);
    this.submitForm();
  }

  deleteRecord(email) {
    this.searchBy(email);
    this.elements.rowByEmail(email).find('span[title="Delete"]').click();
  }

  // ---------- Verificações ----------
  assertRecordInTable(data) {
    this.searchBy(data.email);
    this.elements
      .rowByEmail(data.email)
      .should('contain.text', data.firstName)
      .and('contain.text', data.lastName)
      .and('contain.text', data.email)
      .and('contain.text', data.age)
      .and('contain.text', data.salary)
      .and('contain.text', data.department);
  }

  assertRecordNotInTable(email) {
    this.searchBy(email);
    cy.contains('.rt-tbody .rt-tr-group', email).should('not.exist');
    this.elements.noRows().should('contain.text', 'No rows found');
  }
}

export default new WebTablesPage();