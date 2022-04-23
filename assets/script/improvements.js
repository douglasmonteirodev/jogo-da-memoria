let txt_name = document.querySelector(".txt-input");
let display_timer = document.querySelector(".timer-container");
let timer = document.getElementById("timer");
let timer_value = 0;
let interval;
let jogador;

function formatoTempo(time) {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}
timer.innerHTML = formatoTempo(timer_value);

function attTimer() {
  timer_value += 1;
  timer.innerHTML = formatoTempo(timer_value);
}

function start_timer() {
  display_timer.style.display = "block";
  return (interval = setInterval(attTimer, 1000));
}

function stop_timer() {
  clearInterval(interval);
  timer_value = 0;
  timer.innerHTML = formatoTempo(timer_value);
}

formatoTempo(timer_value);
txt_name.focus();
function play() {
  let tela_inicial = document.querySelector(".tela-inicial");
  if (txt_name.value.length == 0) {
    alert("Por favor digite seu nome");
  } else {
    jogador = txt_name.value;
    tela_inicial.style.display = "none";
    start_timer_countdown();
  }
}

//----------------------------------------------------------------//

let countdown = document.getElementById("countdown");
let warning = document.getElementById("warning");
let timer_value_countdown = 6;
let interval_countdown;

function att_timer_countdown() {
  warning.remove();
  if (timer_value_countdown == 1) {
    clearInterval(interval_countdown);
    countdown.innerHTML = "GO...";
    setTimeout(remove_countdown, 1200);
  } else {
    timer_value_countdown--;
    countdown.innerHTML = timer_value_countdown;
  }
}

function start_timer_countdown() {
  warning.innerHTML = "COMEÇANDO...";
  interval_countdown = setInterval(att_timer_countdown, 1000);
}

function remove_countdown() {
  countdown.remove();
  start_game();
}
