# DemoQA – Practice Form (Cypress + BDD + Page Objects)

Automação do formulário **Forms > Practice Form** de https://demoqa.com usando:

- **Cypress** (E2E)
- **BDD** com Gherkin em português (`@badeball/cypress-cucumber-preprocessor`)
- **Page Object Model**
- **Faker** para gerar dados aleatórios

## Cenário automatizado

1. Acessar https://demoqa.com/
2. Escolher a opção **Forms** na página inicial
3. Clicar no submenu **Practice Form**
4. Preencher todo o formulário com valores aleatórios (nome, e-mail, gênero, celular, data de nascimento, subjects, hobbies, endereço, state e city)
5. Fazer upload do arquivo `.txt`
6. Submeter o formulário
7. Garantir que o popup foi aberto
8. Fechar o popup

## Como executar

Pré-requisito: Node.js 18+

```bash
npm install
npm run cy:open   # modo interativo
npm test          # modo headless
```

## Estrutura

```
cypress.config.js
.cypress-cucumber-preprocessorrc.json
cypress/
├── e2e/features/practice-form.feature      # cenário BDD
├── fixtures/DesafioAcc.txt                 # arquivo usado no upload (versionado)
└── support/
    ├── e2e.js                              # config global (anúncios / exceções)
    ├── pages/                              # Page Objects
    │   ├── BasePage.js
    │   ├── HomePage.js
    │   ├── FormsPage.js
    │   └── PracticeFormPage.js
    ├── step_definitions/practiceForm.steps.js
    └── utils/formData.js                   # geração de dados aleatórios
```

## Publicando no GitHub

O arquivo `cypress/fixtures/DesafioAcc.txt` **precisa ser commitado**:

```bash
git add .
git commit -m "feat: teste BDD do Practice Form"
git push
```

> O arquivo `.gitignore` não ignora a pasta `fixtures`.
