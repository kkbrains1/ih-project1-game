class GameOver {
  constructor(game) {
    this.game = game;
    this.context = this.game.context;
    this.x = this.game.$canvas.width;
    this.y = this.game.$canvas.height;
    this.backgroundImage = new Image();
    this.backgroundImage.src = '/images/game-over.jpg';
  }



  draw() {
    this.backgroundImage.addEventListener('load', () => {
      this.context.drawImage(this.backgroundImage, 0, 0, this.x, this.y);
    })
    
  }
  
}