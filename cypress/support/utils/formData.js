import { faker } from '@faker-js/faker';

export const GENDERS = [
  { index: 1, label: 'Male' },
  { index: 2, label: 'Female' },
  { index: 3, label: 'Other' },
];

export const HOBBIES = [
  { index: 1, label: 'Sports' },
  { index: 2, label: 'Reading' },
  { index: 3, label: 'Music' },
];

export const SUBJECTS = [
  'Hindi',
  'English',
  'Maths',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Commerce',
  'Accounting',
  'Economics',
  'Arts',
  'Social Studies',
  'History',
  'Civics',
];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Gera os dados aleatórios do Practice Form.
 */
export function buildFormData() {
  const birth = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });
  const day = String(birth.getDate()).padStart(2, '0');
  const dateOfBirth = `${day} ${MONTHS[birth.getMonth()]} ${birth.getFullYear()}`;

  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
    gender: faker.helpers.arrayElement(GENDERS),
    mobile: faker.string.numeric(10),
    dateOfBirth,
    subjects: faker.helpers.arrayElements(SUBJECTS, 2),
    hobbies: faker.helpers.arrayElements(HOBBIES, { min: 1, max: 3 }),
    address: faker.location.streetAddress(),
  };
}