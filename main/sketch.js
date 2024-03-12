/*

Keagan Suah - The Game Project

Game project submission

This file consist the draw, setup, keypressed and keyreleased, and diffculty selections

Table of Contents
    1 Variables
        1.1 Objects Variables- line 32
        1.2 Character Variables - line 42
        1.3 Display Variables - line 62
        1.4 Game Functions Variables - line 72
        1.5 Splash Screens Variables - line 84
        1.6 Sound Variables - line 92
    2 P5.JS Functions - line 100
        2.1 Preload - line 102
        2.2 Setup - line 133
        2.3 Draw - line 156
        2.4 Key Pressed - line 257
        2.5 Key Released - line 343
        2.6 Mouse Pressed - line 355
    3 Difficulty Function - line 439
        3.1 Start Game Function - line 441
        3.2 Easy Set up - line 536
        3.3 Medium Set up - line 560
        3.4 Hard Set up - line 595

*/

////////////// Objects Variable ///////////////////
// Object Variables
var grassX_pos;
var floorPos_y;
var smallTreeY_pos;
var bigTreeY_pos;
var rocksInSoilY_pos;
// Game Enemies
var enemies;

////////////// Character Variables ///////////////////
// Character Variables and actions
var gameChar_x;
var gameChar_y;
var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
// jumpinng effect
var jumpVelocity = 0;
var jumpAcceleration = 0;
// death animation effect
var death;
var deathCountDown;
var deathHopVelocity;
// Camera position
var cameraPosX = 0;
// shiny stars trail on game character
var emit;

////////////// Display variables ///////////////////
// live hover
var hoverObject = 10;
var hoverBoolean = true;
// Creating a glowing effect on words
var glowing = 255;
var GlowIncrement = -2.5;
// Sin angle variable for game Title
var angle;

////////////// Game Function variables ///////////////////
// Game score and time limit
var game_score;
var timeLimit;
// Winning count down timer
var winCountDown;
// difficulty
var gameDifficulty;
var difficultySelection;
// game distance
var gameDistance;

////////////// Splash Screens Variables ///////////////////
// respawn animation splashscreen
var respawnTime;
var blackscreenalapha;
// starting splash screen
var startingScreen;
var titleAlapha = 1000;

////////////// Sounds Variables ///////////////////
// sound effects
var jumpSound;
var winningsound;
// Game Pause & start, music stop & play
var musicState;
var pauseState;

