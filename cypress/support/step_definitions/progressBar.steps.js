import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProgressBarPage from '../pages/ProgressBarPage';

// Valor da barra no momento em que foi pausada
let valueWhenStopped;

Then('a página Progress Bar deve ser exibida', () => {
  ProgressBarPage.assertLoaded();
});

When('clico no botão Start', () => {
  ProgressBarPage.clickStart();
});

When('paro a progress bar antes dos 25%', () => {
  // Para assim que passar de 10%, bem antes do limite de 25%
  ProgressBarPage.stopAfter(10).then((value) => {
    valueWhenStopped = value;
    cy.log(`Barra parada em ${value}%`);
  });
});

Then('o valor da progress bar deve ser menor ou igual a {int}%', (max) => {
  ProgressBarPage.assertValueAtMost(valueWhenStopped, max);
  // Confirma também na tela (a barra não deve ter andado depois de parada)
  ProgressBarPage.getValue().then((current) => {
    ProgressBarPage.assertValueAtMost(current, max);
  });
});

When('aperto Start novamente', () => {
  ProgressBarPage.clickStart();
});

When('a progress bar chega a 100%', () => {
  ProgressBarPage.waitUntilComplete();
});

When('reseto a progress bar', () => {
  ProgressBarPage.reset();
});

Then('a progress bar deve voltar para 0%', () => {
  ProgressBarPage.assertValueIsZero();
});
