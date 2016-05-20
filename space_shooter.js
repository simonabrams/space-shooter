/**
 * Define an object to hold all our images for the game so images are only created once.
 * This is called a singleton.
 */

 var imageRepository = new function() {
    this.background = new Image();
    this.spaceship = new Image();
    this.bullet = new Image();

    var numImages = 3;
    var numLoaded = 0;

    function imageLoaded() {
      numLoaded++;
      if (numLoaded === numImages) {
        window.init();
      }
    }

    this.background.onload = function() {
      imageLoaded();
    }

    this.spaceship.onload = function() {
      imageLoaded();
    }

    this.bulet.onload = function() {
      imageLoaded();
    }

    // set images src
    this.background.src = "images/bg.png";
    this.spaceship.src = "images/spaceship.png";
    this.bullet.src = "images/bullet.png";
 }

 /**
  * Drawable object - base class for all drawable objects in the game.
  * Sets up default variables as well as default functions.
  */

  function Drawable() {
    this.init = function(x, y, width, height) {
        // default variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    // define abstract function to be implemented in child objects
    this.draw = function() {}
  }

  /**
   * Background object - becomes a child of the Drawable object.
   */

   function Background() {
    this.speed = 1;
    this.draw = function() {
        // pan the background image
        this.y += this.speed;
        // draw the bg image
        this.context.drawImage(imageRepository.background, this.x, this.y);
        // duplicate the bg image at the top edge of the first one
        this.context.drawImage(imageRepository.background, this.x, this.y -this.canvasHeight);

        // if we scroll off the screen, reset
        if (this.y >= this.canvasHeight) this.y = 0;
    }
   }

   Background.prototype = new Drawable();

   /**
    * Create the Game object - holds all objects and data for the game
    */

    function Game() {
        /*
         * Gets canvas information and sets up all game objects.
         * Returns true if canvas is supported and fails if not.
         */
         this.init = function() {
            // Get the canvas element
            this.bgCanvas = document.getElementById('background');
            // canvas support check
            if (this.bgCanvas.getContext) {
                this.bgContext = this.bgCanvas.getContext('2d');
                // initialize objects to contain context and canvas information
                Background.prototype.context = this.bgContext;
                Background.prototype.canvasWidth = this.bgCanvas.width;
                Background.prototype.canvasHeight = this.bgCanvas.height;
                
                // initialize bg object
                this.background = new Background();
                this.background.init(0, 0);
                
                return true;

            } else {
                return false;
            }
         };

         // start animation loop
         this.start = function() {
            animate();
         }
    }

/**
 * Animation loop - calls requestAnimationFrame
 */

 function animate() {
    requestAnimationFrame( animate );
    game.background.draw();
 }

/**
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop,
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
            };
})();


/**
 * Initialize the game and start it
 */

 var game = new Game();

 function init() {
    if (game.init()) game.start();
 }



