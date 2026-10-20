import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import BrowserWindowsPage from '../pages/BrowserWindowsPage';
import SamplePage from '../pages/SamplePage';

Then('a página Browser Windows deve ser exibida', () => {
  BrowserWindowsPage.assertLoaded();
});

When('clico no botão "New Window"', () => {
  BrowserWindowsPage.clickNewWindowButton();
});

Then('uma nova janela deve ser aberta', () => {
  BrowserWindowsPage.assertNewWindowOpened();
});

When('passo para a nova janela', () => {
  BrowserWindowsPage.switchToNewWindow();
});

Then('a mensagem {string} deve ser exibida', (message) => {
  SamplePage.assertMessage(message);
});

When('fecho a nova janela', () => {
  BrowserWindowsPage.closeNewWindow();
});

Then('devo estar de volta na página Browser Windows', () => {
  BrowserWindowsPage.assertLoaded();
});
