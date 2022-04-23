const FRONT = "card-front";
const BACK = "card-back";
const CARD = "card";
const ICON = "icon";

//inicializa o game

//funcao para inicializar o game
function start_game() {
  game.create_cards();
  initialize_cards(game.cards);
  start_timer();
}

//Aqui vai criar o visual das cartas
function initialize_cards() {
  let gameBoard = document.getElementById("gameBoard"); // pega o gameboard
  gameBoard.innerHTML = ""; //limpa o tabuleiro para o proximo jogo
  game.cards.forEach((card) => {
    //varre os cards
    let cardElement = document.createElement("div"); // cria uma div e armazena na variavel
    cardElement.id = card.id; // adiciona um id
    cardElement.classList.add(CARD); //adiciona uma class
    cardElement.dataset.icon = card.icon; //adiciona um dataset pra verificar a igualdade

    create_content(card, cardElement); // cria o conteudo das cartas

    cardElement.addEventListener("click", flip_card); // adiciona um click para as cartas

    gameBoard.appendChild(cardElement); // finaliza a criação no html
  });
}

function create_content(card, cardElement) {
  create_face_cards(FRONT, card, cardElement); //cria face do front
  create_face_cards(BACK, card, cardElement); //cria face do back
}

function create_face_cards(face, card, element) {
  let cardElementFace = document.createElement("div"); // cria uma div
  cardElementFace.classList.add(face); //adiciona a class do front e back
  if (face == FRONT) {
    // se face for igual a front, vai criar os seguintes elementos
    let iconElement = document.createElement("img"); // cria uma tag de imagem no html
    iconElement.src = "./assets/images/" + card.icon + ".png"; //passa o endereço da imagem clicada concatenando com o icone da carta
    cardElementFace.appendChild(iconElement); //finaliza a criação da carta
  } else {
    // se for o back, vai adicionar o simbolo atras da carta
    cardElementFace.innerHTML = "&lt/&gt";
  }
  element.appendChild(cardElementFace); //finaliza a criação das duas faces
}

function flip_card() {
  if (game.set_card(this.id)) {
    //
    this.classList.add("flip"); //adiciona a class flip em cada carta que é clicada, e isso faz virar pelo css predefinido
    if (game.second_card) {
      // so vai ocorrer a checagem quando a segunda carta tiver virada
      if (game.check_match()) {
        // checa se houve game check
        game.clear_cards(); // restabelece as variveis de checagem se houver o check
        if (game.check_gameover()) {
          let gameOver = document.getElementById("gameOver");
          gameOver.innerHTML = "";
          gameOver.style.display = "flex"; // mostra tela de GO
          gameOver.innerHTML += ` <div> Parabéns ${jogador.toUpperCase()}, você completou o jogo em
                                  ${formatoTempo(timer_value)} min </div> 
                                  <button id="restart" onclick="restart()">Jogue novamente </button>`;
          stop_timer();
        }
      } else {
        setTimeout(() => {
          let first_card_view = document.getElementById(game.first_card.id); // pega o id das cartas viradas
          let second_card_view = document.getElementById(game.second_card.id);

          first_card_view.classList.remove("flip"); //remove a class flip e isso vai desvirar as cartas
          second_card_view.classList.remove("flip");
          game.unflip_cards(); // restaura as variaveis de checagem
        }, 1000);
      }
    }
  }
}

function restart() {
  game.clear_cards();
  start_game();
  let gameOver = document.getElementById("gameOver");
  gameOver.style.display = "none";
}
