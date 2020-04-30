
class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext('2d');
    this.setKeyBindings();
    this.background = new Background(this);
    this.scoreBoard = new ScoreBoard(this);
    

    //this.creatingPoosTimer = 0;
    this.creatingPoosInterval = 2500;

    //this.creatingRollsTimer = 0;
    this.creatingRollsInterval = 11250;
    this.reset();
  }
  
  start() {     
    this.gameIsPlaying = true;
    this.background.backgroundMusic.play();
    // Loop
    this.loop();
  }
  
  pause() {
    this.gameIsPlaying = false;
  }
  
  reset() {
    this.creatingPoosTimer = 0;
    this.creatingRollsTimer = 0;
    this.score = 10;
    this.fallingPoos = [];
    this.fallingRolls = [];
    this.loo = new Loo(this);
    //this.score = 0;
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
    const fallingPoo = new FallingObject(this, Math.floor(Math.random() * this.$canvas.width), 0, 80, 80, 2, '/images/poo_1.png');
    const fallingRoll = new FallingObject(this, Math.floor(Math.random() * this.$canvas.width), 0, 50, 50, 2, '/images/TP.png');
    if (this.creatingPoosTimer < (timestamp - this.creatingPoosInterval) ) {
      //console.log(`timestamp is ${timestamp}`)
      //console.log(`this.creatingPoosTimer is ${this.creatingPoosTimer}`)
      this.creatingPoosTimer = timestamp;
      //console.log(`this.creatingPoosTimer is ${this.creatingPoosTimer}`)
      this.fallingPoos.push(fallingPoo)
      if (this.creatingPoosTimer % 3 < 1 ) {
        //this.creatingRollsTimer = timestamp;
        console.log(this.creatingPoosTimer)
       console.log(`this.creatingPoosTimer % 3 is ${this.creatingPoosTimer % 3}`)
        this.fallingRolls.push(fallingRoll);
      }
    }
    //console.log(`new object x ${fallingObject.x} and y ${fallingObject.y}`);
    //console.log(this.fallingObjects);
/*     setTimeout(() => {
      
      this.createFallingObjects();
      console.log(`new object x ${fallingObject.x} and y ${fallingObject.y}`);
   }, 2000)     */
    
  }


  addScoreAndRemovePoos() {
    const ObjectArray = this.fallingPoos;
    
    for (let i = 0; i < ObjectArray.length - 1; i++) {
      const collidedLoo = ObjectArray[i].checkCollisionLoo();
      const collidedFloor = ObjectArray[i].checkCollisionGround();
      if (collidedLoo) {
        ObjectArray.splice(i, 1);
      
        // win a point
        this.score++;
        //console.log('you caught the poo! add 1 point');
        //console.log(`i ${i} was removed`);
      }else if (collidedFloor) {
        // lose a point
        this.score--;
        ObjectArray.splice(i, 1);
   
        //console.log('SPLAT! poo hit the ground. remove 1 point');
        //console.log(`j ${j} was removed`);
      }
    }

  }

  updateTimerAndRemoveRolls() {
    const RollsArray = this.fallingRolls;
    
    for (let m = 0; m < RollsArray.length - 1; m++) {
      const collidedLooRoll = RollsArray[m].checkCollisionLoo();
      const collidedFloorRoll = RollsArray[m].checkCollisionGround();
      //console.log(RollsArray[m].x, RollsArray[m].y);
      if (collidedLooRoll) {

        RollsArray.splice(m, 1);
       

        // win a point
        //this.score++;
       //console.log('you caught the roll! :-) ');
        //console.log(`m ${m} was removed`);
      } else if (collidedFloorRoll) {
        // lose a point
        //this.score--;

        RollsArray.splice(m, 1);
       

        //console.log('awwww! roll hit the ground :-( ');
       // console.log(`m ${m} was removed`);
      }
    }
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  }

  runLogic(timestamp) {
    this.updateTimerAndRemoveRolls();
    this.addScoreAndRemovePoos() ;
    this.createFallingObjects(timestamp);
    //this.createFallingRolls(timestamp);
    for (const element of this.fallingPoos) {
      //console.log(element.x, element.y)
      element.runLogic();
    }
    for (const element of this.fallingRolls) {
      //console.log(element.x, element.y)
      element.runLogic();
    }
    
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
    for (const element of this.fallingPoos) {
      //console.log(element);
      element.draw();
    };
    for (const element of this.fallingRolls) {
      //console.log(element);
      element.draw();
    };
    //his.poos.draw();
    this.scoreBoard.draw();

  }

  loop(timestamp) {
    this.runLogic(timestamp);
    console.log(timestamp)
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