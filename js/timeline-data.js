/**
 * =============================================
 *  PERSONALIZE AQUI — Nossa História
 * =============================================
 * Edite os textos, datas e caminhos das fotos/vídeos.
 * Coloque suas mídias em: assets/images/
 *
 * Use photo (ou media) com caminho de imagem ou vídeo (.mp4, .webm, .mov...)
 * Exemplo vídeo: photo: "assets/images/nosso-video.mp4"
 */

const TIMELINE = [
  {
    date: "15 de Junho, 2025",
    title: "O começo de tudo",
    text: "Tudo começou ali, no Instagram. Quem diria que seria o começo de nós?",
    photo: null,
    side: "left"
  },
  {
    date: "29 de Julho, 2025",
    title: "Nosso primeiro encontro",
    text: "Essa foi a primeira vez que saímos para um date de verdade. Fomos lá no Sampaio, lembra? Você estava toda linda, de salto, fazendo eu parecer um pititico do seu lado.",
    photo: null,
    side: "right"
  },
  {
    date: "22 de Agosto, 2025",
    title: "O dia do pedido",
    text: "Essa foi a data em que te pedi em namoro. Até então, a gente nem tinha uma foto juntos. Lembro muito bem de como foi: eu estava na sua casa, enquanto você estava na correria reformando seu quarto.",
    photo: null,
    side: "left"
  },
  {
    date: "28 de Agosto, 2025",
    title: "A primeira fotinha que nós tiramos juntos",
    text: "Pode até não parecer nada de especial, mas foi a partir daí que minha galeria começou a se encher de fotos do amor da minha vida.",
    photo: "assets/images/primeira-foto.png",
    side: "left"
  },
  {
    date: "7 de Setembro, 2025",
    title: "Nosso piquenique",
    text: "Compramos várias coisinhas e fomos ao Parque das Barrigudas fazer nosso passeio. Foi simples, mas foi perfeito por ser com você.",
    photo: "assets/images/piquinique.png",
    side: "right"
  },
  {
    date: "12 de Setembro, 2025",
    title: "Viagem para Pirassununga",
    text: "Você me acompanhou nessa viagem e foi lá que conheceu minha família por parte de pai.",
    photo: "assets/images/pirassununga.jpeg",
    side: "right"
  },
  {
    date: "21 de Setembro, 2025",
    title: "Nossa ida à cachoeira",
    text: "Essa foi a primeira vez que pegamos a estrada só nós dois. Foi uma aventura e tanto para chegar lá — até a parte de baixo do carro quebrou no caminho — mas, no fim, valeu totalmente a pena.",
    photo: "assets/images/cachoeira.mp4",
    side: "right"
  },
  {
    date: "29 de Outubro, 2025",
    title: "Primeiro Punch",
    text: "Essa foi a primeira vez que fomos ao Punch juntos. Mesmo que a gente não vá lá todo mês, eu guardei esse momento com muito carinho.",
    photo: "assets/images/outubro.jpeg",
    side: "left"
  },
  {
    date: "22 de Novembro, 2025",
    title: "Nosso aniversário de 3 meses",
    text: "Fomos a uma churrascaria comemorar nossos 3 meses. Parece que foi ontem, mas já se passaram 9 meses desde então. Foi também o mês em que tirei o aparelho — então, a partir daqui, as fotos ficam ainda mais sorridentes.",
    photo: "assets/images/novembro.jpeg",
    side: "right"
  },
  {
    date: "13 de Dezembro, 2025",
    title: "Confraternização",
    text: "Fomos à confraternização da minha equipe, e você estava linda com aquele vestido rosa. Lembro de você toda em dúvida, doida para cortar a saia do vestido. Eu amei ver como ele ficou em você e adoraria te ver usando ele mais vezes.",
    photo: "assets/images/13dezembro.jpeg",
    side: "left"
  },
  {
    date: "14 de Dezembro, 2025",
    title: "Confraternização 2.0",
    text: "Esse foi o dia seguinte da confraternização. E, cada vez mais, eu me surpreendo com o quanto você consegue ficar bonita com qualquer roupa. Naquele dia estava um calorão, eu estava todo suado nas fotos, mas, mesmo assim, tudo o que eu conseguia reparar era em como você estava linda.",
    photo: "assets/images/14dezembro.jpeg",
    side: "left"
  },
  {
    date: "22 de Dezembro, 2025",
    title: "Nosso aniversário de 4 meses",
    text: "Aquela era uma semana bem corrida, mas, mesmo assim, a gente nunca deixou um aniversário passar em branco. Fomos ao cinema assistir Avatar e, como sempre, você estava linda.",
    photo: "assets/images/22dezembro.jpeg",
    side: "left"
  },
  {
    date: "24 de Dezembro, 2025",
    title: "Nosso primeiro Natal juntos",
    text: "Aquela época do ano que todo mundo ama. Eu sempre gostei do Natal, mas, ao seu lado, descobri que ele pode ser ainda melhor.",
    photo: "assets/images/natal.jpeg",
    side: "left"
  },
  {
    date: "Final de Dezembro, 2025",
    title: "Nosso final de ano",
    text: "Fizemos bastante coisa juntos: fomos para Pirassununga, passamos um tempo com a minha família e, no dia 29, ainda voltamos para comemorar a virada. Não poderia ter começado meu ano de uma forma melhor do que ao seu lado.",
    photo: null,
    side: "left"
  },
  {
    date: "22 de Janeiro, 2026",
    title: "Começo do ano",
    text: "Acho que eu nunca havia recebido um presente tão criativo quanto esse que o meu amoreco fez. Eu amei cada detalhe, cada foto, cada carta, cada figurinha de gatinho e cada cubinho de docinho que tinha. Agora, enquanto estou escrevendo isso, estou até emocionado. A cada dia que passa, percebo que te amo ainda mais.",
    photo: "assets/images/22janeiro.jpeg",
    side: "right"
  },
  {
    date: "22 de Fevereiro, 2026",
    title: "6 meses juntos",
    text: "Eu me lembro bem de quando fizemos 6 meses — metade do que estamos fazendo agora. Você sempre dizia o quanto um ano ia chegar rápido, e aqui estamos; mas, mesmo assim, as memórias desse dia ainda estão bem vivas dentro de mim. Mesmo que tenha sido de bate e volta, essa foi a nossa primeira viagem de casal, vamos assim dizer.",
    photo: "assets/images/22fevereiro.jpeg",
    side: "left"
  },
  {
    date: "8 de Março, 2026",
    title: "Dia da mulher",
    text: "Tínhamos um plano, mas acabou dando errado e não conseguimos ir aonde eu tinha pensado. Quem diria que, no improviso, achamos um lugar ainda melhor. Tiramos várias fotos das comidas e uma do outro.",
    photo: "assets/images/8marco.jpeg",
    side: "left"
  },
  {
    date: "13 de Março, 2026",
    title: "Expo revestir",
    text: "Fomos à famosa feira de revestimento que minha moreca era louca para conhecer. Lembro do tanto que você falava dela e o quanto estava ansiosa para ir. Eu mesmo não entendia muitas das coisas que estavam lá, mas só de estar do seu lado já foi mais que o suficiente para eu aproveitar. Também comemos vários petiscos indo de stand em stand. Na volta, a gente até chegou a parar no Graal em Pirassununga; meu moreco tava usando a minha blusa reserva enquanto conversava com o meu pai.",
    photo: "assets/images/13marco.jpeg",
    side: "left"
  },
  {
    date: "Abril, 2026",
    title: "Muita correria",
    text: "Abril foi um mês bem apertado, com bastante trabalho da faculdade e projetos. A gente mal saiu ou tirou fotos. A ideia da lâmpada acabou mudando umas 300 vezes enquanto a gente fazia, mas, mesmo assim, o meu amor não desistia. A vida se torna feliz em pequenos momentos como esses.",
    photo: "assets/images/abril.jpeg",
    side: "right"
  },
  {
    date: "2 de Maio, 2026",
    title: "Exposição",
    text: "Esse mês meu amoreco ainda estava na correria com os trabalhos da faculdade, mas foi a primeira vez que fomos a um rodeio juntos — e, para mim, a primeira vez em geral. No dia eu tava passando um pouquinho mal, mas mesmo assim foi ótimo poder estar do seu lado.",
    photo: "assets/images/2maio.jpeg",
    side: "left"
  },
  {
    date: "22 de Maio, 2026",
    title: "9 meses juntos",
    text: 'Saímos para comer comida japonesa esse dia. Comemos bastante até, e você falava: "Amor, daqui a 3 meses vamos completar um ano de namoro, olha como o tempo passa rápido.',
    photo: "assets/images/22maio.jpeg",
    side: "left"
  },
  {
    date: "12 de Junho, 2026",
    title: "Dia dos namorados",
    text: "Uma data especial, não tem como negar. Saímos para um restaurante com a comida muito gostosa, mas, mesmo depois de 10 meses de namoro, você ainda estava um pouco envergonhada. Mesmo assim, aproveitamos a nossa data — mais um dia para eu lembrar o tanto que eu te amo.",
    photo: "assets/images/12junho.jpeg",
    side: "right"
  },
  {
    date: "Julho, 2026",
    title: "Dia dos namorados",
    text: "Meu amoreco estava sempre na correria com a faculdade, ainda mais no final do semestre, e brava com a Copa do Mundo e tudo. Mesmo assim, no meio de tanto caos, eu sempre confiei que ela iria passar em tudo. E, apesar de todas as dificuldades, ela é somente um nenezinho desse tamanhozinho aqui, que eu amo tanto.",
    photo: "assets/images/5julho.jpeg",
    side: "left"
  }
];

