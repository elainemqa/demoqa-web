# language: pt
Funcionalidade: Web Tables do DemoQA

  Como usuário do site DemoQA
  Quero criar, editar e deletar registros na tabela
  Para validar o CRUD da página Web Tables

  Contexto:
    Dado o site DemoQA aberto
    Quando eu escolho a opção "Elements" na página inicial
    E clico no submenu "Web Tables"
    Então a página Web Tables deve ser exibida

  Cenário: Criar, editar e deletar um registro
    Quando crio um novo registro com dados aleatórios
    Então o novo registro deve aparecer na tabela
    Quando edito o novo registro com novos dados aleatórios
    Então o registro deve aparecer na tabela com os dados atualizados
    Quando deleto o novo registro
    Então o registro não deve mais existir na tabela