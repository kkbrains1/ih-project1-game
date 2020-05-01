class GameOver {
  constructor(game) {
    this.game = game;
    //this.context = this.game.context;
/*     this.x = this.game.$canvas.width;
    this.y = this.game.$canvas.height;
    this.gameOverImage = new Image();
    this.gameOverImage.src = '/images/game-over-improved.gif';
    this.draw(); */

    this.gameOverMusic = new Audio();
    this.gameOverMusic.src = '/sounds/Sad_Trombone-Joe_Lamb-665429450.mp3';
    this.gameOverMusic.volume = 0.5;
    
    //this.gameOverMusic.load();
    this.gameOverMusic.play();
  }




  draw() {
    this.gameOverImage.addEventListener('load', () => {
      this.context.drawImage(this.gameOverImage, 0, 0, this.x, this.y);
    })
    this.context.drawImage(this.gameOverImage, 0, 0, this.x, this.y);
  }
  
}