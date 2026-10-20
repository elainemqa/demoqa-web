import { Given, When } from '@badeball/cypress-cucumber-preprocessor';
import HomePage from '../pages/HomePage';
import SideMenuComponent from '../pages/SideMenuComponent';

Given('o site DemoQA aberto', () => {
  HomePage.open();
});

When('eu escolho a opção {string} na página inicial', (option) => {
  HomePage.selectCard(option);
  SideMenuComponent.assertGroupVisible(option);
});

When('clico no submenu {string}', (submenu) => {
  SideMenuComponent.selectSubMenu(submenu);
});
