# language: pt
Funcionalidade: Browser Windows do DemoQA

  Como usuário do site DemoQA
  Quero abrir uma nova janela pelo botão "New Window"
  Para validar o conteúdo exibido nela

  Cenário: Abrir uma nova janela, validar a mensagem e fechá-la
    Dado o site DemoQA aberto
    Quando eu escolho a opção "Alerts, Frame & Windows" na página inicial
    E clico no submenu "Browser Windows"
    Então a página Browser Windows deve ser exibida
    Quando clico no botão "New Window"
    Então uma nova janela deve ser aberta
    Quando passo para a nova janela
    Então a mensagem "This is a sample page" deve ser exibida
    Quando fecho a nova janela
    Então devo estar de volta na página Browser Windows
