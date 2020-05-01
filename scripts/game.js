
class Game {
  constructor($canvas, $introView, $gameView, $gameOverView) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext('2d');
    //this.$introView = $introView ;
    //this.$gameView = $gameView;
    //this.$gameOverView = $gameOverView;
    this.setKeyBindings();
    this.background = new Background(this);
    this.scoreBoard = new ScoreBoard(this);
    
    //this.creatingPoosTimer = 0;
    this.creatingPoosInterval = 2500;
    //this.creatingRollsTimer = 0;
    //this.creatingRollsInterval = 11250;
    this.reset();
  }
  
  start() {
    document.getElementById("objective").style.display = "none";
    document.getElementById("game-canvas").style.display = "block";
    this.gameIsPlaying = true;
    this.background.backgroundMusic.play();
    // Loop
    this.loop();
  }
  
  pause() {
    this.gameIsPlaying = false;
  }
  
  reset() {
    
    this.startTime = Date.now();
    
    //console.log(`start time is ${this.startTime}`)
    this.creatingPoosTimer = 0;
    
    //this.creatingRollsTimer = 0;
    this.score = 1;
    this.fallingPoos = [];
    this.fallingRolls = [];
    this.loo = new Loo(this);
    //console.log(this.creatingPoosTimer, this.fallingPoos, this.fallingRolls)
    //this.score = 0;
  }

  replay() {
    document.getElementById("objective").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("game-canvas").style.display = "block";
    //this.clearScreen();
    this.reset();
    this.gameIsPlaying = true;
    this.loop();
  }

/*   loadResourcesCheck() {
    //this.fallingObjects.load();
    if (this.background.load() && this.loo.load() && this.fallingObjects.load() ) {
      console.log("images loaded");
      return true;
    }
  } */

  gameOver() {
    //this.clearScreen();
    document.getElementById("game-canvas").style.display = "none";
    document.getElementById("game-over").style.display = "block";
    this.gameIsPlaying = false;
    this.gameOver = new GameOver();
    //this.gameOver.draw();
    
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

      }
    });
  }
  
  
  createFallingObjects(timestamp) {
    // create array of falling objects
    const fallingPoo = new FallingObject(this, Math.floor(Math.random() * this.$canvas.width), 0, 80, 80, 2, 0.04, '/images/poo_1.png');
    const fallingRoll = new FallingObject(this, Math.floor(Math.random() * this.$canvas.width), 0, 50, 50, 4, 0, '/images/TP.png');
    if (this.creatingPoosTimer < (timestamp - this.creatingPoosInterval) ) {
      //console.log(`timestamp is ${timestamp}`)
      //console.log(`this.creatingPoosTimer is ${this.creatingPoosTimer}`)
      this.creatingPoosTimer = timestamp;
      //console.log(`this.creatingPoosTimer is ${this.creatingPoosTimer}, timestamp is ${timestamp}`);
      this.fallingPoos.push(fallingPoo);
      this.fallingRolls.push(fallingRoll);
/*       if (this.creatingPoosTimer % 3 < 1 ) {
        //this.creatingRollsTimer = timestamp;
        console.log(this.creatingPoosTimer)
        console.log(`this.creatingPoosTimer % 3 is ${this.creatingPoosTimer % 3}`)
        this.fallingRolls.push(fallingRoll);
      } */
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
        //remove item from array
        ObjectArray.splice(i, 1);
        // win a point
        this.score++;
        //console.log('you caught the poo! add 1 point');
        
      } else if (collidedFloor) {
        //remove item from array
        ObjectArray.splice(i, 1);
        // lose a point
        this.score--;
        //console.log('SPLAT! poo hit the ground. remove 1 point');
      }
    }

  }

  updateTimerAndRemoveRolls() {
    const RollsArray = this.fallingRolls;
    const PoosArray = this.fallingPoos;
    
    for (let m = 0; m < RollsArray.length - 1; m++) {
      const collidedLooRoll = RollsArray[m].checkCollisionLoo();
      const collidedFloorRoll = RollsArray[m].checkCollisionGround();
      //console.log(RollsArray[m].x, RollsArray[m].y);
      if (collidedLooRoll) {
        //remove item from array
        RollsArray.splice(m, 1);
        //reduce speedY of poo 
        for (const poo of PoosArray) {
          if (this.elapsedTime > 8000)
          console.log(`speed of poo is ${poo.speedY}`);
          poo.speedY -= 0.01;
        };



       console.log('you caught the roll! :-) ');
        //console.log(`m ${m} was removed`);
      } else if (collidedFloorRoll) {
        //remove item from array
        RollsArray.splice(m, 1);
        // nothing gained, nothing lost
        //console.log('awwww! roll hit the ground :-( ');
      }
    }
  }

  clearScreen() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  }

  runLogic(timestamp) {
    this.elapsedTime = Date.now()- this.startTime;
    for (const roll of this.fallingRolls) {
      //console.log(element.x, element.y)
      roll.runLogic();
    }
    for (const poo of this.fallingPoos) {
      //console.log(element.x, element.y)
      poo.runLogic();
    }
    
    this.updateTimerAndRemoveRolls();
    this.addScoreAndRemovePoos() ;
    this.createFallingObjects(timestamp);
    //this.createFallingRolls(timestamp);
    
    if (this.score <= 0) {
      this.gameOver(this);
      console.log('Game Over')
    }
    
  }

  draw() {
    this.clearScreen();

    this.background.draw();
    //console.log(this.fallingObjects);

    for (const roll of this.fallingRolls) {
      //console.log(element);
      roll.draw();
    };
    for (const poo of this.fallingPoos) {
      //console.log(element);
      poo.draw();
    };
    this.loo.draw();
    //his.poos.draw();
    this.scoreBoard.draw();

  }

  loop(timestamp) {
    this.runLogic(timestamp);
    //console.log(timestamp)
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