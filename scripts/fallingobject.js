class FallingObject {
  constructor (game, x, y) {
    this.game = game;
    this.context = this.game.context;
    this.x =  x// Math.floor(Math.random() * this.game.$canvas.width);
    this.y =  y;
    //this.setRandomPosition();
    this.width = 50;
    this.height = 50;
    this.speedY = 50;  
    this.gravity = 1.2;
    this.objectImage = new Image();
    this.objectImage.src = '/images/poo_scared.jpg';
    this.fallingObjects = this.game.fallingObjects
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
    this.y += this.speedY;
    this.speedY *= this.gravity
    
    this.checkCollisionLoo();
    this.checkCollisionGround();
    
  }

  checkCollisionLoo() {
    //botttom of object hits top of loo
    if (((this.y + this.height) >= this.game.loo.y) 
    //botttom of object above ground
    && ((this.y + this.height) < this.game.$canvas.height)
    //centre of object <= right of loo
    && (this.x + (this.width / 2)) <= (this.game.loo.x + this.game.loo.width)
    //centre of object >= left of loo
    && (this.x + (this.width / 2)) >= this.game.loo.x ) {
      
      // win a point
      //this.game.score++;
      //console.log('you caught the poo!');
      return true;
    }
    
  }

  checkCollisionGround() {
    //botttom of object hits the ground
    if ((this.y + this.height) >= this.game.$canvas.height) {
      // lose a point
      //this.game.score--;
      //console.log('SPLAT!');
      return true;
      //remove last element of object array
      //this.fallingObjects.pop();
      
    }
  }


  draw() {
  
  //this.context.save();
  // load img and draw once
  this.objectImage.addEventListener('load', () => {
    this.context.drawImage(this.objectImage, this.x - (this.width / 2), this.y, this.width, this.height);
    //this.context.drawImage(this.backgroundImage, 0, 0, this.x, this.y);
  })
  //draw img again once loaded
  this.context.drawImage(this.objectImage, this.x - (this.width / 2), this.y, this.width, this.height);
  //console.dir(this.objectImage);

  //this.context.restore();

  }

}