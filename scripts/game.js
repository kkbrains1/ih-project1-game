
class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext('2d');
    this.setKeyBindings();
    this.background = new Background(this);
    this.scoreBoard = new ScoreBoard(this);
    this.reset();

    this.creatingObjectsTimer = 0;
    this.creatingObjectsInterval = 2500;
  }
  
  start() {     
    this.gameIsPlaying = true;
    // Loop
    this.loop();
  }
  
  pause() {
    this.gameIsPlaying = false;
  }
  
  reset() {
    this.fallingObjects = [];
    this.loo = new Loo(this);
    //this.score = 0;
    this.score = 10;
    //this.frames = 0;
  }

/*   loadResourcesCheck() {
    //this.fallingObjects.load();
    if (this.background.load() && this.loo.load() && this.fallingObjects.load() ) {
      console.log("images loaded");
      return true;
    }
  } */

  gameOver() {
    this.gameIsPlaying = false;
    this.gameOver = new GameOver(this);
    //this.gameOver.draw();
/*     setTimeout(() => {
      this.reset();
    }, 3000) */
  }

  setKeyBindings() {
    //move left and right based on arrow keys
    window.addEventListener('keydown', (event) => {
      // Stop the default behavior (moving the screen to the left/up/right/down)
      event.preventDefault();
      // React based on the key pressed
      switch (event.keyCode) {
        case 37:
          game.loo.moveLeft();
          game.draw();
          //console.log('left');
          break;
        case 39:
          game.loo.moveRight();
          game.draw();
          //console.log('right');
          break;
/*         case 39:
          game.gameOver.closeWindow();
          //game.draw();
          //console.log('right');
          break; */
      }
    });
  }


  createFallingObjects(timestamp) {
    // create array of falling objects
    const fallingObject = new FallingObject(this, Math.floor(Math.random() * this.$canvas.width), 0, '/images/poo_scared.jpg');
/*     for (let i = 0; i < fallingObject.length; i++) {
      if (fallingObject[i-1].y - fallingObject[i].y > 100);
    }  */
    if (this.creatingObjectsTimer < (timestamp - this.creatingObjectsInterval) ) {
      console.log(`timestamp is ${timestamp}`)
      console.log(`this.creatingObjectsTimer is ${this.creatingObjectsTimer}`)
      this.creatingObjectsTimer = timestamp;
      console.log(`this.creatingObjectsTimer is ${this.creatingObjectsTimer}`)
      this.fallingObjects.push(fallingObject);
    }
    //console.log(`new object x ${fallingObject.x} and y ${fallingObject.y}`);
    //console.log(this.fallingObjects);
/*     setTimeout(() => {
      
      this.createFallingObjects();
      console.log(`new object x ${fallingObject.x} and y ${fallingObject.y}`);
   }, 2000)     */
    
  }

  addScoreAndRemoveObjects() {
    const ObjectArray = this.fallingObjects;
    
    for (let i = 0; i < ObjectArray.length - 1; i++) {
      const collidedLoo = ObjectArray[i].checkCollisionLoo();
      if (collidedLoo) {
        ObjectArray.splice(i, 1);
        // win a point
        this.score++;
        console.log('you caught the poo! add 1 point');
        //console.log(`i ${i} was removed`);
      }
    }
    for (let j = 0; j < ObjectArray.length - 1; j++) {
      const collidedFloor = ObjectArray[j].checkCollisionGround();
      if (collidedFloor) {
        // lose a point
        this.score--;
        ObjectArray.splice(j, 1);
        console.log('SPLAT! poo hit the ground. remove 1 point');
        //console.log(`j ${j} was removed`);
      }
      
    };
  }


  clearScreen() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  }

  runLogic(timestamp) {
    this.createFallingObjects(timestamp);
    for (const element of this.fallingObjects) {
      //console.log(element.x, element.y)
      element.runLogic();
    }
    this.addScoreAndRemoveObjects() ;
    //this.createFallingObjects();
    if (this.score <= 0) {
      this.gameOver();
      console.log('Game Over')
    }
    //this.frames += 1;  
  }

  draw() {
    this.clearScreen();

    this.background.draw();
    //console.log(this.fallingObjects);
    this.loo.draw();
    for (const element of this.fallingObjects) {
      //console.log(element);
      element.draw();
    };
    //his.poos.draw();
    this.scoreBoard.draw();

  }

  loop(timestamp) {
    this.runLogic(timestamp);
    //console.log(`number of frames is ${this.frames}`);
    //add condition images (+sdx) loaded true before drawing and looping
    this.draw(); 
    if (this.gameIsPlaying) {
    window.requestAnimationFrame(timestamp => this.loop(timestamp)); 
/*         setTimeout(() => {
          this.loop();
        }, 2500) */
      }
  }

}