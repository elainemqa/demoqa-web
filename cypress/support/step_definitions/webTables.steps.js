import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import WebTablesPage from '../pages/WebTablesPage';
import {
  buildRecord,
  buildRecords,
  buildUpdatedData,
} from '../utils/webTableData';

// Dados compartilhados entre os passos do cenário
let record;
let createdRecords = [];

Then('a página Web Tables deve ser exibida', () => {
  WebTablesPage.assertLoaded();
});

// ---------- Cenário principal: criar / editar / deletar ----------
When('crio um novo registro com dados aleatórios', () => {
  record = buildRecord();
  cy.log(`Registro: ${JSON.stringify(record)}`);
  WebTablesPage.createRecord(record);
});

Then('o novo registro deve aparecer na tabela', () => {
  WebTablesPage.assertRecordInTable(record);
});

When('edito o novo registro com novos dados aleatórios', () => {
  record = buildUpdatedData(record);
  cy.log(`Registro editado: ${JSON.stringify(record)}`);
  WebTablesPage.editRecord(record.email, record);
});

Then('o registro deve aparecer na tabela com os dados atualizados', () => {
  WebTablesPage.assertRecordInTable(record);
});

When('deleto o novo registro', () => {
  WebTablesPage.deleteRecord(record.email);
});

Then('o registro não deve mais existir na tabela', () => {
  WebTablesPage.assertRecordNotInTable(record.email);
});

/*
// ---------- Bônus: criar e deletar vários registros ----------
When('crio {int} novos registros dinamicamente', (quantity) => {
  createdRecords = buildRecords(quantity);
  createdRecords.forEach((item) => WebTablesPage.createRecord(item));
});

Then('todos os registros criados devem aparecer na tabela', () => {
  createdRecords.forEach((item) => WebTablesPage.assertRecordInTable(item));
});

When('deleto todos os registros criados', () => {
  createdRecords.forEach((item) => WebTablesPage.deleteRecord(item.email));
});

Then('nenhum dos registros criados deve existir na tabela', () => {
  createdRecords.forEach((item) =>
    WebTablesPage.assertRecordNotInTable(item.email)
  );
  
  
});
*/
