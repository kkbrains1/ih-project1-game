const $canvas = document.querySelector('canvas');

const game = new Game($canvas);



const $buttonStart = document.getElementById('start');
const $buttonPause = document.getElementById('pause');
const $buttonReset = document.getElementById('reset');
const $buttonReplay = document.getElementById('replay');

$buttonStart.addEventListener('click', () => {
  game.start();
});
$buttonPause.addEventListener('click', () => {
  game.pause();
});
$buttonReset.addEventListener('click', () => {
  game.reset();
});

$buttonReplay.addEventListener('click', () => {
  game.replay();
});

//const $introView = document.getElementById("objective").style.display = "block";
//const $gameOverView = document.getElementById("game-over").style.display = "none";
//const $gameView = document.getElementById("game-canvas").style.display = "none";
