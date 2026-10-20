import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import SortablePage from '../pages/SortablePage';

Then('a página Sortable deve ser exibida', () => {
  SortablePage.assertLoaded();
});

When('embaralho a lista invertendo a ordem dos elementos', () => {
  SortablePage.reverseOrder();
});

Then('a lista deve estar em ordem decrescente', () => {
  SortablePage.assertDescending();
});

When('ordeno os elementos em ordem crescente usando drag and drop', () => {
  SortablePage.sortAscending();
});

Then('a lista deve estar em ordem crescente', () => {
  SortablePage.assertAscending();
});
