
class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext('2d');
    this.setKeyBindings();
    this.background = new Background(this);
    this.scoreBoard = new ScoreBoard(this);
    this.reset();
  }
  
  start() {
    //this.createFallingObjects();
    // Loop
    this.gameIsPlaying = true;
    //this.score = 0;
    this.loop();
  }
  
  pause() {
    this.gameIsPlaying = false;
  }
  
  reset() {
    this.fallingObjects = [];
    this.loo = new Loo(this);
    this.score = 0;

  }

  gameOver() {
    this.gameIsPlaying = false;
    setTimeout(() => {
      this.reset();
    }, 2000)
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
      }
    });
  }


  createFallingObjects() {
    // create array of falling objects
    const fallingObject = new FallingObject(this, Math.floor(Math.random() * this.$canvas.width), 10);
/*     for (let i = 0; i < fallingObject.length; i++) {
      if (fallingObject[i-1].y - fallingObject[i].y > 100);
    }  */
    this.fallingObjects.push(fallingObject);
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

  runLogic() {
    this.createFallingObjects();
    for (const element of this.fallingObjects) {
      //console.log(element.x, element.y)
      element.runLogic();
    }
    this.addScoreAndRemoveObjects() ;
    //this.createFallingObjects();
    if (this.score < 0) {
      this.gameOver();
    }

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
    //this.poos.draw();
    this.scoreBoard.draw();

  }

  loop () {
    this.runLogic();
    this.draw();
    if (this.gameIsPlaying) {
      setTimeout(() => {
        this.loop();
      }, 2500)
    }
  }

}