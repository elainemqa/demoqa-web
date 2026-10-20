import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import PracticeFormPage from '../pages/PracticeFormPage';
import { buildFormData } from '../utils/formData';

// Dados compartilhados entre os passos do cenário
let formData;
let pictureName;

Then('a página Practice Form deve ser exibida', () => {
  PracticeFormPage.assertLoaded();
});

When('preencho todo o formulário com valores aleatórios', () => {
  formData = buildFormData();
  cy.log(`Dados: ${JSON.stringify(formData)}`);
  PracticeFormPage.fillForm(formData);
});

When('anexo o arquivo {string}', (fileName) => {
  pictureName = fileName;
  // O arquivo fica versionado em cypress/fixtures/ (vai junto no GitHub)
  PracticeFormPage.uploadPicture(`cypress/fixtures/${fileName}`);
});

When('submeto o formulário', () => {
  PracticeFormPage.submit();
});

Then('um popup deve ser exibido', () => {
  PracticeFormPage.assertModalOpened();
});

Then('o popup deve conter os dados informados', () => {
  PracticeFormPage.assertModalContains(formData, pictureName);
});

When('fecho o popup', () => {
  PracticeFormPage.closeModal();
});

//Then('o popup não deve mais estar visível', () => {
 // PracticeFormPage.assertModalClosed();
//});