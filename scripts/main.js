const $canvas = document.querySelector('canvas');

const game = new Game($canvas);

const $buttonStart = document.getElementById('start-button');

$buttonStart.addEventListener('click', () => {
  game.start();
});


