class Background {
  constructor(game) {
    this.game = game;
    this.x = this.game.$canvas.width;
    this.y = this.game.$canvas.height;
    this.context = this.game.context;

    this.backgroundImage = new Image();
    this.backgroundImage.src = '/images/canvas-3.jpg';
    this.load();
    
    this.backgroundMusic = new Audio();
    this.backgroundMusic.src = '/sounds/Poo-2-Loo-trimmed.mp3';
    this.backgroundMusic.volume = 0.1;
    this.backgroundMusic.load();

  };


  load() {
    this.backgroundImage.addEventListener('load', () => {
          this.context.drawImage(this.backgroundImage, 0, 0, this.x, this.y);
          //console.log("BG IMG LOADED");
        })    
    //this.backgroundImage.addEventListener('load', console.log("BG IMG LOADED") )
  }

  draw() {
    this.context.drawImage(this.backgroundImage, 0, 0, this.x, this.y);
    //this.context.drawImage(this.backgroundImage, 0, this.y + this.backgroundImage.height);
    //context.drawImage(this.backgroundImage, this.x + this.backgroundImage.width * 2, 0);
  };
  
}