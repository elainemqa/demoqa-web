import { faker } from '@faker-js/faker';

const DEPARTMENTS = [
  'Insurance',
  'Compliance',
  'Legal',
  'Finance',
  'Engineering',
  'Quality',
  'Support',
  'Marketing',
];

const clean = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

/**
 * Gera um registro aleatório para a tabela do Web Tables.
 * O e-mail é único e serve como identificador do registro na tabela.
 */
export function buildRecord() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const unique = faker.string.alphanumeric({ length: 6, casing: 'lower' });

  return {
    firstName,
    lastName,
    email: `${clean(firstName)}.${clean(lastName)}.${unique}@teste.com`,
    age: String(faker.number.int({ min: 18, max: 65 })),
    salary: String(faker.number.int({ min: 1000, max: 20000 })),
    department: faker.helpers.arrayElement(DEPARTMENTS),
  };
}

/**
 * Gera vários registros únicos.
 */
export function buildRecords(quantity) {
  return Array.from({ length: quantity }, () => buildRecord());
}

/**
 * Gera novos dados para edição, mantendo o e-mail original
 * (ele é a chave usada para localizar a linha na tabela).
 */
export function buildUpdatedData(record) {
  return { ...buildRecord(), email: record.email };
}
