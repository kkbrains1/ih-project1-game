class Loo {
  constructor(game) {
    this.game = game;
    this.context = this.game.context;
    this.width = 100;
    this.height = 160;
    this.x = this.game.$canvas.width / 2;
    this.y = this.game.$canvas.height  - (this.height);
    this.looImage = new Image();
    this.looImage.src = '/images/loo.jpg';
    this.load();
  };

  moveRight() {
    if (this.x < (this.game.$canvas.width - this.width / 2)) {
      this.x += 15;
      //console.log('x and y' , this.x, this.y);
    } 
  }

  moveLeft() {
    if (this.x > (this.width / 2)) {
      this.x -= 15;
    } 
    //console.log('x and y' , this.x, this.y);
  }

  load() {
    this.looImage.addEventListener('load', () => {
      this.context.drawImage(this.looImage, this.x - (this.width / 2), this.y, this.width, this.height);
      //console.log("LOO IMG LOADED");      
    })

  }

  draw() {
    //context.save();


    this.context.drawImage(this.looImage, this.x - (this.width / 2), this.y, this.width, this.height);
    //console.dir(this.looImage);
    
    //context.restore();

  };
  
}