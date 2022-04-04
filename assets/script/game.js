let game = {
  lock_mode: false,
  first_card: null,
  second_card: null,

  tecs: [
    "bootstrap",
    "css",
    "electron",
    "firebase",
    "html",
    "javascript",
    "jquery",
    "mongo",
    "node",
    "react",
  ],

  cards: null,

  create_cards: function () {
    this.cards = []; //vetor para armazernar as cartas
    this.tecs.forEach((tec) => {
      // vai varrer e criar um par de cartas
      this.cards.push(this.create_pair(tec)); //adiciona ao vetor e cria um par com essa funcao
    });
    this.cards = this.cards.flat(); // separa os pares criando um novo vetor com 20 cartas
    this.shuffle_cards();
  },

  // Aqui vai criar os pares de cartas de acordo com as tec acima, somando 20 cartas

  create_pair: function (tec) {
    return [
      {
        id: this.create_id(tec),
        icon: tec,
        flipped: false,
      },
      {
        id: this.create_id(tec),
        icon: tec,
        flipped: false,
      },
    ];
  },

  // Aqui vai criar um id com um numero aleatorio para carta para poder diferenciar as mesmas
  create_id: function (tec) {
    return tec + parseInt(Math.random() * 1000);
  },

  //Aqui vai embararar todas as cartas
  shuffle_cards: function () {
    //forma mais facil de embaralhar
    // game.cards.sort(() => {
    //   0.5 - Math.random();
    // });
    let index_atual = this.cards.length; // Aqui pega o tamanho do vetor que é 20
    let index_aleatorio = 0; // vai ser atribuido um numero aleatorio
    while (index_atual !== 0) {
      // enquanto o index não for igual a 0, vai rodar esse lop
      index_aleatorio = Math.floor(Math.random() * index_atual); // aqui cria um index aleatorio e multiplica pelo atual EX:(Math.floor(0.12 *20 = 2,4) e o math.floor vai arredondar para 2)
      index_atual--; // decrementa até chegar a 0
      [this.cards[index_aleatorio], this.cards[index_atual]] = [
        // aqui mistura as cartas a carta 20 vai para o 2 e virse e versa, até chegar ao fim
        this.cards[index_atual],
        this.cards[index_aleatorio],
      ];
    }
  },
  // Aqui vai setar as propriedades das cartas para uma checagem
  set_card: function (id) {
    let card = this.cards.filter((card) => card.id === id)[0]; //filtrar pra ver se a carta ja esta virada
    console.log(card);
    if (card.flipped || this.lock_mode) {
      // checagem pra ver se a carta foi virada
      return false;
    }
    if (!this.first_card) {
      // se first card tiver nulo, ele recebe o card
      this.first_card = card;
      this.first_card.flipped = true; //aqui cvai previnir que aja um segundo click numa carta ja virada e conte como uma jogada
      return true;
    } else {
      this.second_card = card;
      this.second_card.flipped = true;
      this.lock_mode = true;
      return true;
    }
  },

  //vai checar se as cartas são iguais
  check_match: function () {
    if (!this.first_card || !this.second_card) {
      //impede de checar a primeira carta antes de virar a segunda
      return false;
    }
    return this.first_card.icon === this.second_card.icon;
  },

  //Restaura o padrão das cartas para uma nova checagem se houver par
  clear_cards: function () {
    (this.first_card = null), (this.second_card = null);
    this.lock_mode = false;
  },

  unflip_cards: function () {
    this.first_card.flipped = false; // retira o fliped das cartas
    this.second_card.flipped = false;
    this.clear_cards(); // limpa as variaveis de checagem
  },
  check_gameover: function () {
    return this.cards.filter((card) => !card.flipped).length == 0; // filtra se todas estao viradas, se tiver entao acaba o jogo
  },
};
