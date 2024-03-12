/*

Keagan Suah - The Game Project

Game project submission

This file consist of the functions that beautify the game asethetics

Table of Contents
    1 Game Display Beautifier - line 30
        1.1 Draw lives, scores and time limit - line 32
        1.2 Level Completed Display - line 71
        1.3 Glowing Text Conditions - line 84
        1.4 Object Hover Conditions - line 93
        1.5 Mute Music Button Design - line 107
        1.6 Pause Play Button Design - line 126
    2 Splash Screens - line 187
        2.1 Instructions Screen Design - line 189
        2.2 Loading Screen Design - line 412
        2.3 Small Splash Screen - line 457
        2.4 Starting Screen Design - line 475
        2.5 Life Left Splash Screen - line 485
        2.6 Completed Splash Screen - line 500
        2.7 Grading Condition - line 528
        2.8 Moving Flag Design - line 546
        2.8 Grading Conditon - line 559

*/

////////////// Game Display Beautifier ///////////////////
// all functions below are created myself without assistance
function drawScoreLives() {
  // only display when the game is in process, not showing when at instruction page and when flagpole is reached
  if (!startingScreen && !flagpole.isReached) {
    // Overall font of Collectables and timing
    textFont("MedievalSharp");
    strokeWeight(1);

    // Game Score display
    fill(0, 70);
    stroke(0);
    rect(25, 15, 130, 50, 10);
    collectableDesign(50, 47, 0.8);
    textSize(24);
    text(game_score + " / " + collectables.length, 90, 50);

    // Game time limit display
    fill(0, 100);
    rect(width / 2 - 75, 15, 160, 50, 10);
    textSize(20);
    fill(255);
    text("Midnight in " + round(timeLimit / 60, 2) + "s", width / 2 - 60, 50);
    // check if player have not reached flag pole
    if (winCountDown >= 120 && !death && !startingScreen && !pauseState) {
      timeLimit -= 1;
    }

    // Game Lives display
    fill(0, 70);
    rect(870, 15, 130, 50, 10);
    for (let i = 0; i < lives; i++) {
      if (i == lives - 1) {
        // make the object hover up and down
        characterDesign(895 + i * 40, 100 - hoverObject, "half");
      } else {
        characterDesign(895 + i * 40, 100, "half");
      }
    }
  }
}
function levelCompleted() {
  // function to display the table, stop player movement and play winning sound
  if (flagpole.isReached == true) {
    isLeft = false;
    isRight = false;
    // the level complete table is displayed when player reached the end
    completedSplashScreen();
    if (winningsound == false) {
      winsound.play();
      winningsound = true;
    }
  }
}
function glowingText() {
  // To create glowing text that fade away and fade back
  glowing += GlowIncrement;
  if (glowing == 150) {
    GlowIncrement = 2.5;
  } else if (glowing == 255) {
    GlowIncrement = -2.5;
  }
}
function objectHover() {
  // to increment or decrease the height of object, creating a hover effect
  if (hoverBoolean == true) {
    hoverObject -= 0.25;
  } else if (hoverBoolean == false) {
    hoverObject += 0.25;
  }
  // to alternate the increment and decrease
  if (hoverObject == 0) {
    hoverBoolean = false;
  } else if (hoverObject == 10) {
    hoverBoolean = true;
  }
}
function musicButton() {
  // display the mute music button at the bottom of the screen
  fill(255);
  stroke(255);
  rect(25, height - 50, 20, 4);
  rect(25, height - 50, 2, 25, 4);
  rect(25 + 20, height - 50, 2, 25, 4);
  ellipse(23, height - 28, 10, 10);
  ellipse(23 + 20, height - 28, 10, 10);
  // design below to show when the music is muted
  if (!musicState) {
    fill(0, 0);
    stroke(0);
    strokeWeight(4);
    ellipse(34, height - 35, 40, 40);
    line(23, 525, 47, 555);
  }
  strokeWeight(1);
}
function pausePlayButton() {
  // function to pause the game when the pause button is clicked
  if (pauseState) {
    // play button design
    fill(0, 100);
    strokeWeight(0);
    rect(0, 0, width, height);
    fill(255);
    triangle(70, height - 50, 70, height - 23, 70 + 17, height - 37);
    // variable for the pause menu text boxes
    var boxesText = "";
    // loop 3 times to display the resume, restart and go to main menu boxes
    for (let i = 0; i < 3; i++) {
      if (i == 0) {
        boxesText = "Resume";
      } else if (i == 1) {
        boxesText = "Restart";
      } else if (i == 2) {
        boxesText = "Main Menu";
      }
      if (
        mouseX > width / 2 - 125 &&
        mouseX < width / 2 - 125 + 250 &&
        mouseY > 120 + 130 * i &&
        mouseY < 120 + 130 * i + 80
      ) {
        // if the plater hover on the boxes, it will have the hover effect
        stroke(0, 246, 255);
        strokeWeight(3);
        fill(255, glowing);
        rect(width / 2 - 125, 115 + 130 * i, 260, 90, 20);
      }
      // else it will remain constant at here
      else {
        stroke(0, 246, 255);
        strokeWeight(3);
        fill(255, 240);
        rect(width / 2 - 120, 120 + 130 * i, 250, 80, 20);
      }
      // to show the texts on the boxes
      strokeWeight(2);
      textSize(36);
      fill(0);
      stroke(0);
      if (i == 2) {
        text(boxesText, 435, 170 + 130 * i);
      } else {
        text(boxesText, 465, 170 + 130 * i);
      }
    }
  } else {
    // pause button design
    strokeWeight(0);
    fill(255);
    rect(70, height - 50, 7, 28, 2);
    rect(70 + 12, height - 50, 7, 28, 2);
  }
  // reset the stroke weight
  strokeWeight(1);
}

