/*

Keagan Suah - The Game Project

Game project submission

This file consist of all the objects' design and conditions

Table of Contents
    1 Object Design - line 32
        1.1 Clouds Design - line 34
        1.2 Mountain Design - line 84
        1.3 Small Tree Design - line 122
        1.4 Big Tree Design - line 155
        1.5 Ground Design - line 201
    2 Non-Movable Object Design - line 245
        2.1 Moon Design - line 247
        2.2 Background Design - line 272
        2.3 Create Stars - line 287
    3 Interactable Object Design - line 325
        3.1 Collectable Design - line 328
        3.2 Collectable Interaction - line 469
        3.3 Canyon Design - line 483
        3.5 Canyon Interaction - line 522
        3.6 Flagpole Design - line 547
        3.7 Falgpole Interaction - line 934
        3.8 Platform Creations - line 960
        3.9 Enemies Creations - line 1052

*/

////////////// Object Design ///////////////////
// all functions below are created with coursera assistance
function drawClouds() {
  // cloud moving to the right
  if (!death && !pauseState) {
    // ES6 loop can be used to shorten the condition to iterate through each object in the array
    for (let cloud of clouds) {
      // reset clouds position when they reach the end of the game destination
      if (cloud.x_pos > gameDistance + 500) {
        cloud.x_pos = -50;
      } else {
        // this allows the clouds to move slowly across screen
        cloud.x_pos += 1;
      }
    }
  }

  // loop through the clouds array to draw out each cloud by index
  // ES6 loop can be used to shorten the condition to iterate through each object in the array
  for (let cloud of clouds) {
    // anchor points of clouds is set in the middle
    noStroke();
    fill(255, 230);
    rect(
      cloud.x_pos - 82,
      cloud.y_pos - 5,
      150,
      30 + cloud.size,
      30 + cloud.size
    );
    fill(255, 250);
    rect(
      cloud.x_pos - 62,
      cloud.y_pos - 25,
      120,
      30 + cloud.size,
      30 + cloud.size
    );
    ellipse(
      cloud.x_pos + 58,
      cloud.y_pos - 5,
      50 + cloud.size,
      50 + cloud.size
    );
    ellipse(
      cloud.x_pos + 18,
      cloud.y_pos - 15,
      70 + cloud.size,
      50 + cloud.size
    );
  }
}
function drawMountains() {
  // loop through the mountains array to draw out each mountain by index
  // ES6 loop can be used to shorten the condition to iterate through each object in the array
  for (let mountain of mountains) {
    // anchor points of mountains is set in the middle between the closer and further mountain
    noStroke();
    fill(81, 133, 184);
    // Closer mountain
    triangle(
      mountain.x_pos - 112,
      floorPos_y,
      mountain.x_pos + 88,
      mountain.y_pos - 138 - mountain.size,
      mountain.x_pos + 288,
      floorPos_y
    );
    // further mountain
    fill(47, 109, 171);
    triangle(
      mountain.x_pos - 372,
      floorPos_y,
      mountain.x_pos - 172,
      mountain.y_pos - 138 - mountain.size,
      mountain.x_pos + 28,
      floorPos_y
    );
    // Shadow for mountains
    fill(28, 85, 143);
    triangle(
      mountain.x_pos - 372,
      floorPos_y,
      mountain.x_pos - 172,
      mountain.y_pos - 138 - mountain.size,
      mountain.x_pos - 262,
      floorPos_y
    );
  }
}
function drawSmallTrees() {
  // loop through the smalltrees X_pos array to draw out each tree by index
  for (var i = 0; i < smallTree_x.length; i++) {
    // anchor point of tree is set in the middle
    noStroke();
    fill(50, 70, 70);
    rect(smallTree_x[i] - 60, smallTreeY_pos - 55, 120, 120, 30);
    fill(80, 60, 70);
    // truck
    rect(
      smallTree_x[i] - 12,
      smallTreeY_pos,
      20,
      dist(smallTree_x[i], smallTreeY_pos, smallTree_x[i], floorPos_y)
    );
    triangle(
      smallTree_x[i] + 8,
      smallTreeY_pos + 22,
      smallTree_x[i] + 8,
      smallTreeY_pos + 36,
      smallTree_x[i] + 50,
      smallTreeY_pos + 9
    );
    triangle(
      smallTree_x[i] - 12,
      smallTreeY_pos + 34,
      smallTree_x[i] - 12,
      smallTreeY_pos + 54,
      smallTree_x[i] - 41,
      smallTreeY_pos + 20
    );
  }
}
function drawBigTrees() {
  // loop through the bigtrees X_pos array to draw out each tree by index
  for (var i = 0; i < smallTree_x.length; i++) {
    // anchor point of tree is set in the middle
    fill(50, 70, 70);
    rect(bigTree_x[i] - 72, bigTreeY_pos - 70, 150, 150, 30);
    fill(70, 90, 90);
    rect(bigTree_x[i] - 83, bigTreeY_pos + 35, 50, 50, 10);
    fill(40, 60, 60);
    rect(bigTree_x[i] - 40, bigTreeY_pos - 30, 50, 50, 10);
    // Truck
    fill(80, 60, 70);
    rect(
      bigTree_x[i] - 13,
      bigTreeY_pos,
      25,
      dist(bigTree_x[i], bigTreeY_pos, bigTree_x[i], floorPos_y)
    );
    triangle(
      bigTree_x[i] + 4,
      bigTreeY_pos - 6,
      bigTree_x[i] + 12,
      bigTreeY_pos + 15,
      bigTree_x[i] + 52,
      bigTreeY_pos - 30
    );
    triangle(
      bigTree_x[i] + 12,
      bigTreeY_pos + 34,
      bigTree_x[i] + 12,
      bigTreeY_pos + 60,
      bigTree_x[i] + 62,
      bigTreeY_pos + 14
    );
    triangle(
      bigTree_x[i] - 13,
      bigTreeY_pos + 12,
      bigTree_x[i] - 13,
      bigTreeY_pos + 30,
      bigTree_x[i] - 56,
      bigTreeY_pos - 15
    );
    fill(70, 90, 90);
    rect(bigTree_x[i] + 44, bigTreeY_pos - 15, 70, 70, 20);
  }
}
function drawGround() {
  noStroke();
  // design the soil
  fill(36, 52, 56);
  rect(grassX_pos, floorPos_y, width + cameraPosX - grassX_pos, 218);
  // loop through the rocks in soil array to draw out each rocks by index
  for (let i = 0; i < rocksInSoil_x.length; i++) {
    // Overall rock Design, anchor point of rocks is set in the middle
    fill(137, 148, 153);
    rect(rocksInSoil_x[i] - 155, rocksInSoilY_pos - 45, 150, 40, 5);
    rect(rocksInSoil_x[i] - 155, rocksInSoilY_pos + 5, 70, 40, 5);
    rect(rocksInSoil_x[i] - 75, rocksInSoilY_pos + 5, 70, 40, 5);
    rect(rocksInSoil_x[i] + 5, rocksInSoilY_pos - 45, 40, 90, 5);
    rect(rocksInSoil_x[i] + 55, rocksInSoilY_pos - 45, 90, 60, 5);
    rect(rocksInSoil_x[i] + 55, rocksInSoilY_pos + 25, 90, 20, 5);
    // front of the rock to give a 3D asethetic
    fill(54, 69, 79);
    rect(rocksInSoil_x[i] - 153, rocksInSoilY_pos - 43, 145, 38, 5);
    rect(rocksInSoil_x[i] - 153, rocksInSoilY_pos + 7, 66, 38, 5);
    rect(rocksInSoil_x[i] - 73, rocksInSoilY_pos + 7, 66, 38, 5);
    rect(rocksInSoil_x[i] + 7, rocksInSoilY_pos - 43, 36, 88, 5);
    rect(rocksInSoil_x[i] + 57, rocksInSoilY_pos - 43, 86, 58, 5);
    rect(rocksInSoil_x[i] + 57, rocksInSoilY_pos + 27, 86, 18, 5);
  }

  // surface grass
  fill(50, 70, 70);
  beginShape();
  vertex(grassX_pos, floorPos_y);
  // Creates a grass field patch that is the length of GrassX_pos to game distance + 1000 X_pos
  vertex(gameDistance + 1000, floorPos_y);
  vertex(gameDistance + 1000, 470);
  // loop to give the triangle grass design
  for (let t = gameDistance + 1000; t > 5; t -= 5) {
    if (t % 2 == 0) {
      vertex(t + grassX_pos, 445);
    } else {
      vertex(t + grassX_pos, 460);
    }
  }
  vertex(grassX_pos, 450);
  endShape(CLOSE);
}

