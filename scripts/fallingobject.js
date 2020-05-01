class FallingObject {
  constructor (game, x, y, w, h, s, g, imgSrc) {
    this.game = game;
    this.context = this.game.context;
    this.x =  x;
    this.y =  y;
    this.width = w;
    this.height = h;
    this.speedY = s;  
    this.gravity = g;
    this.objectImage = new Image();
    this.objectImage.src = imgSrc
    this.load();
/*     this.objectSound = new Audio();
    this.objectSound.src ='/sounds/186344__estupe__wc-chain.wav'
    this.objectSound.volume = 0.5;
    this.objectSound.load(); */
    
  };


  runLogic () {
    this.checkCollisionLoo();
    this.checkCollisionGround();  
    this.y += this.speedY;
    //console.log(this.y);
    
    if (this.game.elapsedTime >= 8000) {
      this.speedY += this.gravity;
      //console.log(this.speedY);
    }
    //console.log(`object.y = ${this.y}`);
  }

  checkCollisionLoo() {
    //botttom of object hits top of loo
    if (((this.y + this.height) >= this.game.loo.y) 
    //botttom of object above ground
    && ((this.y + this.height) < this.game.$canvas.height)
    //left of object <= right of loo
    && (this.x ) <= (this.game.loo.x + this.game.loo.width)
    //right of object >= left of loo
    && (this.x + this.width) >= this.game.loo.x ) {
      //this.objectSound.play();
      return true;
    }    
  }


  checkCollisionGround() {
    if ((this.y + this.height) >= this.game.$canvas.height) {
      return true;
    }
  }


  load() {
    this.objectImage.addEventListener('load', () => {
      this.context.drawImage(this.objectImage, this.x - (this.width / 2), this.y, this.width, this.height);
    })
  }

  
  draw() {
  //this.context.save();
  // load img and draw once
  //draw img again once loaded
  this.context.drawImage(this.objectImage, this.x - (this.width / 2), this.y, this.width, this.height);
/*   this.context.beginPath();
  this.context.rect(this.x - (this.width / 2), this.y, this.width, this.height);
  this.context.stroke(); */
  //console.dir(this.objectImage);

  //this.context.restore();

  }

}