////////////// Splash Screens ///////////////////
// all functions below are created myself without assistance
function instructionScreen() {
  // instruction for player when they play the game, will not have it subsequently
  if (startingScreen == true) {
    // Cover the entire game first to show instructions of the game
    fill(28, 85, 143);
    rect(0, 0, width, height);
    // Game Play Instruction
    textSize(30);
    fill(255);
    textFont("cursive");
    text("Instructions", 35, 45);

    ////////////// Left-side Instruction (Game Controls) ///////////////////
    // Font size and type for all text
    textFont("MedievalSharp");
    textSize(16);
    fill(255);
    noStroke();

    // Text to inform player to avoid enemy and use platform to advantage
    text(
      "Oh no! Help Cinderella reach the castle, avoid her stepmother, and don't fall into the canyon. Use platforms to assist Cinderella.",
      35,
      80,
      400
    );

    // Drawing of the enemy with red cross on the character informing the player to avoid
    new Enemy(320, 200, 1, 1).draw();
    strokeWeight(3);
    stroke(255, 0, 0);
    line(292, 120, 342, 210);
    line(292, 210, 342, 120);

    // Drawing of the platform with green circle on it informing the player to use
    strokeWeight(1);
    createPlatforms(70, 150, 100).draw();
    stroke(0, 255, 0);
    fill(0, 0);
    ellipse(120, 160, 120, 60);
    stroke(0);
    strokeWeight(0);

    // keyboard Controls
    fill(220);
    // WASD
    rect(100, 235, 40, 40, 3);
    rect(100, 285, 40, 40, 3);
    rect(50, 285, 40, 40, 3);
    rect(150, 285, 40, 40, 3);
    // arrowkey
    rect(300, 235, 40, 40, 3);
    rect(300, 285, 40, 40, 3);
    rect(250, 285, 40, 40, 3);
    rect(350, 285, 40, 40, 3);
    // key face
    fill(255);
    // WASD
    rect(105, 240, 30, 30, 3);
    rect(105, 290, 30, 30, 3);
    rect(55, 290, 30, 30, 3);
    rect(155, 290, 30, 30, 3);
    // arrowkey
    rect(305, 240, 30, 30, 3);
    rect(305, 290, 30, 30, 3);
    rect(255, 290, 30, 30, 3);
    rect(355, 290, 30, 30, 3);
    // keyboard letter
    fill(100);
    noStroke();
    textFont("Arial");
    text("W", 113, 260);
    text("S", 115, 310);
    text("A", 65, 310);
    text("D", 165, 310);
    text("↑", 316, 260);
    text("↓", 316, 310);
    text("←", 260, 310);
    text("→", 362, 310);
    textFont("MedievalSharp");
    noStroke();
    fill(255);
    textSize(14);
    // Display the text of what each key does
    text("Jump", 105, 230);
    text("Drop", 105, 340);
    text("Left", 55, 340);
    text("Right", 155, 340);
    text("Jump", 305, 230);
    text("Drop", 305, 340);
    text("Left", 255, 340);
    text("Right", 355, 340);

    ////////////// Right-side Instruction (Game aspect and conditon) ///////////////////
    // timer instruction
    fill(0, 100);
    rect(550 - 15, 100 - 40, 160, 50, 10);
    textSize(20);
    fill(255);
    text("Midnight in 0s", 550, 95);
    textSize(16);
    fill(255);
    noStroke();
    text(
      "Watch out for the timer, if it hits midnight, Cinderella loses a life.",
      720,
      80,
      300
    );

    // live instruction
    characterDesign(650, 220, "half");
    textSize(16);
    fill(255);
    noStroke();
    text(
      "Cinderella has lives represented by her head, she loses one if she falls or is caught by the stepmother.",
      720,
      150,
      300
    );

    // collectable instruction
    noStroke();
    collectableDesign(650, 250, 1);
    textSize(16);
    fill(255);
    text(
      "Collect all Cinderella's glass shoes to enter the castle, and each shoe boosts her speed.",
      720,
      230,
      300
    );

    // Grading instructions and guide
    fill(255, 215, 0);
    textSize(50);
    text("★", 630, 315);
    textSize(16);
    fill(255);
    text(
      "The stars reflect your grade; you lose one star for each life you lose or finish in less than 15 seconds.",
      720,
      290,
      300
    );

    ////////////// Difficulty Selection ///////////////////
    // Show 3 difficulties boxes for the player to select
    if (difficultySelection == false) {
      // When the player has selected difficulty, they can press spacebar to start
      noStroke();
      fill(220, glowing);
      rect(width / 2 - 100, 460, 200, 40, 3);
      fill(255, glowing);
      // glowing variable to make the entire text fade in and out continuosly
      textSize(32);
      text("Press", 316, 490);
      text("to start", 626, 490);
      rect(width / 2 - 95, 465, 190, 30, 3);
      textSize(18);
      text("press Q to go back to selection", 405, 530);
      fill(100, glowing);
      text("SPACEBAR", width / 2 - 45, 485);
    }
    // Create 3 boxes for player to select difficulty
    else {
      textSize(26);
      text("Select your difficulty", 115, 440);
      // variables to loop through and change the text and colour of the boxes
      var boxesText = "";
      var textColour = color(0, 0, 0);
      // loop 3 times to create 3 boxes with 3 difficulties of easy, medium and hard
      for (let i = 0; i < 3; i++) {
        // to set the variable according to the loop index to create 3 boxes with different texts
        if (i == 0) {
          boxesText = "Easy";
          textColour = color(45, 201, 55);
        } else if (i == 1) {
          boxesText = "Medium";
          textColour = color(231, 180, 22);
        } else if (i == 2) {
          boxesText = "     Hard";
          textColour = color(204, 50, 50);
        }
        if (
          mouseX > width / 2 - 405 + 280 * i &&
          mouseX < width / 2 - 405 + 280 * i + 250 &&
          mouseY > 460 &&
          mouseY < 460 + 80
        ) {
          // if the plater hover on the boxes, it will have the hover effect
          stroke(0, 246, 255);
          strokeWeight(3);
          fill(255, glowing);
          rect(width / 2 - 410 + 280 * i, 455, 260, 90, 20);
        }
        // else it will remain constant at here
        else {
          stroke(0, 246, 255);
          strokeWeight(3);
          fill(255, 240);
          rect(width / 2 - 405 + 280 * i, 460, 250, 80, 20);
        }
        // Design for the difficulty text
        strokeWeight(2);
        textSize(36);
        stroke(textColour);
        fill(textColour);
        text(boxesText, 195 + 255 * i, 500);
        // For the click to select text
        noStroke();
        textSize(14);
        text("Click to Select", 185 + 280 * i, 520);
      }
    }

    ////////////// Introduction and Loading Screen ///////////////////
    loadingScreen();
    // Draw the character in the middle of the screen
    characterDesign(width / 2, 430, "full");
  }
}
function loadingScreen() {
  // To display the introduction and loading screen at the start of the game before instruction page
  if (titleAlapha > 0) {
    // Cover the entire canvas with the theme colour, once the loading has complete, the introduction screen will fade away
    fill(28, 85, 143, titleAlapha);
    rect(0, 0, width, height);
    textSize(50);
    fill(255, titleAlapha);
    stroke(255, titleAlapha);
    strokeWeight(3);
    textFont("sans-serif");

    // Header and title of the project
    text("ITP1", width / 2 - 50, 100);
    text("Game Project", width / 2 - 160, 170);
    // To create a zoom in and out effect on the game name
    var fontSize = map(sin(angle), -1, 1, 24, 42);
    textSize(fontSize);
    angle += 0.02;
    strokeWeight(0.5);
    textFont("cursive");
    text("Cinderella Game", width / 2 - map(sin(angle), -1, 1, 85, 140), 240);

    // create the loading bar and text
    textSize(20);
    textFont("Courier New");
    text("Loading...", width / 2 - 50, 500);
    stroke(255, titleAlapha);
    fill(255, 0);
    rect(149, 519, width - 302, 22, 4);

    // The platform can be use as the design for the loading bar
    if (titleAlapha > 100) {
      if (titleAlapha > 280) {
        createPlatforms(150, 520, 720 - (abs(titleAlapha) - 290)).draw();
        collectableDesign(150 + 720 - (titleAlapha - 280), 535, 0.7);
      } else {
        createPlatforms(150, 520, 720).draw();
        collectableDesign(150 + 720, 535, 0.7);
      }
    }
    // decrease the loading screen alpha each draw loop
    titleAlapha -= 7.5;
  }
}
function smallSplashScreen(word, subword) {
  // display a small splash screen, display for when walking wrong direction or game over
  strokeWeight(0);
  fill(28, 85, 143, 200);
  // drawing of the translucent box
  rect(312, 208, 400, 160, 30);
  textSize(32);
  fill(255);
  stroke(0);
  // Header
  text(word, width / 2 - 150, height / 2 - 20);
  textSize(16);
  fill(255, glowing);
  // Instruction words with glowing effect of fading in and out
  text(subword, width / 2 - 100, height / 2 + 30);
  strokeWeight(1);
  noStroke();
}
function startSplashScreen() {
  // fading splash screen at start of every game
  if (startingScreen == false) {
    fill(28, 85, 143, blackscreenalapha);
    rect(0, 0, width, height);
    if (blackscreenalapha > 0) {
      blackscreenalapha -= 10;
    }
  }
}
function lifeSplashScreen() {
  // fading in splash screen to show player lives left
  fill(28, 85, 143, blackscreenalapha);
  rect(0, 0, width, height);
  blackscreenalapha += 20;
  respawnTime -= 1;
  // Design of game character beside the amount of lives left
  characterDesign(width / 2 - 50, 300, "full");
  textSize(40);
  fill(255);
  stroke(255);
  strokeWeight(4);
  text("☓  " + (lives - 1), width / 2, 280);
  strokeWeight(1);
}
function completedSplashScreen() {
  ////////////// Level Complete Table Design ///////////////////
  fill(28, 85, 143, 230);
  noStroke();
  rect(width / 2 - 170, 120, 340, 360, 30);
  // Function creates the moving flag on top of the table
  movingFlag();

  ////////////// Grading Factor ///////////////////
  // create and design the stars that represent the grade
  gradingStars();
  // Function to display the grading factor of the game
  gradingFactor();

  ////////////// Text Display ///////////////////
  // Main header for the level complete table
  text("Level Completed", width / 2 - 140, 120);
  // label on amount of game left and time left
  textSize(18);
  text("Time left", width / 2 - 48, 270);
  text("Lives left", width / 2 - 55, 350);
  // Continue button glowing effect of fading in and out
  fill(255, glowing);
  stroke(255, glowing);
  text("Press Spacebar to Continue", width / 2 - 130, height - 130);
  textFont("MedievalSharp");
  textSize(102);
}
function gradingFactor() {
  // Game time limit display to show how long the player take to complete
  fill(0, 100);
  rect(width / 2 - 80, 280, 160, 50, 10);
  textSize(20);
  fill(255);
  text("Midnight in " + round(timeLimit / 60, 2) + "s", width / 2 - 65, 315);
  // Game Lives display to show how many lives the player take
  fill(0, 70);
  rect(width / 2 - 80, 360, 160, 50, 10);
  for (let i = 0; i < lives; i++) {
    characterDesign(width / 2 - 50 + i * 52, 445, "half");
  }
  textFont("Courier New");
  fill(255);
  textSize(32);
  stroke(255);
}
function movingFlag() {
  // function creates the flag moving with the wind for the game completion grading table

  // Winning flag x postion and length
  var flagXPos = width / 2 - 190;
  var flagLength = 380;
  // loop through to create multiple rectangle to give the effect of flag with wind
  for (let x = flagXPos; x < flagXPos + flagLength - 4; x++) {
    // Individual points to create wind movement in flag
    fill(0, 160, 255);
    rect(x, 100 + sin(frameCount * 0.03 + x * 0.03) * 10 - 25, 5, 80);
  }
}
function gradingStars() {
  // function creates the number of stars the player achieve, indicating how well the player did
  var noStars = -1;
  // if the time limit is above 15, the player is awards one star also
  if (timeLimit > 15 * 60) {
    noStars++;
  }
  // Each lives more than 1 adds one star
  noStars += lives - 1;
  // Design and draw out the star awarded to the player
  for (let i = -1; i < 2; i++) {
    if (i < noStars) {
      fill(255, 215, 0);
    } else {
      fill(0);
    }
    noStroke();
    text("★", width / 2 - 50 + i * 100, 240 + abs(i) * 10);
  }
}