//////////////Non-Movable Object Design ///////////////////
// all functions below are created myself without assistance
function drawMoon() {
  // glowingMoon looping to create each glow, each loop increase the size and decrease the transparancy
  noStroke();
  for (let glow = 0; glow < 30; glow++) {
    fill(255, 255, 255, 20 - (glow - 0.5));
    ellipse(
      glowingMoon.x_pos,
      glowingMoon.y_pos,
      200 + glow * 5,
      200 + glow * 5
    );
  }
  // design of the glowingMoon, anchor point of glowingMoon is set in the middle
  fill(192, 192, 192);
  ellipse(glowingMoon.x_pos, glowingMoon.y_pos, 200, 200);
  fill(227, 226, 226);
  ellipse(glowingMoon.x_pos, glowingMoon.y_pos - 10, 190, 180);
  fill(200, 200, 200);
  ellipse(glowingMoon.x_pos - 60, glowingMoon.y_pos - 10, 20, 20);
  ellipse(glowingMoon.x_pos + 20, glowingMoon.y_pos + 30, 50, 50);
  ellipse(glowingMoon.x_pos - 10, glowingMoon.y_pos - 50, 30, 30);
  ellipse(glowingMoon.x_pos + 60, glowingMoon.y_pos - 10, 20, 20);
  ellipse(glowingMoon.x_pos + 60, glowingMoon.y_pos - 50, 5, 5);
  ellipse(glowingMoon.x_pos - 10, glowingMoon.y_pos + 20, 30, 30);
}
function gameBackground() {
  // looping to create a gradient background, different shade of colour per loop
  for (let y_pos = 0; y_pos < height; y_pos++) {
    let gradient = map(y_pos, 0, height, 0, 1);
    // Variable sets the gradient for the background
    let gradientline = lerpColor(
      color(37, 99, 161),
      color(124, 171, 218),
      gradient
    );
    stroke(gradientline);
    line(0, y_pos, width, y_pos);
  }
}
// Using factory Pattern for stars in the background
function createStars(x, y) {
  // creating a single star object
  var p = {
    x: x,
    y: y,
    draw: function () {
      // Design of the star
      if (!death && !pauseState) {
        noStroke();
        fill(255);
        // random shape will give the illusion of a shiny effect
        ellipse(this.x, this.y, random(0.5, 4), random(0.5, 4));
      }
      // upon death, stop start from having shiny effect
      fill(255);
      ellipse(this.x, this.y, 2, 2);
      // Stars movement and resetting
      this.move();
      this.reset();
    },
    move: function () {
      // stars move only when character is still alive
      if (!death && !pauseState) {
        this.x += 0.06;
        this.y -= 0.07;
      }
    },
    reset: function () {
      // reset the star back to a new position after traveling away from the canvas
      if (this.x > width || this.y < 10) {
        this.x = random(-100, width);
        this.y = random(floorPos_y, height / 2 - 200);
      }
    },
  };
  return p;
}