////////////// Game Functionality and Controls ///////////////////
// preload sound effects for game
function preload() {
  // Acceptable sound formates
  soundFormats("mp3", "wav");
  // Jump Sound
  jumpSound = loadSound("assets/jump.mp3");
  jumpSound.setVolume(0.5);
  // Death sound effect
  deathsound = loadSound("assets/death.mp3");
  deathsound.setVolume(0.8);
  // Collecting collectable
  collectsound = loadSound("assets/collect.mp3");
  collectsound.setVolume(0.5);
  // background music
  themesong = loadSound("assets/themesong.mp3");
  themesong.setVolume(0.15);
  // Winning sounds
  winsound = loadSound("assets/win.mp3");
  winsound.setVolume(0.8);
  flagrise = loadSound("assets/flagrise.mp3");
  flagrise.setVolume(0.5);
  // walking sound for grass and platform
  walkGrass = loadSound("assets/walkGrass.mp3");
  walkGrass.setVolume(0.2);
  walkPlat = loadSound("assets/walkPlat.mp3");
  walkPlat.setVolume(0.2);

  /*sounds loaded here
  Sound effects obtained from https://www.zapsplat.com
  */
}
// Main setup of game
function setup() {
  createCanvas(1024, 576);
  frameRate(60);

  ////////////// Object Variables ///////////////////
  floorPos_y = (height * 3) / 4;
  lives = 3;
  // Particle effect setup for Cinderella to have sparkle trail
  emit = new Emitter(gameChar_x, gameChar_y, 0, -0.1, 3, 255, 225);
  emit.startEmitter(35, 500);
  // Used in the starting screen
  startingScreen = true;

  ////////////// Game Function variables ///////////////////
  // Inital Game difficulty, can be change at the difficulty selection
  difficultySelection = true;
  gameDifficulty = 1;
  // Game start & pause, music start & play
  musicState = true;
  // reset the setup each time to restart the game
  startGame();
}
// Draw and display game items, constant loop
function draw() {
  ////////////// Non-Movable Object Design ///////////////////
  // Function to make glowing effect of RGB by altering the alpha
  glowingText();
  // Function to make objects hover up and down
  objectHover();
  // gradient background
  gameBackground();
  // Stars using factory method
  // ES6 loop can be used to shorten the condition to iterate through each object in the array
  for (let star of Stars) {
    star.draw();
  }

  ////////////// Camera Function to track player ///////////////////
  push();
  translate(-cameraPosX, 0);
  // Allows the Camera to track our game character
  cameraPosX = gameChar_x - 512;

  ////////////// Movable Object Design ///////////////////
  // Mountain
  drawMountains();
  // glowingMoon in front of mountains
  drawMoon();
  //clouds
  drawClouds();
  // Ground Platform Design and Grass
  drawGround();
  // Trees
  drawSmallTrees();
  drawBigTrees();

  ////////////// Interactable Object Design ///////////////////
  // Destination design, castle design
  renderFlagpole();
  // Canyon design and interaction condition
  // ES6 loop can be used to shorten the condition to iterate through each object in the array
  for (let canyon of canyons) {
    // loop throught the number of objects in the array
    drawCanyon(canyon);
    checkCanyon(canyon);
  }
  // Collectable Items design and interection condition
  // ES6 loop can be used to shorten the condition to iterate through each object in the array
  for (let collectable of collectables) {
    // loop throught the number of objects in the array
    drawCollectable(collectable);
    checkCollectable(collectable);
  }
  // Platform Design using factory method
  // ES6 loop can be used to shorten the condition to iterate through each object in the array
  for (let platform of platforms) {
    // loop throught the number of objects in the array
    platform.draw();
    platform.move(platform.checkContact(gameChar_x, gameChar_y));
  }
  // Enemies Design using constructor Functions
  // ES6 loop can be used to shorten the condition to iterate through each object in the array
  for (let enermy of enemies) {
    // loop throught the number of objects in the array
    enermy.draw();
  }

  ////////////// Character Design ///////////////////
  changeCharDesign();
  // End camera function
  pop();

  ////////////// Game Completion ///////////////////
  if (flagpole.isReached == false) {
    checkFlagpole();
  }
  // display game completion table
  levelCompleted();

  ////////////// Game Display and SplashScreen ///////////////////
  // instuctions screen before every game
  instructionScreen();
  // fading screen when game first begin
  startSplashScreen();
  // Game score, lives and time
  drawScoreLives();

  ////////////// Game, Music Pause & Play ///////////////////
  if (!startingScreen) {
    pausePlayButton();
    musicButton();
  }

  ////////////// Character Movement and Interaction ///////////////////
  // Game character moving left and right
  characterMovement();
  // Real life jumping
  jumpingPhysics();
  // death condition
  checkPlayerDie();
  // death animation
  playerDieAnimation();
}
// Keyboard and Mouse controls
function keyPressed() {
  // if statements to control the animation of the character when keys are pressed. Allows both WASD, ArrowKeys and capslock to play the game

  // Left Arrow or "A" to move left
  if (
    (key.toLowerCase() == "a" || keyCode == "37") &&
    !isPlummeting &&
    !death &&
    winCountDown >= 60 * 2 &&
    !startingScreen &&
    !pauseState
  ) {
    isLeft = true;
  }

  // Right Arrow or "d" to move left
  else if (
    (key.toLowerCase() == "d" || keyCode == "39") &&
    !isPlummeting &&
    !death &&
    winCountDown >= 60 * 2 &&
    !startingScreen &&
    !pauseState
  ) {
    isRight = true;
  }

  // Down Arrow or "S" to drop down platform
  else if (
    (key.toLowerCase() == "s" || keyCode == "40") &&
    !isPlummeting &&
    !death &&
    winCountDown >= 60 * 2 &&
    gameChar_y < floorPos_y &&
    !pauseState
  ) {
    gameChar_y += 5;
  }

  // Up Arrow or "W" to jump
  else if (
    (key.toLowerCase() == "w" || keyCode == "38") &&
    jumpVelocity <= 0 &&
    !isFalling &&
    !isPlummeting &&
    !death &&
    winCountDown >= 60 * 2 &&
    !startingScreen &&
    !pauseState
  ) {
    jumpVelocity += 100;
    jumpAcceleration += 17;
    // jump sound
    jumpSound.play();
  }

  // Press "Spacebar" to start/Restart the game
  else if (
    keyCode == "32" &&
    (lives < 1 ||
      flagpole.isReached == true ||
      (startingScreen == true && difficultySelection == false))
  ) {
    themesong.stop();
    if (startingScreen == true) {
      startingScreen = false;
      lives = 3;
      startGame();
    } else if (startingScreen == false) {
      startingScreen = true;
      titleAlapha = 1000;
      lives = 3;
      difficultySelection = true;
      startGame();
    }
  }

  // Press "Q" To go back to difficulty selection at the instructions screen
  else if (
    key.toLowerCase() == "q" &&
    startingScreen == true &&
    difficultySelection == false
  ) {
    difficultySelection = true;
  }
}
function keyReleased() {
  // if statements to control the animation of the character when keys are released.

  // Left movement
  if ((key.toLowerCase() == "a" || keyCode == "37") && !pauseState) {
    isLeft = false;
    // Right movement
  } else if ((key.toLowerCase() == "d" || keyCode == "39") && !pauseState) {
    isRight = false;
  }
}
// all functions below are created myself without assistance
function mouseClicked() {
  // Difficulty selection at the start of the screen
  if (difficultySelection == true) {
    // selecting difficulty boxes interactions
    for (let i = 0; i < 3; i++) {
      if (
        mouseX > width / 2 - 405 + 280 * i &&
        mouseX < width / 2 - 405 + 280 * i + 250 &&
        mouseY > 460 &&
        mouseY < 460 + 80
      ) {
        gameDifficulty = i + 1;
        difficultySelection = false;
      }
    }
  }

  // Muting music button at the bottom left, only applicable when game start
  else if (
    !startingScreen &&
    mouseX > 15 &&
    mouseX < 60 &&
    mouseY > height - 50 &&
    mouseY < height - 20
  ) {
    if (musicState) {
      musicState = false;
      themesong.pause();
    } else {
      musicState = true;
      themesong.play();
    }
  }

  // pause button at the bottom left beside the music button, freeze game when pressed, only applicable when game start
  else if (
    !startingScreen &&
    mouseX > 55 &&
    mouseX < 90 &&
    mouseY > height - 50 &&
    mouseY < height - 20 &&
    !death &&
    winCountDown >= 120
  ) {
    if (!pauseState) {
      pauseState = true;
    } else {
      pauseState = false;
      isLeft = false;
      isRight = false;
    }
  }
  // when pause game, player are given the option to resume game, restart game or go back to the instruction screen
  if (pauseState) {
    for (let i = 0; i < 3; i++) {
      if (
        mouseX > width / 2 - 125 &&
        mouseX < width / 2 - 125 + 250 &&
        mouseY > 120 + 130 * i &&
        mouseY < 120 + 130 * i + 80
      ) {
        isLeft = false;
        isRight = false;
        // resume game
        if (i == 0) {
          pauseState = false;
          // restart game
        } else if (i == 1) {
          themesong.stop();
          startGame();
          // back to main menu
        } else if (i == 2) {
          themesong.stop();
          startingScreen = true;
          titleAlapha = 1000;
          lives = 3;
          difficultySelection = true;
          startGame();
        }
      }
    }
  }
}

