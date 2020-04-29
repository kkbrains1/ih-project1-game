class FallingObject {
  constructor (game, x, y, imgSrc) {
    this.game = game;
    this.context = this.game.context;
    this.x =  x// Math.floor(Math.random() * this.game.$canvas.width);
    this.y =  y;
    //this.setRandomPosition();
    this.width = 50;
    this.height = 50;
    //this.speedY = 50;
    this.speedY = 0.3;  
    this.gravity = 0.01;
    this.objectImage = new Image();
    this.objectImage.src = imgSrc //'/images/poo_scared.jpg';
    this.fallingObjects = this.game.fallingObjects;
    this.load();
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
    console.log(this.y);
    this.speedY += this.gravity;
    console.log(`object.y = ${this.y}`);
    
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


  load() {
    this.objectImage.addEventListener('load', () => {
      this.context.drawImage(this.objectImage, this.x - (this.width / 2), this.y, this.width, this.height);
      //console.log("OBJECT IMG LOADED");
    })
  }

  
  draw() {
    
/*   this.objectImage.addEventListener('load', () => {
    this.context.drawImage(this.objectImage, 50 , this.game.$canvas.height + 50, this.width, this.height);
      //this.context.drawImage(this.backgroundImage, 0, 0, this.x, this.y);
  }) */
  //this.context.save();
  // load img and draw once
  //draw img again once loaded
  this.context.drawImage(this.objectImage, this.x - (this.width / 2), this.y, this.width, this.height);
  //console.dir(this.objectImage);

  //this.context.restore();

  }

}