const GALLERY = [
  { src: "assets/images/1.jpeg", caption: "Nós dois ♥" },
  { src: "assets/images/2.jpeg", caption: "Com muito amor" },
  { src: "assets/images/3.jpeg", caption: "Sempre juntos" },
  { src: "assets/images/4.jpeg", caption: "A qualquer momento" },
  { src: "assets/images/5.jpeg", caption: "Te amo" },
  { src: "assets/images/6.jpeg", caption: "Para sempre" },
  { src: "assets/images/7.jpeg", caption: "Você é o amor da minha vida" }
];

const FINALE_MESSAGE = `
  Esse primeiro ano com você foi o mais especial da minha vida.
  Cada risada, cada abraço, cada conversa até tarde da noite...
  Você é a pessoa que eu quero acordar ao lado todos os dias.
  Obrigado por me escolher, por me amar e por ser exatamente quem você é.
  Que venham muitos, muitos anos de nós. Te amo. ♥
`;

/**
 * Trilha sonora de fundo
 * Coloque o arquivo em assets/audio/ (mp3, ogg ou m4a)
 * A música começa ao clicar em "Começar"
 */
const BACKGROUND_MUSIC = {
  src: "assets/audio/trilha.mp3",
  volume: 0.25, // 0 a 1
  loop: true
};