////////////// Reset Game with Difficulty ///////////////////
// function below are created with coursera assistance
function startGame() {
  ////////////// Game Function variables ///////////////////
  angle = 0;
  game_score = 0;
  // winning sound
  winningsound = false;
  // game distance
  gameDistance = width * (gameDifficulty + 1);
  // the state of the game, pause or start, set pause game to false first
  pauseState = false;
  // Reset winning count down, same as death countdown
  winCountDown = 60 * 2;
  // start to loop the music when the game start
  if (startingScreen == false && musicState) {
    themesong.loop();
  }

  ////////////// Objects Variable ///////////////////
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;
  isPlummeting = false;
  // death animation effect
  death = false;
  // 60 is equal to 1 second, animation delay is half a second
  deathCountDown = 45;
  deathHopVelocity = 12;
  //  Respawn after death
  respawnTime = 200;
  // death splash screen
  blackscreenalapha = 255;

  ////////////// Objects Variable ///////////////////
  // star array
  Stars = [];
  // Creation of Stars, 1200 stars in sky
  for (let i = 0; i < 1200; i++) {
    // Generate random postion for the stars accross the canvas and insert to stars array
    Stars.push(createStars(random(-100, width), random(height / 2)));
  }
  // glowingMoon design
  glowingMoon = { x_pos: 881, y_pos: 150 };
  // Generation of Grass and Rocks in the Soil
  grassX_pos = -200;
  rocksInSoilY_pos = 520;
  rocksInSoil_x = [];
  for (let numRocks = 0; numRocks < round(gameDistance / 230, 2); numRocks++) {
    rocksInSoil_x.push(0 + 330 * numRocks);
  }
  // Generation of Trees (Big and Small)
  smallTreeY_pos = 305;
  smallTree_x = [];
  bigTreeY_pos = 250;
  bigTree_x = [];
  for (let i = 0; i < round(gameDistance / 500, 2) + 2; i++) {
    smallTree_x.push([random(100, 400) + i * 500]);
    bigTree_x.push([smallTree_x[i][0] + 100]);
  }
  // clouds array of Objects
  clouds = [];
  // Generate many random clouds into the array
  for (let i = 0; i < round(gameDistance / 400, 2); i++) {
    clouds.push({
      x_pos: random(100, 300) + i * 400,
      y_pos: random(85, 155),
      size: random(5, 50),
    });
  }
  // mountains array of Objects
  mountains = [
    { x_pos: width / 2 - 200, y_pos: height / 2, size: 30 },
    { x_pos: width - 200, y_pos: height / 2, size: -100 },
    { x_pos: width + 400, y_pos: height / 2, size: -100 },
  ];
  // platform array
  platforms = [];
  // Enemies array
  enemies = [];
  // array of canyon Object
  canyons = [];
  // array of Collectable Object
  collectables = [];
  // Game destination
  flagpole = { x_pos: gameDistance, isReached: false, y_pos: floorPos_y };

  ////////////// Game Difficulty variables ///////////////////
  // Generate the difficulty of the game
  if (gameDifficulty == 1) {
    difficultyEasy();
  } else if (gameDifficulty == 2) {
    difficultyMedium();
  } else if (gameDifficulty == 3) {
    difficultyHard();
  }
}
// all functions below are created myself without assistance
function difficultyEasy() {
  // 60 is equal to 1 second, therefore this is 30 seconds
  timeLimit = 60 * 35;
  // Generation of canyon Object
  canyons.push(
    { x_pos: 695, y_pos: 500, width: 100 },
    { x_pos: 645 + 500, y_pos: 500, width: 150 },
    { x_pos: 645 + 1000, y_pos: 500, width: 100 }
  );
  // Generation of Collectable Object
  // size range from 0 to 10
  collectables.push(
    { x_pos: 800, y_pos: 423, size: 1, isFound: false },
    { x_pos: 800 + 500, y_pos: 423, size: 1.1, isFound: false },
    { x_pos: 800 + 1000, y_pos: 423, size: 1.2, isFound: false }
  );
  // Generate Platform positions
  platforms.push(
    createPlatforms(800, floorPos_y - 100, 200, 150, 1),
    createPlatforms(1400, floorPos_y - 100, 200, 100, 1)
  );
  // Generate Enemies positions
  enemies.push(new Enemy(1250, floorPos_y, 300, 1));
}
function difficultyMedium() {
  // 60 is equal to 1 second, therefore this is 30 seconds
  timeLimit = 60 * 45;
  // Generation of canyon Object
  canyons.push(
    { x_pos: 745, y_pos: 500, width: 150 },
    { x_pos: 745 + 500, y_pos: 500, width: 300 },
    { x_pos: 745 + 1000, y_pos: 500, width: 100 },
    { x_pos: 445 + 2000, y_pos: 500, width: 150 }
  );
  // Generation of Collectable Object
  // size range from 0 to 10
  collectables.push(
    { x_pos: 780, y_pos: floorPos_y - 178, size: 0.9, isFound: false },
    { x_pos: 1100, y_pos: floorPos_y - 258, size: 0.9, isFound: false },
    { x_pos: 1450, y_pos: floorPos_y - 8, size: 1, isFound: false },
    { x_pos: 2100, y_pos: floorPos_y - 8, size: 1.1, isFound: false },
    { x_pos: 2700, y_pos: floorPos_y - 8, size: 1.2, isFound: false }
  );
  // Generate Platform positions
  platforms.push(
    createPlatforms(900, floorPos_y - 100, 200, 100, 1),
    createPlatforms(750, floorPos_y - 170, 100, 0, 0),
    createPlatforms(900, floorPos_y - 250, 300, 0, 0),
    createPlatforms(1300, floorPos_y - 100, 200, 200, 2),
    createPlatforms(2000, floorPos_y - 100, 200, 0, 0)
  );
  // Generate Enemies positions
  enemies.push(
    new Enemy(900, floorPos_y, 200, 1),
    new Enemy(1000, floorPos_y - 100, 100, 1),
    new Enemy(1400, floorPos_y, 200, 1),
    new Enemy(2000, floorPos_y, 300, 2)
  );
}
function difficultyHard() {
  // 60 is equal to 1 second, therefore this is 30 seconds
  timeLimit = 60 * 55;
  // Generation of canyon Object
  canyons.push(
    { x_pos: 745, y_pos: 500, width: 150 },
    { x_pos: 745 + 500, y_pos: 500, width: 300 },
    { x_pos: 745 + 1000, y_pos: 500, width: 100 },
    { x_pos: 445 + 2000, y_pos: 500, width: 150 },
    { x_pos: 3150, y_pos: 500, width: 950 }
  );
  // Generation of Collectable Object
  // size range from 0 to 10
  collectables.push(
    { x_pos: 780, y_pos: floorPos_y - 108, size: 0.9, isFound: false },
    { x_pos: 950, y_pos: floorPos_y - 178, size: 0.9, isFound: false },
    { x_pos: 1050, y_pos: floorPos_y - 268, size: 1, isFound: false },
    { x_pos: 1450, y_pos: floorPos_y - 8, size: 1.1, isFound: false },
    { x_pos: 2100, y_pos: floorPos_y - 8, size: 1.2, isFound: false },
    { x_pos: 2750, y_pos: floorPos_y - 178, size: 1, isFound: false },
    { x_pos: 3350, y_pos: floorPos_y - 18, size: 0.9, isFound: false }
  );
  // Generate Platform positions
  platforms.push(
    createPlatforms(900, floorPos_y - 170, 350, 0, 0),
    createPlatforms(750, floorPos_y - 100, 100, 0, 0),
    createPlatforms(1000, floorPos_y - 260, 100, 0, 0),
    createPlatforms(1300, floorPos_y - 100, 200, 200, 2),
    createPlatforms(2000, floorPos_y - 100, 200, 0, 0),
    createPlatforms(2600, floorPos_y - 100, 80, 0, 0),
    createPlatforms(2700, floorPos_y - 170, 80, 0, 0),
    createPlatforms(2800, floorPos_y - 100, 120, 200, 1),
    createPlatforms(3100, floorPos_y - 10, 150, 300, 2)
  );
  // Generate Enemies positions
  enemies.push(
    new Enemy(900, floorPos_y, 200, 1),
    new Enemy(1000, floorPos_y - 170, 100, 1),
    new Enemy(1400, floorPos_y, 200, 1),
    new Enemy(2000, floorPos_y, 300, 2)
  );
}
