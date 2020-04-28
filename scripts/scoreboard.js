class ScoreBoard {
  constructor(game) {
    this.game = game;
    this.context = this.game.context;
    this.x = this.game.$canvas.width - 200;
    this.y = 30;
    this.maxWidth = 160;
  }

  draw() {
    this.context.font = '24px bold sans-serif';
    this.context.fillText(`POINTS: ${this.game.score}`, this.x, this.y , this.maxWidth);
  }
}