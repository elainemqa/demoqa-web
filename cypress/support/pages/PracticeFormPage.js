import BasePage from './BasePage';

class PracticeFormPage extends BasePage {
  // ---------- Seletores ----------
  elements = {
    title: () => cy.get('h1.text-center'),
    firstName: () => cy.get('#firstName'),
    lastName: () => cy.get('#lastName'),
    email: () => cy.get('#userEmail'),
    gender: (index) => cy.get(`label[for="gender-radio-${index}"]`),
    mobile: () => cy.get('#userNumber'),
    dateOfBirth: () => cy.get('#dateOfBirthInput'),
    subjects: () => cy.get('#subjectsInput'),
    hobby: (index) => cy.get(`label[for="hobbies-checkbox-${index}"]`),
    picture: () => cy.get('#uploadPicture'),
    address: () => cy.get('#currentAddress'),
    stateSelect: () => cy.get('#state'),
    citySelect: () => cy.get('#city'),
    submit: () => cy.get('#submit'),
    modal: () => cy.get('.modal-content'),
    modalTitle: () => cy.get('#example-modal-sizes-title-lg'),
    modalBody: () => cy.get('.modal-body'),
    modalClose: () => cy.get('#closeLargeModal'),
  };

  // ---------- Ações ----------
  assertLoaded() {
    cy.location('pathname').should('eq', '/automation-practice-form');
    this.elements.title().should('contain.text', 'Practice Form');
    this.removeAds();
  }

  fillName(firstName, lastName) {
    this.elements.firstName().type(firstName);
    this.elements.lastName().type(lastName);
  }

  fillEmail(email) {
    this.elements.email().type(email);
  }

  selectGender(gender) {
    this.elements.gender(gender.index).click({ force: true });
  }

  fillMobile(mobile) {
    this.elements.mobile().type(mobile);
  }

  fillDateOfBirth(date) {
    this.elements.dateOfBirth().click();
    this.elements.dateOfBirth().type(`{selectall}${date}{enter}`);
  }

  addSubjects(subjects) {
    subjects.forEach((subject) => {
      this.elements.subjects().type(`${subject}{enter}`, { force: true });
    });
  }

  selectHobbies(hobbies) {
    hobbies.forEach((hobby) => {
      this.elements.hobby(hobby.index).click({ force: true });
    });
  }

  uploadPicture(fixturePath) {
    this.elements.picture().selectFile(fixturePath, { force: true });
  }

  fillAddress(address) {
    this.elements.address().type(address);
  }

  /**
   * Abre um react-select e escolhe uma das opções disponíveis aleatoriamente.
   */
  selectRandomOption(getContainer) {
    getContainer().scrollIntoView().click();
    getContainer()
      .find('[id*="-option-"]')
      .should('have.length.greaterThan', 0)
      .then(($options) => {
        const index = Cypress._.random(0, $options.length - 1);
        cy.wrap($options[index]).click();
      });
  }

  selectRandomStateAndCity() {
    this.selectRandomOption(this.elements.stateSelect);
    this.selectRandomOption(this.elements.citySelect);
  }

  /**
   * Preenche todos os campos do formulário.
   */
  fillForm(data) {
    this.fillName(data.firstName, data.lastName);
    this.fillEmail(data.email);
    this.selectGender(data.gender);
    this.fillMobile(data.mobile);
    this.fillDateOfBirth(data.dateOfBirth);
    this.addSubjects(data.subjects);
    this.selectHobbies(data.hobbies);
    this.fillAddress(data.address);
    this.selectRandomStateAndCity();
  }

  submit() {
    this.elements.submit().scrollIntoView().click({ force: true });
  }

  // ---------- Verificações do popup ----------
  assertModalOpened() {
    this.elements.modal().should('be.visible');
    this.elements
      .modalTitle()
      .should('have.text', 'Thanks for submitting the form');
  }

  assertModalContains(data, pictureName) {
    this.elements
      .modalBody()
      .should('contain.text', `${data.firstName} ${data.lastName}`)
      .and('contain.text', data.email)
      .and('contain.text', data.gender.label)
      .and('contain.text', data.mobile)
      .and('contain.text', pictureName)
      .and('contain.text', data.address);
  }

  closeModal() {
    this.elements.modalClose().click({ force: true });
  }

  assertModalClosed() {
    this.elements.modal().should('not.exist');
  }
}

export default new PracticeFormPage();