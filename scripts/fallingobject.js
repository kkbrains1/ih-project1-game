class FallingObject {
  constructor (game, x, y) {
    this.game = game;
    this.context = this.game.context;
    this.x =  x// Math.floor(Math.random() * this.game.$canvas.width);
    this.y =  y;
    //this.setRandomPosition();
    this.width = 50;
    this.height = 50;
    this.speed = 10;  
    this.objectImage = new Image();
    this.objectImage.src = '/images/poo_scared.jpg';
  };

/*   setRandomPosition() {
    this.x = Math.floor(Math.random() * this.game.$canvas.width);
    this.y = Math.floor(Math.random() * this.game.$canvas.height / 2);
  }
 */

/*   arrayFallingObjects() {
    for (let i = 0; i < 20 ; i++) {
      this.x = Math.floor(Math.random() * this.game.$canvas.width)
      this.y = Math.floor(Math.random() * this.game.$canvas.height / 2);
      const fallingObject = new Poos(150 + i * 50, Math.random() * 500);
      this.array.push(fallingObject);
    }
  } */

  runLogic () {
    this.y += this.speed;
  }


  draw() {
  
  //this.context.save();

  this.objectImage.addEventListener('load', () => {
    this.context.drawImage(this.objectImage, this.x - (this.width / 2), this.y, this.width, this.height);
    //this.context.drawImage(this.backgroundImage, 0, 0, this.x, this.y);
  })

  this.context.drawImage(this.objectImage, this.x - (this.width / 2), this.y, this.width, this.height);
  //console.dir(this.objectImage);

  //this.context.restore();

  }

}