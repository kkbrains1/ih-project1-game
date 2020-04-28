
class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = $canvas.getContext('2d');
    this.setKeyBindings();
    this.background = new Background(this);
    this.fallingObjects = [];
    this.loo = new Loo(this);

  }

  start () {
    this.createFallingObjects();

    // Loop
    this.loop();
  }

  setKeyBindings() {
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
    const fallingObject = new FallingObject(this, Math.floor(Math.random() * this.$canvas.width), 0);
    for (let i = 0; i < fallingObject.length; i++) {
      if (fallingObject[i-1].y - fallingObject[i].y > 50);
    } this.fallingObjects.push(fallingObject);
    //console.log(`new object x ${fallingObject.x} and y ${fallingObject.y}`);
    console.log(this.fallingObjects);
/*     setTimeout(() => {
      
      this.createFallingObjects();
      console.log(`new object x ${fallingObject.x} and y ${fallingObject.y}`);
   }, 2000)     */
    
  }


  clearScreen() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
  }

  runLogic() {
     for (const element of this.fallingObjects) {
      //console.log(element.x, element.y)
      element.runLogic();
    }
    this.createFallingObjects();
  }

  draw() {
    this.clearScreen();

    this.background.draw();
    //console.log(this.fallingObjects);
    for (const element of this.fallingObjects) {
      //console.log(element);
      element.draw();
    };
    //this.poos.draw();
    this.loo.draw();
    

  }

  loop () {
    this.runLogic();
    this.draw();
    setTimeout(() => {
      this.loop();
    }, 3000)
  }

}