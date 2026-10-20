# language: pt
Funcionalidade: Progress Bar do DemoQA

  Como usuário do site DemoQA
  Quero controlar a Progress Bar
  Para validar que ela pode ser pausada, concluída e resetada

  Cenário: Pausar antes dos 25%, continuar até 100% e resetar
    Dado o site DemoQA aberto
    Quando eu escolho a opção "Widgets" na página inicial
    E clico no submenu "Progress Bar"
    Então a página Progress Bar deve ser exibida
    Quando clico no botão Start
    E paro a progress bar antes dos 25%
    Então o valor da progress bar deve ser menor ou igual a 25%
    Quando aperto Start novamente
    E a progress bar chega a 100%
    E reseto a progress bar
    Então a progress bar deve voltar para 0%
