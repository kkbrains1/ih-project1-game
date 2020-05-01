class ScoreBoard {
  constructor(game) {
    this.game = game;
    this.context = this.game.context;
    this.x = this.game.$canvas.width - 200;
    this.y = 30;
    this.maxWidth = 160;
  }

  draw() {
    this.context.fillStyle = 'pink';
    this.context.font = '40px bold Roboto, sans-serif';
    this.context.fillText(`YOUR POINTS: ${this.game.score}`, this.x, this.y + 10, this.maxWidth);
  }
}