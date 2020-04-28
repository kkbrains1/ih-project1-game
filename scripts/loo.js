class Loo {
  constructor(game) {
    this.game = game;
    this.context = this.game.context;
    this.x = this.game.$canvas.width / 2;
    this.y = this.game.$canvas.height  - (this.game.$canvas.height / 6);
    this.width = 100;
    this.height = 160;
    this.looImage = new Image();
    this.looImage.src = '/images/loo.jpg';
    //this.backgroundImage.width = this.game.$canvas.width;
  };

  checkCollisionWithObject() {

  }
  
  moveRight() {
    if (this.x < (this.game.$canvas.width - this.width / 2)) {
      this.x += 10;
      //console.log('x and y' , this.x, this.y);
    } 
  }

  moveLeft() {
    if (this.x > (this.width / 2)) {
      this.x -=10;
    } 
    //console.log('x and y' , this.x, this.y);
  }


  draw() {
    //context.save();

    this.looImage.addEventListener('load', () => {
      this.context.looImage(this.looImage, this.x - (this.width / 2), this.y, this.width, this.height);
      //this.context.drawImage(this.backgroundImage, 0, 0, this.x, this.y);
    })

    this.context.drawImage(this.looImage, this.x - (this.width / 2), this.y, this.width, this.height);
    //console.dir(this.looImage);
    
    //context.restore();

  };
  
}