////////////// Interactable Object Design ///////////////////
// all functions below are created with coursera assistance
// Collectable Function and Design
function drawCollectable(t_collectable) {
  // Check if game character has already collect the collectable
  if (t_collectable.isFound == false) {
    collectableDesign(
      t_collectable.x_pos,
      t_collectable.y_pos - hoverObject,
      t_collectable.size
    );
  }
}
function collectableDesign(x_pos, y_pos, size) {
  // Calculate the scaling factor based on the initialSize
  var scaleFactor = size / 1;
  // Design of Collectable Items, anchor point is set in the bottom center of the collectable
  fill(0, 246, 255, 200);
  stroke(255);
  strokeWeight(0.5);
  // Heel of the shoe
  rect(
    x_pos - 17 * scaleFactor,
    y_pos - 13 * scaleFactor,
    (6 + size / 2) * scaleFactor,
    (20 + size) * scaleFactor
  );
  beginShape();
  vertex(x_pos - 16 * scaleFactor, y_pos - 10 * scaleFactor);
  bezierVertex(
    x_pos - 17 * scaleFactor,
    y_pos - 10 * scaleFactor,
    x_pos - 20 * scaleFactor,
    y_pos - 16 * scaleFactor,
    x_pos - 13 * scaleFactor,
    y_pos - (29 + size) * scaleFactor
  );
  vertex(x_pos - 6 * scaleFactor, y_pos - (20 + size) * scaleFactor);
  vertex(x_pos - 16 * scaleFactor, y_pos - 10 * scaleFactor);
  endShape();
  // Rest of the glass shoe
  triangle(
    x_pos - 7 * scaleFactor,
    y_pos - 6 * scaleFactor,
    x_pos + 4 * scaleFactor,
    y_pos - 1 * scaleFactor,
    x_pos + 4 * scaleFactor,
    y_pos - (12 + size) * scaleFactor
  );
  beginShape();
  vertex(x_pos + 15 * scaleFactor, y_pos - (4 + size) * scaleFactor);
  bezierVertex(
    x_pos + 15 * scaleFactor,
    y_pos - (4 + size) * scaleFactor,
    x_pos + (24 + size) * scaleFactor,
    y_pos - (3 + size) * scaleFactor,
    x_pos + (24 + size) * scaleFactor,
    y_pos + 5 * scaleFactor
  );
  bezierVertex(
    x_pos + (24 + size) * scaleFactor,
    y_pos + (5 + size / 2) * scaleFactor,
    x_pos + 24 * scaleFactor,
    y_pos + 9 * scaleFactor,
    x_pos + 18 * scaleFactor,
    y_pos + 8 * scaleFactor
  );
  bezierVertex(
    x_pos + 18 * scaleFactor,
    y_pos + 8 * scaleFactor,
    x_pos + 11 * scaleFactor,
    y_pos + 8 * scaleFactor,
    x_pos + 17 * scaleFactor,
    y_pos + 8 * scaleFactor
  );
  vertex(x_pos + 9 * scaleFactor, y_pos + 3 * scaleFactor);
  endShape();
  triangle(
    x_pos,
    y_pos - 4 * scaleFactor,
    x_pos + 6 * scaleFactor,
    y_pos + 8 * scaleFactor,
    x_pos + 17 * scaleFactor,
    y_pos + 8 * scaleFactor
  );
  fill(0, 195, 255, 200);
  triangle(
    x_pos - 6 * scaleFactor,
    y_pos - (20 + size) * scaleFactor,
    x_pos - 16 * scaleFactor,
    y_pos - 10 * scaleFactor,
    x_pos - 7 * scaleFactor,
    y_pos - 6 * scaleFactor
  );
  triangle(
    x_pos + 15 * scaleFactor,
    y_pos - (4 + size) * scaleFactor,
    x_pos + 4 * scaleFactor,
    y_pos - 1 * scaleFactor,
    x_pos + 4 * scaleFactor,
    y_pos - (12 + size) * scaleFactor
  );
  fill(0, 160, 255, 200);
  triangle(
    x_pos - 7 * scaleFactor,
    y_pos - 6 * scaleFactor,
    x_pos - 6 * scaleFactor,
    y_pos - (20 + size) * scaleFactor,
    x_pos + 4 * scaleFactor,
    y_pos - (12 + size) * scaleFactor
  );
  triangle(
    x_pos + 15 * scaleFactor,
    y_pos - (4 + size) * scaleFactor,
    x_pos + 4 * scaleFactor,
    y_pos - 1 * scaleFactor,
    x_pos + 10 * scaleFactor,
    y_pos + 3 * scaleFactor
  );
  // shiny sparkles
  fill(255);
  ellipse(x_pos, y_pos - (13 + size) * scaleFactor, random(3), random(3));
  ellipse(
    x_pos - 10 * scaleFactor,
    y_pos - (8 + size) * scaleFactor,
    random(3),
    random(3)
  );
  ellipse(
    x_pos + 10 * scaleFactor,
    y_pos - (3 + size) * scaleFactor,
    random(3),
    random(3)
  );
  ellipse(
    x_pos + 15 * scaleFactor,
    y_pos + (4 - size) * scaleFactor,
    random(3),
    random(3)
  );
  // To reset strokeweight and colour
  strokeWeight(1);
  stroke(0);
}
function checkCollectable(t_collectable) {
  // Game character Interaction collecting collectable
  if (
    dist(t_collectable.x_pos, t_collectable.y_pos, gameChar_x, gameChar_y) < 30
  ) {
    // Increment by 1 only when the object if found
    if (t_collectable.isFound == false) {
      collectsound.play();
      game_score += 1;
      t_collectable.isFound = true;
    }
  }
}
// Canyon Function and Design
function drawCanyon(t_canyon) {
  // design of the canyon, anchor point of canyon is set in the middle
  noStroke();
  fill(72, 33, 44);
  rect(
    t_canyon.x_pos - t_canyon.width / 2,
    t_canyon.y_pos - 68,
    t_canyon.width,
    576
  );
  // Left slope
  triangle(
    t_canyon.x_pos - t_canyon.width / 2,
    t_canyon.y_pos - 68,
    t_canyon.x_pos - t_canyon.width / 2,
    t_canyon.y_pos - 30,
    t_canyon.x_pos - t_canyon.width / 2 - 5,
    t_canyon.y_pos - 68
  );
  // Right Slope
  triangle(
    t_canyon.x_pos + t_canyon.width / 2,
    t_canyon.y_pos - 68,
    t_canyon.x_pos + t_canyon.width / 2,
    t_canyon.y_pos - 30,
    t_canyon.x_pos + t_canyon.width / 2 + 5,
    t_canyon.y_pos - 68
  );
  // Water in the t_canyon
  fill(76, 170, 255, 150);
  rect(
    t_canyon.x_pos - t_canyon.width / 2,
    t_canyon.y_pos,
    t_canyon.width,
    height - t_canyon.y_pos
  );
  fill(76, 170, 255);
  ellipse(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, 10);
}
function checkCanyon(t_canyon) {
  // Interaction of Game Character falling into the t_canyon
  if (
    gameChar_x > t_canyon.x_pos - t_canyon.width / 2 &&
    gameChar_x < t_canyon.x_pos + t_canyon.width / 2 &&
    gameChar_y >= floorPos_y
  ) {
    jumpVelocity -= 100;
    isPlummeting = true;
    isRight = false;
    isLeft = false;
    if (gameChar_y < height - 50) {
      gameChar_y += 2;
      // Find if the game character is at the edge of the t_canyon's slope, if it is, push the character to the center of the t_canyon
      if (gameChar_x < t_canyon.x_pos - t_canyon.width / 2 + 25) {
        gameChar_x += 1;
      } else if (gameChar_x > t_canyon.x_pos + t_canyon.width / 2 - 25) {
        gameChar_x -= 1;
      }
    } else {
      gameChar_y += 1.5;
    }
  }
}
// Flagpole Function and Design
function renderFlagpole() {
  // anchor point at the bottom center of the gate
  // Design for when the game character have not reached the end, when reached, there is an animation for the flag to slowly raise up and the windows and gate to slowly get brighter
  if (flagpole.isReached == false) {
    fill(255);
    stroke(0);
    strokeWeight(1);
    fill(28, 85, 143);
    // building in the castle, behind the main gate and tower
    beginShape();
    vertex(flagpole.x_pos - 189, flagpole.y_pos - 69);
    vertex(flagpole.x_pos - 164, flagpole.y_pos - 146);
    vertex(flagpole.x_pos - 32, flagpole.y_pos - 146);
    vertex(flagpole.x_pos + 1, flagpole.y_pos - 209);
    vertex(flagpole.x_pos + 165, flagpole.y_pos - 209);
    vertex(flagpole.x_pos + 195, flagpole.y_pos - 160);
    vertex(flagpole.x_pos + 179, flagpole.y_pos - 160);
    vertex(flagpole.x_pos + 169, flagpole.y_pos - 150);
    vertex(flagpole.x_pos + 174, flagpole.y_pos - 60);
    endShape(CLOSE);
    fill(47, 109, 171);
    // castle walls, loop 4 times to create the castle walls
    for (let i = 0; i < 4; i++) {
      beginShape();
      vertex(flagpole.x_pos - 226 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 217 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 217 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 213 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 213 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 199 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 199 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 196 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 196 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 181 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 181 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 176 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 176 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 161 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 161 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 154 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 154 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 141 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 141 + 123 * i, flagpole.y_pos);
      vertex(flagpole.x_pos - 226 + 123 * i, flagpole.y_pos);
      endShape(CLOSE);
    }
    // Main Tower entrance
    // middle flagpole
    fill(255);
    rect(flagpole.x_pos - 1, flagpole.y_pos - 300, 2, 70);
    beginShape();
    vertex(flagpole.x_pos, flagpole.y_pos - 299 + 55 * (winCountDown / 120));
    vertex(
      flagpole.x_pos - 35,
      flagpole.y_pos - 298 + 55 * (winCountDown / 120)
    );
    vertex(
      flagpole.x_pos - 21,
      flagpole.y_pos - 295 + 55 * (winCountDown / 120)
    );
    vertex(
      flagpole.x_pos - 36,
      flagpole.y_pos - 292 + 55 * (winCountDown / 120)
    );
    vertex(flagpole.x_pos, flagpole.y_pos - 292 + 55 * (winCountDown / 120));
    endShape(CLOSE);
    // Castle Tower
    fill(81, 133, 184);
    rect(flagpole.x_pos - 40, flagpole.y_pos - 170, 80, 100);
    fill(121, 173, 224);
    triangle(
      flagpole.x_pos - 50,
      flagpole.y_pos - 170,
      flagpole.x_pos,
      flagpole.y_pos - 232,
      flagpole.x_pos + 50,
      flagpole.y_pos - 170
    );
    fill(220);
    // micky mouse window
    fill(
      254 - 254 * (winCountDown / 120),
      255 - 255 * (winCountDown / 120),
      225 - 225 * (winCountDown / 120)
    );
    strokeWeight(0);
    ellipse(flagpole.x_pos, flagpole.y_pos - 140, 30, 30);
    ellipse(flagpole.x_pos - 16, flagpole.y_pos - 155, 20, 20);
    ellipse(flagpole.x_pos + 16, flagpole.y_pos - 155, 20, 20);
    strokeWeight(1);
    // gate and walls
    fill(47, 109, 171);
    rect(flagpole.x_pos - 64, flagpole.y_pos - 100, 128, 100);
    beginShape();
    vertex(flagpole.x_pos - 71, flagpole.y_pos - 110);
    vertex(flagpole.x_pos - 56, flagpole.y_pos - 110);
    // flags, loop to create 6 objects
    for (let i = 0; i < 6; i++) {
      vertex(flagpole.x_pos - 56 + i * 20, flagpole.y_pos - 103);
      vertex(flagpole.x_pos - 51 + i * 20, flagpole.y_pos - 103);
      vertex(flagpole.x_pos - 51 + i * 20, flagpole.y_pos - 110);
      vertex(flagpole.x_pos - 36 + i * 20, flagpole.y_pos - 110);
    }
    vertex(flagpole.x_pos + 71, flagpole.y_pos - 110);
    vertex(flagpole.x_pos + 71, flagpole.y_pos - 85);
    vertex(flagpole.x_pos - 71, flagpole.y_pos - 85);
    endShape(CLOSE);
    // castle gate entrance
    fill(
      254 - 254 * (winCountDown / 120),
      255 - 255 * (winCountDown / 120),
      225 - 225 * (winCountDown / 120)
    );
    rect(flagpole.x_pos - 30, flagpole.y_pos - 70, 60, 70, 30, 30, 0);
    // castle Towers, loop to create 5 different towers
    for (let i = 0; i < 5; i++) {
      if (i != 2) {
        // flagpole
        fill(255);
        rect(flagpole.x_pos - 247 + 123 * i, flagpole.y_pos - 250, 2, 70);
        beginShape();
        vertex(
          flagpole.x_pos - 247 + 123 * i,
          flagpole.y_pos - 249 + 35 * (winCountDown / 120)
        );
        vertex(
          flagpole.x_pos - 282 + 123 * i,
          flagpole.y_pos - 248 + 35 * (winCountDown / 120)
        );
        vertex(
          flagpole.x_pos - 268 + 123 * i,
          flagpole.y_pos - 245 + 35 * (winCountDown / 120)
        );
        vertex(
          flagpole.x_pos - 283 + 123 * i,
          flagpole.y_pos - 242 + 35 * (winCountDown / 120)
        );
        vertex(
          flagpole.x_pos - 247 + 123 * i,
          flagpole.y_pos - 242 + 35 * (winCountDown / 120)
        );
        endShape(CLOSE);
        // tower
        fill(47, 109, 171);
        rect(
          flagpole.x_pos - 266 + 123 * i,
          flagpole.y_pos - 135,
          40,
          500 - 365
        );
        // window
        fill(
          254 - 254 * (winCountDown / 120),
          255 - 255 * (winCountDown / 120),
          225 - 225 * (winCountDown / 120)
        );
        rect(
          flagpole.x_pos - 256 + 123 * i,
          flagpole.y_pos - 90,
          20,
          30,
          20,
          20,
          0
        );
        rect(
          flagpole.x_pos - 256 + 123 * i,
          flagpole.y_pos - 130,
          20,
          20,
          20,
          20,
          0
        );
        // tower tip
        fill(240);
        fill(121, 173, 224);
        triangle(
          flagpole.x_pos - 281 + 123 * i,
          flagpole.y_pos - 135,
          flagpole.x_pos - 246 + 123 * i,
          flagpole.y_pos - 200,
          flagpole.x_pos - 211 + 123 * i,
          flagpole.y_pos - 135
        );
        // ledge
        fill(47, 109, 171);
        beginShape();
        vertex(flagpole.x_pos - 281 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 275 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 275 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 271 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 271 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 262 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 262 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 256 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 256 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 243 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 243 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 239 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 239 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 226 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 226 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 222 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 222 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 213 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 213 + 123 * i, flagpole.y_pos - 100);
        vertex(flagpole.x_pos - 281 + 123 * i, flagpole.y_pos - 100);
        endShape(CLOSE);
      }
    }
  }
  // When the game character have reached the end, show the ending state of the castle
  else {
    fill(255);
    stroke(0);
    strokeWeight(1);
    fill(28, 85, 143);
    // building in the castle
    beginShape();
    vertex(flagpole.x_pos - 189, flagpole.y_pos - 69);
    vertex(flagpole.x_pos - 164, flagpole.y_pos - 146);
    vertex(flagpole.x_pos - 32, flagpole.y_pos - 146);
    vertex(flagpole.x_pos + 1, flagpole.y_pos - 209);
    vertex(flagpole.x_pos + 165, flagpole.y_pos - 209);
    vertex(flagpole.x_pos + 195, flagpole.y_pos - 160);
    vertex(flagpole.x_pos + 179, flagpole.y_pos - 160);
    vertex(flagpole.x_pos + 169, flagpole.y_pos - 150);
    vertex(flagpole.x_pos + 174, flagpole.y_pos - 60);
    endShape(CLOSE);
    fill(47, 109, 171);
    // loop 4 times to create 4 walls
    for (let i = 0; i < 4; i++) {
      beginShape();
      vertex(flagpole.x_pos - 226 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 217 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 217 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 213 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 213 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 199 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 199 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 196 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 196 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 181 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 181 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 176 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 176 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 161 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 161 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 154 + 123 * i, flagpole.y_pos - 74);
      vertex(flagpole.x_pos - 154 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 141 + 123 * i, flagpole.y_pos - 80);
      vertex(flagpole.x_pos - 141 + 123 * i, flagpole.y_pos);
      vertex(flagpole.x_pos - 226 + 123 * i, flagpole.y_pos);
      endShape(CLOSE);
    }
    // Main Tower entrance
    // middle pole
    fill(255);
    rect(flagpole.x_pos - 1, flagpole.y_pos - 300, 2, 70);
    beginShape();
    vertex(flagpole.x_pos, flagpole.y_pos - 299);
    vertex(flagpole.x_pos - 35, flagpole.y_pos - 298);
    vertex(flagpole.x_pos - 21, flagpole.y_pos - 295);
    vertex(flagpole.x_pos - 36, flagpole.y_pos - 292);
    vertex(flagpole.x_pos, flagpole.y_pos - 292);
    endShape(CLOSE);
    // Tower
    fill(81, 133, 184);
    rect(flagpole.x_pos - 40, flagpole.y_pos - 170, 80, 100);
    fill(121, 173, 224);
    triangle(
      flagpole.x_pos - 50,
      flagpole.y_pos - 170,
      flagpole.x_pos,
      flagpole.y_pos - 232,
      flagpole.x_pos + 50,
      flagpole.y_pos - 170
    );
    fill(220);
    // micky mouse window
    fill(254, 255, 225);
    strokeWeight(0);
    ellipse(flagpole.x_pos, flagpole.y_pos - 140, 30, 30);
    ellipse(flagpole.x_pos - 16, flagpole.y_pos - 155, 20, 20);
    ellipse(flagpole.x_pos + 16, flagpole.y_pos - 155, 20, 20);
    strokeWeight(1);
    // gate and walls
    fill(47, 109, 171);
    rect(flagpole.x_pos - 64, flagpole.y_pos - 100, 128, 100);
    beginShape();
    vertex(flagpole.x_pos - 71, flagpole.y_pos - 110);
    vertex(flagpole.x_pos - 56, flagpole.y_pos - 110);
    // loop 6 times to create 6 times
    for (let i = 0; i < 6; i++) {
      vertex(flagpole.x_pos - 56 + i * 20, flagpole.y_pos - 103);
      vertex(flagpole.x_pos - 51 + i * 20, flagpole.y_pos - 103);
      vertex(flagpole.x_pos - 51 + i * 20, flagpole.y_pos - 110);
      vertex(flagpole.x_pos - 36 + i * 20, flagpole.y_pos - 110);
    }
    vertex(flagpole.x_pos + 71, flagpole.y_pos - 110);
    vertex(flagpole.x_pos + 71, flagpole.y_pos - 85);
    vertex(flagpole.x_pos - 71, flagpole.y_pos - 85);
    endShape(CLOSE);
    // entrance
    fill(254, 255, 225);
    rect(flagpole.x_pos - 30, flagpole.y_pos - 70, 60, 70, 30, 30, 0);
    // Tower flagpole, loop 5 times to create the flagpole
    for (let i = 0; i < 5; i++) {
      if (i != 2) {
        // flagpole
        fill(255);
        rect(flagpole.x_pos - 247 + 123 * i, flagpole.y_pos - 250, 2, 70);
        beginShape();
        vertex(flagpole.x_pos - 247 + 123 * i, flagpole.y_pos - 249);
        vertex(flagpole.x_pos - 282 + 123 * i, flagpole.y_pos - 248);
        vertex(flagpole.x_pos - 268 + 123 * i, flagpole.y_pos - 245);
        vertex(flagpole.x_pos - 283 + 123 * i, flagpole.y_pos - 242);
        vertex(flagpole.x_pos - 247 + 123 * i, flagpole.y_pos - 242);
        endShape(CLOSE);
        // tower
        fill(47, 109, 171);
        rect(
          flagpole.x_pos - 266 + 123 * i,
          flagpole.y_pos - 135,
          40,
          500 - 365
        );
        // window
        fill(254, 255, 225);
        rect(
          flagpole.x_pos - 256 + 123 * i,
          flagpole.y_pos - 90,
          20,
          30,
          20,
          20,
          0
        );
        rect(
          flagpole.x_pos - 256 + 123 * i,
          flagpole.y_pos - 130,
          20,
          20,
          20,
          20,
          0
        );
        // tower tip
        fill(240);
        fill(121, 173, 224);
        triangle(
          flagpole.x_pos - 281 + 123 * i,
          flagpole.y_pos - 135,
          flagpole.x_pos - 246 + 123 * i,
          flagpole.y_pos - 200,
          flagpole.x_pos - 211 + 123 * i,
          flagpole.y_pos - 135
        );
        // ledge
        fill(47, 109, 171);
        beginShape();
        vertex(flagpole.x_pos - 281 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 275 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 275 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 271 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 271 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 262 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 262 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 256 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 256 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 243 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 243 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 239 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 239 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 226 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 226 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 222 + 123 * i, flagpole.y_pos - 117);
        vertex(flagpole.x_pos - 222 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 213 + 123 * i, flagpole.y_pos - 123);
        vertex(flagpole.x_pos - 213 + 123 * i, flagpole.y_pos - 100);
        vertex(flagpole.x_pos - 281 + 123 * i, flagpole.y_pos - 100);
        endShape(CLOSE);
      }
    }
  }
}
function checkFlagpole() {
  // Game character Interaction with flagpole
  if (gameChar_x >= flagpole.x_pos) {
    // reset the game character to face forward
    isRight = false;
    // can only complete once all collectable is collected
    if (game_score == collectables.length) {
      // decrease variable to let the flag slowly raise up when the player reach the flagpole
      if (winCountDown == 0) {
        flagpole.isReached = true;
      } else {
        winCountDown -= 2;
        if (!flagrise.isPlaying()) {
          flagrise.play();
        }
      }
    }
    // if all the collectables are not collected yet, display a small splash screen
    else {
      smallSplashScreen(
        "⚠︎ Collect All Shoes ⚠︎ ",
        "    Turn arround and collect ↩︎"
      );
    }
  }
}
// Using Factory Pattern to create platforms
function createPlatforms(x, y, length, range, speed) {
  var p = {
    x: x,
    y: y,
    length: length,
    currentX: x,
    range: range,
    speed: speed,
    currentX: x,
    inc: speed,
    // to make the platfrom move left to right
    move: function (playerOnPlat) {
      if (!death && !pauseState) {
        this.currentX += this.inc;
        // when player is one platform, move the character along with the platform
        if (playerOnPlat) {
          gameChar_x += this.inc;
          for (let mountain of mountains) {
            mountain.x_pos += this.inc;
          }
          glowingMoon.x_pos += this.inc;
        }
        if (this.currentX >= this.x + this.range) {
          this.inc = -this.speed;
        } else if (this.currentX < this.x) {
          this.inc = this.speed;
        }
      }
    },
    draw: function () {
      // Design of the glass platform, anchor point is set at the top left of it
      fill(0, 246, 255, 200);
      triangle(
        this.currentX + 2,
        this.y,
        this.currentX + 2,
        this.y + 20,
        this.currentX + this.length - 1,
        this.y + 20
      );
      fill(0, 195, 255, 220);
      stroke(255, 180);
      rect(this.currentX, this.y, this.length, 20, 4);
      // 2 Dimension of sparkles
      for (let v = 0; v < 2; v++) {
        for (let h = 0; h < 10; h++) {
          // shiny sparkles for platfrom, alternate to give an uneven pattern
          if (v % 2 == 0) {
            // for the first row of stars
            if (h % 2 == 0) {
              fill(255);
              ellipse(
                this.currentX + h * (this.length / 10),
                this.y,
                random(0.1, 4),
                random(0.1, 4)
              );
            }
          }
          // for the second row of stars
          else {
            if (h % 2 == 1) {
              fill(255);
              ellipse(
                this.currentX + h * (this.length / 10),
                this.y + 20,
                random(0.1, 4),
                random(0.1, 4)
              );
            }
          }
        }
      }
    },
    checkContact: function (gc_x, gc_y) {
      // interection to check if game character is near the platform
      if (
        gc_x > this.currentX - 10 &&
        gc_x < this.currentX + 10 + this.length
      ) {
        var d = this.y - gc_y;
        if (d >= 0 && d < 5) {
          return true;
        }
      }
      return false;
    },
  };
  return p;
}
// Using Constructor Function
function Enemy(x, y, range, speed) {
  this.x = x;
  this.y = y;
  this.range = range;
  this.speed = speed;
  this.currentX = x;
  this.inc = this.speed;
  // update the location of the enemy to keep them moving left and right
  this.update = function () {
    if (!death && !pauseState) {
      this.currentX += this.inc;

      if (this.currentX >= this.x + this.range) {
        this.inc = -this.speed;
      } else if (this.currentX < this.x) {
        this.inc = this.speed;
      }
    }
  };
  // design of the enemy
  this.draw = function () {
    // anchor point set at the bottom of the enemy feet
    this.update();
    // Enemy look left when walking left
    if (this.inc == -this.speed) {
      // facing left
      // leg
      stroke(0);
      fill(139, 0, 0);
      rect(this.currentX - 7, this.y - 9, 2, 10);
      rect(this.currentX, this.y - 9, 2, 10);
      //  Body
      fill(139, 0, 0);
      beginShape();
      vertex(this.currentX + 5, this.y - 40, this.currentX - 25, this.y - 40);
      bezierVertex(
        this.currentX - 25,
        this.y - 40,
        this.currentX - 5,
        this.y - 32,
        this.currentX - 20,
        this.y - 5
      );
      bezierVertex(
        this.currentX - 20,
        this.y - 5,
        this.currentX - 5,
        this.y,
        this.currentX + 15,
        this.y - 5
      );
      bezierVertex(
        this.currentX + 8,
        this.y - 16,
        this.currentX + 10,
        this.y - 22,
        this.currentX + 5,
        this.y - 38
      );
      bezierVertex(
        this.currentX + 5,
        this.y - 32,
        this.currentX + 5,
        this.y - 40,
        this.currentX + 5,
        this.y - 40
      );
      endShape();

      fill(138, 43, 226);
      ellipse(this.currentX - 3, this.y - 39, 10, 8);
      fill(225, 215, 204);
      ellipse(this.currentX - 3, this.y - 41, 6, 5);
      // arm
      fill(139, 0, 0);
      beginShape();
      vertex(this.currentX - 15, this.y - 39);
      vertex(this.currentX - 20, this.y - 33);
      vertex(this.currentX - 12, this.y - 22);
      vertex(this.currentX - 17, this.y - 32);
      vertex(this.currentX - 13, this.y - 38);
      endShape(CLOSE);
      beginShape();
      vertex(this.currentX + 9, this.y - 39);
      vertex(this.currentX + 13, this.y - 33);
      vertex(this.currentX + 8, this.y - 22);
      vertex(this.currentX + 11, this.y - 32);
      vertex(this.currentX + 7, this.y - 38);
      endShape(CLOSE);
      ellipse(this.currentX - 12, this.y - 39, 7, 6);
      ellipse(this.currentX + 6, this.y - 39, 7, 6);
      // head
      // hair
      fill(128, 128, 128);
      ellipse(this.currentX - 3, this.y - 57, 30, 30);
      beginShape();
      vertex(this.currentX - 17, this.y - 63);
      bezierVertex(
        this.currentX - 22,
        this.y - 70,
        this.currentX - 15,
        this.y - 80,
        this.currentX - 11,
        this.y - 76
      );
      bezierVertex(
        this.currentX + 15,
        this.y - 93,
        this.currentX + 21,
        this.y - 60,
        this.currentX + 7,
        this.y - 46
      );
      endShape();
      // face
      fill(245, 235, 224);
      beginShape();
      vertex(this.currentX - 17, this.y - 62);
      bezierVertex(
        this.currentX - 14,
        this.y - 65,
        this.currentX - 7,
        this.y - 64,
        this.currentX - 1,
        this.y - 59
      );
      bezierVertex(
        this.currentX + 2,
        this.y - 54,
        this.currentX + 4,
        this.y - 51,
        this.currentX + 3,
        this.y - 44
      );
      bezierVertex(
        this.currentX - 13,
        this.y - 38,
        this.currentX - 20,
        this.y - 50,
        this.currentX - 17,
        this.y - 62
      );
      endShape();
      // eyes
      fill(255);
      ellipse(this.currentX - 12, this.y - 57, 5, 3);
      stroke(0);
      fill(0);
      ellipse(this.currentX - 13, this.y - 57, 1, 1);
      stroke(0);
      // eyebrows
      line(this.currentX - 16, this.y - 59, this.currentX - 11, this.y - 61);
      line(this.currentX - 11, this.y - 61, this.currentX - 10, this.y - 60);
      // Nose
      strokeWeight(1);
      curve(
        this.currentX - 15,
        this.y - 50,
        this.currentX - 16,
        this.y - 51,
        this.currentX - 17,
        this.y - 51,
        this.currentX - 18,
        this.y - 50
      );
      // frown
      stroke(220, 20, 60);
      curve(
        this.currentX - 15,
        this.y - 47,
        this.currentX - 14,
        this.y - 47,
        this.currentX - 12,
        this.y - 46,
        this.currentX - 10,
        this.y - 46
      );
      stroke(0);
      // earrings and ear
      fill(245, 235, 224);
      ellipse(this.currentX - 1, this.y - 57, 4, 7);
      fill(230, 230, 250);
      stroke(0);
      triangle(
        this.currentX - 1,
        this.y - 54,
        this.currentX,
        this.y - 50,
        this.currentX - 2,
        this.y - 50
      );
    }
    // Enemy look right when walking right
    else if (this.inc == this.speed) {
      // facing right
      // leg
      stroke(0);
      fill(139, 0, 0);
      rect(this.currentX - 7, this.y - 9, 2, 10);
      rect(this.currentX, this.y - 9, 2, 10);
      //  Body
      fill(139, 0, 0);
      beginShape();
      vertex(this.currentX + 5, this.y - 40, this.currentX - 25, this.y - 40);
      bezierVertex(
        this.currentX - 25,
        this.y - 40,
        this.currentX - 5,
        this.y - 32,
        this.currentX - 20,
        this.y - 5
      );
      bezierVertex(
        this.currentX - 20,
        this.y - 5,
        this.currentX - 5,
        this.y,
        this.currentX + 15,
        this.y - 5
      );
      bezierVertex(
        this.currentX + 8,
        this.y - 16,
        this.currentX + 10,
        this.y - 22,
        this.currentX + 5,
        this.y - 38
      );
      bezierVertex(
        this.currentX + 5,
        this.y - 32,
        this.currentX + 5,
        this.y - 40,
        this.currentX + 5,
        this.y - 40
      );
      endShape();

      fill(138, 43, 226);
      ellipse(this.currentX - 3, this.y - 39, 10, 8);
      fill(225, 215, 204);
      ellipse(this.currentX - 3, this.y - 41, 6, 5);
      // arm
      fill(139, 0, 0);
      beginShape();
      vertex(this.currentX - 15, this.y - 39);
      vertex(this.currentX - 20, this.y - 33);
      vertex(this.currentX - 12, this.y - 22);
      vertex(this.currentX - 17, this.y - 32);
      vertex(this.currentX - 13, this.y - 38);
      endShape(CLOSE);
      beginShape();
      vertex(this.currentX + 9, this.y - 39);
      vertex(this.currentX + 13, this.y - 33);
      vertex(this.currentX + 8, this.y - 22);
      vertex(this.currentX + 11, this.y - 32);
      vertex(this.currentX + 7, this.y - 38);
      endShape(CLOSE);
      ellipse(this.currentX - 12, this.y - 39, 7, 6);
      ellipse(this.currentX + 6, this.y - 39, 7, 6);

      // head
      // hair
      fill(128, 128, 128);
      ellipse(this.currentX - 3, this.y - 57, 30, 30);
      beginShape();
      // 27
      // -17
      vertex(this.currentX + 10, this.y - 63);
      bezierVertex(
        this.currentX + 17,
        this.y - 70,
        this.currentX + 14,
        this.y - 80,
        this.currentX + 7,
        this.y - 76
      );
      // 15
      bezierVertex(
        this.currentX - 21,
        this.y - 93,
        this.currentX - 27,
        this.y - 60,
        this.currentX - 13,
        this.y - 46
      );
      endShape();
      // face
      fill(245, 235, 224);
      beginShape();
      vertex(this.currentX + 10, this.y - 64);
      bezierVertex(
        this.currentX + 4,
        this.y - 65,
        this.currentX,
        this.y - 64,
        this.currentX - 5,
        this.y - 59
      );
      bezierVertex(
        this.currentX - 6,
        this.y - 59,
        this.currentX - 11,
        this.y - 51,
        this.currentX - 8,
        this.y - 43
      );
      bezierVertex(
        this.currentX + 11,
        this.y - 39,
        this.currentX + 14,
        this.y - 55,
        this.currentX + 10,
        this.y - 64
      );
      endShape();
      // eyes
      fill(255);
      ellipse(this.currentX + 6, this.y - 57, 5, 3);
      fill(0);
      stroke(0);
      ellipse(this.currentX + 7, this.y - 57, 1, 1);
      stroke(0);
      // eyebrows
      line(this.currentX + 10, this.y - 59, this.currentX + 5, this.y - 61);
      line(this.currentX + 5, this.y - 61, this.currentX + 3, this.y - 60);
      // Nose
      strokeWeight(1);
      curve(
        this.currentX + 8,
        this.y - 50,
        this.currentX + 9,
        this.y - 51,
        this.currentX + 10,
        this.y - 51,
        this.currentX + 11,
        this.y - 50
      );
      // frown
      stroke(220, 20, 60);
      curve(
        this.currentX + 9,
        this.y - 47,
        this.currentX + 8,
        this.y - 47,
        this.currentX + 6,
        this.y - 46,
        this.currentX + 4,
        this.y - 46
      );
      stroke(0);
      stroke(0);
      // earrings and ear
      fill(245, 235, 224);
      ellipse(this.currentX - 5, this.y - 57, 4, 7);
      fill(230, 230, 250);
      stroke(0);
      triangle(
        this.currentX - 5,
        this.y - 54,
        this.currentX - 4,
        this.y - 50,
        this.currentX - 6,
        this.y - 50
      );
    }
  };
  // Interaction of enemy with game character
  this.checkContact = function (gc_x, gc_y) {
    var d = dist(gc_x, gc_y - 30, this.currentX, this.y - 50);
    if (d < 50) {
      return true;
    } else {
      return false;
    }
  };
}
