const startBtn = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const screens = document.querySelectorAll('.screen');
const board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
  // winTheGame();
}

function decreaseTime() {
  if (time === 0) {
    gameOver();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function gameOver() {
  timeEl.parentNode.classList.add("hide");
  board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`;

}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `linear-gradient(90deg, ${'#' + Math.random().toString(16).substr(-6)} 0%, ${'#' + Math.random().toString(16).substr(-6)} 47%, ${'#' + Math.random().toString(16).substr(-6)} 100%)`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function winTheGame() {
  function kill() {
    const circle = document.querySelector('.circle');
    if (circle) {
      circle.click();
    }
  }
  setInterval(kill, 75);
}