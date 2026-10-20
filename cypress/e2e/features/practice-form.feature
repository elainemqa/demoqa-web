# language: pt
Funcionalidade: Practice Form do DemoQA

  Como usuário do site DemoQA
  Quero preencher e enviar o Practice Form
  Para validar que o formulário é submetido com sucesso

  Cenário: Preencher o formulário com valores aleatórios e submeter
    Dado o site DemoQA aberto
    Quando eu escolho a opção "Forms" na página inicial
    E clico no submenu "Practice Form"
    E preencho todo o formulário com valores aleatórios
    E anexo o arquivo "DesafioAcc.txt"
    E submeto o formulário
    Então um popup deve ser exibido
    E o popup deve conter os dados informados
    Quando fecho o popup
    Então o popup não deve mais estar visível
