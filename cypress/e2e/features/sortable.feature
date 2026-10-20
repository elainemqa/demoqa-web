# language: pt
Funcionalidade: Sortable do DemoQA

  Como usuário do site DemoQA
  Quero reordenar os elementos da lista com drag and drop
  Para validar que eles podem ser colocados em ordem crescente

  Cenário: Ordenar a lista em ordem crescente com drag and drop
    Dado o site DemoQA aberto
    Quando eu escolho a opção "Interactions" na página inicial
    E clico no submenu "Sortable"
    Então a página Sortable deve ser exibida
    Quando embaralho a lista invertendo a ordem dos elementos
    Então a lista deve estar em ordem decrescente
    Quando ordeno os elementos em ordem crescente usando drag and drop
    Então a lista deve estar em ordem crescente
