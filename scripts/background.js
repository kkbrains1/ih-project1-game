class Background {
  constructor(game) {
    this.game = game;
    this.x = this.game.$canvas.width;
    this.y = this.game.$canvas.height;
    this.context = this.game.context;
    this.backgroundImage = new Image();
    this.backgroundImage.src = '/images/bathroom.jpg';
    //this.backgroundImage.width = this.game.$canvas.width;
  };

  draw() {
    this.backgroundImage.addEventListener('load', () => {
      this.context.drawImage(this.backgroundImage, 0, 0, this.x, this.y);
    })

    this.context.drawImage(this.backgroundImage, 0, 0, this.x, this.y);
    //this.context.drawImage(this.backgroundImage, 0, this.y + this.backgroundImage.height);
    //context.drawImage(this.backgroundImage, this.x + this.backgroundImage.width * 2, 0);
  };
  
}