const $canvas = document.querySelector('canvas');

const game = new Game($canvas);



const $buttonStart = document.getElementById('start');
const $buttonPause = document.getElementById('pause');
const $buttonReset = document.getElementById('reset');

$buttonStart.addEventListener('click', () => {
  game.start();
});
$buttonPause.addEventListener('click', () => {
  game.pause();
});
$buttonReset.addEventListener('click', () => {
  game.reset();
});
