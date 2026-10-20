// O DemoQA dispara erros de JS vindos de anúncios; eles não devem quebrar o teste.
Cypress.on('uncaught:exception', () => false);

// Bloqueia requisições de anúncios/analytics para deixar a execução mais estável.
beforeEach(() => {
  cy.intercept(
    /googlesyndication|doubleclick|googletagmanager|google-analytics|adservice|adsbygoogle/,
    { statusCode: 204, body: '' }
  );
});
