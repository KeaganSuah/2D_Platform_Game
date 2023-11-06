/*

The Game Project

Week 3

Game interaction

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft = false;
var isRight = false;
var isFalling = false;
var isJumping = false;
var isPlummeting = false;

let stars = [];

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  moon = { x_pos: 781, y_pos: 150 };
  cloud = { x_pos: 282, y_pos: 105 };
  canyon = { x_pos: 645, y_pos: 500, width: 100 };
  smallTree = { x_pos: 310, y_pos: 265 };
  bigTree = { x_pos: 100, y_pos: 230 };
  collectableShoe1 = { x_pos: 770, y_pos: 420, size: 50, isFound: false };
  rocksInSoil = { x_pos: 165, y_pos: 520 };
  mountain = { x_pos: width / 2, y_pos: height / 2 };

  generateStars();
}

function draw() {
  ///////////DRAWING CODE//////////
  // THIS WILL BE THE FIXED SCENERY (STARS, BACKGROUND, GROUND)
  backgroundSky();

  // Mountain and cloud
  mountainDesign();
  cloudDesign();
  // Grassy Ground
  groundDesign();
  // tree
  treeDesign();
  // cinderella shoe
  shoeDesign(collectableShoe1);
  // chracter design

  //draw the canyon
  // canyon
  canyonDesgin();

  //the game character
  if (isLeft && isFalling) {
    // add your jumping-left code
    leftJumpingDesign();
  } else if (isRight && isFalling) {
    // add your jumping-right code
    rightJumpingDesign();
  } else if (isLeft) {
    // add your walking left code
    leftFacingDesign();
  } else if (isRight) {
    // add your walking right code
    rightFacingDesign();
  } else if (isFalling || isPlummeting) {
    // add your jumping facing forwards code
    frontJumpingDesgin();
  } else {
    // add your standing front facing code
    // chracter design
    frontFacingDesign();
  }
  // moving the game character
  if (isLeft == true) {
    gameChar_x -= 5;
  } else if (isRight == true) {
    gameChar_x += 5;
  }

  // gravity
  if (gameChar_y < floorPos_y && isJumping == false) {
    gameChar_y += 2;
    isFalling = true;
  } else {
    isFalling = false;
  }

  // slow jumping
  if (isJumping == true && floorPos_y - gameChar_y < 100) {
    gameChar_y -= 10;
  } else {
    isJumping = false;
  }

  // Player collecting collectable
  if (
    dist(
      collectableShoe1.x_pos,
      collectableShoe1.y_pos,
      gameChar_x,
      gameChar_y
    ) < 30
  ) {
    collectableShoe1.isFound = true;
  }

  // Player falling into cayon
  if (
    gameChar_x > canyon.x_pos - canyon.width / 2 &&
    gameChar_x < canyon.x_pos + canyon.width / 2 &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
    isRight = false;
    isLeft = false;
    gameChar_y += 5;
  }

  ///////////INTERACTION CODE//////////
  //Put conditional statements to move the game character below here
}

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  //open up the console to see how these work
  console.log("keyPressed: " + key);
  console.log("keyPressed: " + keyCode);
  if (key.toLowerCase() == "a" && isPlummeting != true) {
    isLeft = true;
  } else if (key.toLowerCase() == "d" && isPlummeting != true) {
    isRight = true;
  } else if (
    key.toLowerCase() == "w" &&
    isFalling != true &&
    isPlummeting != true
  ) {
    console.log(isJumping);
    isJumping = true;
    console.log(isJumping);
  }
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.

  console.log("keyReleased: " + key);
  console.log("keyReleased: " + keyCode);
  if (key.toLowerCase() == "a") {
    isLeft = false;
  } else if (key.toLowerCase() == "d") {
    isRight = false;
  }
}

/////////////////////////////////////////////////////////////////////////
////////////////////////OBJECT DESIGNS////////////////////

function generateStars() {
  for (let amount_stars = 0; amount_stars < 1000; amount_stars++) {
    let x_pos = random(width);
    let y_pos = random(height / 2);
    stars.push({ x_pos, y_pos });
  }
}

function backgroundSky() {
  // gradient
  for (let y_pos = 0; y_pos < height; y_pos++) {
    let gradient = map(y_pos, 0, height, 0, 1);
    let gradientline = lerpColor(
      color(37, 99, 161),
      color(124, 171, 218),
      gradient
    );
    stroke(gradientline);
    line(0, y_pos, width, y_pos);
  }
  movingStars();
  moonDesign();
}

function movingStars() {
  // stars
  // travel from bottom to top right
  for (let i = 0; i < stars.length; i++) {
    stars[i].x_pos += 0.07;
    stars[i].y_pos -= 0.1;

    // star shape
    noStroke();
    fill(255);
    // random shape will give the illusion of a shiny effect
    ellipse(stars[i].x_pos, stars[i].y_pos, random(0.5, 4), random(0.5, 4));

    // reset the star back generating function
    if (stars[i].x_pos > width || stars[i].y_pos < 0) {
      stars[i].x_pos = random(-100, width);
      stars[i].y_pos = random(height / 2 + 50);
    }
  }
}

function moonDesign() {
  // 3. Moon
  // moon glow
  noStroke();
  for (let glow = 0; glow < 30; glow++) {
    fill(255, 255, 255, 20 - (glow - 0.5));
    ellipse(moon.x_pos, moon.y_pos, 200 + glow * 5, 200 + glow * 5);
  }
  // design of the moon
  fill(192, 192, 192);
  ellipse(moon.x_pos, moon.y_pos, 200, 200);
  fill(227, 226, 226);
  ellipse(moon.x_pos, moon.y_pos - 10, 190, 180);
  fill(200, 200, 200);
  ellipse(moon.x_pos - 60, moon.y_pos - 10, 20, 20);
  ellipse(moon.x_pos + 20, moon.y_pos + 30, 50, 50);
  ellipse(moon.x_pos - 10, moon.y_pos - 50, 30, 30);
  ellipse(moon.x_pos + 60, moon.y_pos - 10, 20, 20);
  ellipse(moon.x_pos + 60, moon.y_pos - 50, 5, 5);
  ellipse(moon.x_pos - 10, moon.y_pos + 20, 30, 30);
}

function mountainDesign() {
  //1. a mountain in the distance
  noStroke();
  fill(81, 133, 184);
  triangle(
    mountain.x_pos - 112,
    floorPos_y,
    mountain.x_pos + 88,
    mountain.y_pos - 138,
    mountain.x_pos + 288,
    floorPos_y
  );
  fill(47, 109, 171);
  triangle(
    mountain.x_pos - 372,
    floorPos_y,
    mountain.x_pos - 172,
    mountain.y_pos - 138,
    mountain.x_pos + 28,
    floorPos_y
  );
  // shadow
  fill(28, 85, 143);
  triangle(
    mountain.x_pos - 372,
    floorPos_y,
    mountain.x_pos - 172,
    mountain.y_pos - 138,
    mountain.x_pos - 262,
    floorPos_y
  );
  triangle(
    mountain.x_pos + 168,
    floorPos_y,
    mountain.x_pos + 368,
    mountain.y_pos - 138,
    mountain.x_pos + 568,
    floorPos_y
  );
  fill(47, 109, 171);
  ellipse(mountain.x_pos - 462, floorPos_y, 400, 400);
  triangle(
    mountain.x_pos + 168,
    floorPos_y,
    mountain.x_pos + 368,
    mountain.y_pos - 138,
    mountain.x_pos + 448,
    floorPos_y
  );
  fill(28, 85, 143);
  ellipse(mountain.x_pos - 462, floorPos_y, 300, 400);
  // Moon infront of mountain
  moonDesign();
}

function cloudDesign() {
  //4. a cloud in the sky
  noStroke();
  fill(255, 230);
  rect(cloud.x_pos - 82, cloud.y_pos - 5, 150, 30, 30);
  fill(255, 250);
  rect(cloud.x_pos - 62, cloud.y_pos - 25, 120, 30, 30);
  ellipse(cloud.x_pos + 58, cloud.y_pos - 5, 50, 50);
  ellipse(cloud.x_pos + 18, cloud.y_pos - 15, 70, 50);
}

function groundDesign() {
  // 2.ground and grass
  noStroke();
  // soil
  fill(36, 52, 56);
  rect(0, floorPos_y, 1024, 218);
  // Rocks In Soil
  for (let i = 1; i < 8; i += 2) {
    fill(137, 148, 153);
    rect(i * rocksInSoil.x_pos - 155, rocksInSoil.y_pos - 45, 150, 40, 5);
    rect(i * rocksInSoil.x_pos - 155, rocksInSoil.y_pos + 5, 70, 40, 5);
    rect(i * rocksInSoil.x_pos - 75, rocksInSoil.y_pos + 5, 70, 40, 5);
    rect(i * rocksInSoil.x_pos + 5, rocksInSoil.y_pos - 45, 40, 90, 5);
    rect(i * rocksInSoil.x_pos + 55, rocksInSoil.y_pos - 45, 90, 60, 5);
    rect(i * rocksInSoil.x_pos + 55, rocksInSoil.y_pos + 25, 90, 20, 5);

    fill(54, 69, 79);
    rect(i * rocksInSoil.x_pos - 153, rocksInSoil.y_pos - 43, 145, 38, 5);
    rect(i * rocksInSoil.x_pos - 153, rocksInSoil.y_pos + 7, 66, 38, 5);
    rect(i * rocksInSoil.x_pos - 73, rocksInSoil.y_pos + 7, 66, 38, 5);
    rect(i * rocksInSoil.x_pos + 7, rocksInSoil.y_pos - 43, 36, 88, 5);
    rect(i * rocksInSoil.x_pos + 57, rocksInSoil.y_pos - 43, 86, 58, 5);
    rect(i * rocksInSoil.x_pos + 57, rocksInSoil.y_pos + 27, 86, 18, 5);
  }
  // grass
  // surface grass
  fill(50, 70, 70);
  beginShape();
  vertex(0, floorPos_y);
  vertex(1024, floorPos_y);
  vertex(1024, 470);
  for (let t = 1020; t > 5; t -= 5) {
    if (t % 2 == 0) {
      vertex(t, 445);
    } else {
      vertex(t, 460);
    }
  }
  vertex(0, 450);
  endShape(CLOSE);
}

function treeDesign() {
  //6. Small tree
  noStroke();
  fill(50, 70, 70);
  rect(smallTree.x_pos - 60, smallTree.y_pos - 55, 120, 120, 30);
  fill(80, 60, 70);
  // truck
  rect(
    smallTree.x_pos - 12,
    smallTree.y_pos,
    20,
    dist(smallTree.x_pos, smallTree.y_pos, smallTree.x_pos, floorPos_y)
  );
  triangle(
    smallTree.x_pos + 8,
    smallTree.y_pos + 22,
    smallTree.x_pos + 8,
    smallTree.y_pos + 36,
    smallTree.x_pos + 50,
    smallTree.y_pos + 9
  );
  triangle(
    smallTree.x_pos - 12,
    smallTree.y_pos + 34,
    smallTree.x_pos - 12,
    smallTree.y_pos + 54,
    smallTree.x_pos - 41,
    smallTree.y_pos + 20
  );
  //6.5. Big Tree
  fill(50, 70, 70);
  rect(bigTree.x_pos - 72, bigTree.y_pos - 70, 150, 150, 30);
  fill(70, 90, 90);
  rect(bigTree.x_pos - 83, bigTree.y_pos + 35, 50, 50, 10);
  fill(40, 60, 60);
  rect(bigTree.x_pos - 40, bigTree.y_pos - 30, 50, 50, 10);
  fill(80, 60, 70);
  rect(
    bigTree.x_pos - 13,
    bigTree.y_pos,
    25,
    dist(bigTree.x_pos, bigTree.y_pos, bigTree.x_pos, floorPos_y)
  );
  triangle(
    bigTree.x_pos + 4,
    bigTree.y_pos - 6,
    bigTree.x_pos + 12,
    bigTree.y_pos + 15,
    bigTree.x_pos + 52,
    bigTree.y_pos - 30
  );
  triangle(
    bigTree.x_pos + 12,
    bigTree.y_pos + 34,
    bigTree.x_pos + 12,
    bigTree.y_pos + 60,
    bigTree.x_pos + 62,
    bigTree.y_pos + 14
  );
  triangle(
    bigTree.x_pos - 13,
    bigTree.y_pos + 12,
    bigTree.x_pos - 13,
    bigTree.y_pos + 30,
    bigTree.x_pos - 56,
    bigTree.y_pos - 15
  );
  fill(70, 90, 90);
  rect(bigTree.x_pos + 44, bigTree.y_pos - 15, 70, 70, 20);
}

function canyonDesgin() {
  //5. a canyon
  noStroke();
  fill(72, 33, 44);
  rect(canyon.x_pos - canyon.width / 2, canyon.y_pos - 68, canyon.width, 576);
  triangle(
    canyon.x_pos - canyon.width / 2,
    canyon.y_pos - 68,
    canyon.x_pos - canyon.width / 2,
    canyon.y_pos - 30,
    canyon.x_pos - canyon.width / 2 - 5,
    canyon.y_pos - 68
  );
  triangle(
    canyon.x_pos + canyon.width / 2,
    canyon.y_pos - 68,
    canyon.x_pos + canyon.width / 2,
    canyon.y_pos - 30,
    canyon.x_pos + canyon.width / 2 + 5,
    canyon.y_pos - 68
  );
  fill(76, 170, 255, 150);
  rect(
    canyon.x_pos - canyon.width / 2,
    canyon.y_pos,
    canyon.width,
    height - canyon.y_pos
  );
  fill(76, 170, 255);
  ellipse(canyon.x_pos, canyon.y_pos, canyon.width, 10);
}

function shoeDesign(collectableShoe) {
  if (collectableShoe.isFound == false) {
    //5. a collectable token - eg. a jewel, fruit, coins
    fill(0, 246, 255, 200);
    rect(collectableShoe.x_pos - 17, collectableShoe.y_pos - 8, 6, 20);
    triangle(
      collectableShoe.x_pos - 12,
      collectableShoe.y_pos - 5,
      collectableShoe.x_pos - 12,
      collectableShoe.y_pos,
      collectableShoe.x_pos - 8,
      collectableShoe.y_pos - 4
    );
    beginShape();
    vertex(collectableShoe.x_pos - 16, collectableShoe.y_pos - 7);
    bezierVertex(
      collectableShoe.x_pos - 17,
      collectableShoe.y_pos - 7,
      collectableShoe.x_pos - 20,
      collectableShoe.y_pos - 13,
      collectableShoe.x_pos - 13,
      collectableShoe.y_pos - 26
    );
    vertex(collectableShoe.x_pos - 6, collectableShoe.y_pos - 17);
    vertex(collectableShoe.x_pos - 16, collectableShoe.y_pos - 7);
    endShape();
    triangle(
      collectableShoe.x_pos - 7,
      collectableShoe.y_pos - 3,
      collectableShoe.x_pos + 4,
      collectableShoe.y_pos + 2,
      collectableShoe.x_pos + 4,
      collectableShoe.y_pos - 9
    );
    beginShape();
    vertex(collectableShoe.x_pos + 15, collectableShoe.y_pos - 1);
    bezierVertex(
      collectableShoe.x_pos + 15,
      collectableShoe.y_pos - 1,
      collectableShoe.x_pos + 24,
      collectableShoe.y_pos,
      collectableShoe.x_pos + 24,
      collectableShoe.y_pos + 8
    );
    bezierVertex(
      collectableShoe.x_pos + 24,
      collectableShoe.y_pos + 8,
      collectableShoe.x_pos + 24,
      collectableShoe.y_pos + 12,
      collectableShoe.x_pos + 18,
      collectableShoe.y_pos + 11
    );
    bezierVertex(
      collectableShoe.x_pos + 18,
      collectableShoe.y_pos + 11,
      collectableShoe.x_pos + 11,
      collectableShoe.y_pos + 11,
      collectableShoe.x_pos + 17,
      collectableShoe.y_pos + 11
    );
    vertex(collectableShoe.x_pos + 9, collectableShoe.y_pos + 6);
    endShape();
    triangle(
      collectableShoe.x_pos,
      collectableShoe.y_pos - 1,
      collectableShoe.x_pos + 6,
      collectableShoe.y_pos + 11,
      collectableShoe.x_pos + 17,
      collectableShoe.y_pos + 11
    );
    fill(0, 195, 255, 200);
    triangle(
      collectableShoe.x_pos - 6,
      collectableShoe.y_pos - 17,
      collectableShoe.x_pos - 16,
      collectableShoe.y_pos - 7,
      collectableShoe.x_pos - 7,
      collectableShoe.y_pos - 3
    );
    triangle(
      collectableShoe.x_pos + 15,
      collectableShoe.y_pos - 1,
      collectableShoe.x_pos + 4,
      collectableShoe.y_pos + 2,
      collectableShoe.x_pos + 4,
      collectableShoe.y_pos - 9
    );
    fill(0, 160, 255, 200);
    triangle(
      collectableShoe.x_pos - 7,
      collectableShoe.y_pos - 3,
      collectableShoe.x_pos - 6,
      collectableShoe.y_pos - 17,
      collectableShoe.x_pos + 4,
      collectableShoe.y_pos - 9
    );
    triangle(
      collectableShoe.x_pos + 15,
      collectableShoe.y_pos - 1,
      collectableShoe.x_pos + 4,
      collectableShoe.y_pos + 2,
      collectableShoe.x_pos + 10,
      collectableShoe.y_pos + 6
    );
  }
}

///////////////////////////////////////////
////////////// Character Design ///////////////////

function frontFacingDesign() {
  // GAME CHARACTER
  // leg
  stroke(0);
  fill(255, 245, 234);
  rect(gameChar_x - 7, gameChar_y - 9, 2, 10);
  rect(gameChar_x, gameChar_y - 9, 2, 10);
  fill(230, 230, 250);
  rect(gameChar_x - 7, gameChar_y - 1, 2, 2);
  rect(gameChar_x, gameChar_y - 1, 2, 2);
  //  Body
  fill(35, 216, 245);
  beginShape();
  vertex(gameChar_x + 5, gameChar_y - 40, gameChar_x - 25, gameChar_y - 40);
  bezierVertex(
    gameChar_x - 25,
    gameChar_y - 40,
    gameChar_x,
    gameChar_y - 32,
    gameChar_x - 20,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x - 20,
    gameChar_y - 7,
    gameChar_x - 5,
    gameChar_y - 2,
    gameChar_x + 15,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x + 15,
    gameChar_y - 7,
    gameChar_x + 5,
    gameChar_y - 22,
    gameChar_x + 5,
    gameChar_y - 32
  );
  bezierVertex(
    gameChar_x + 5,
    gameChar_y - 32,
    gameChar_x + 5,
    gameChar_y - 40,
    gameChar_x + 5,
    gameChar_y - 40
  );
  endShape();

  fill(230, 230, 250);
  ellipse(gameChar_x - 3, gameChar_y - 39, 10, 8);
  fill(255, 245, 234);
  ellipse(gameChar_x - 3, gameChar_y - 41, 6, 5);
  // arm
  triangle(
    gameChar_x - 15,
    gameChar_y - 39,
    gameChar_x - 11,
    gameChar_y - 39,
    gameChar_x - 3,
    gameChar_y - 20
  );
  triangle(
    gameChar_x + 4,
    gameChar_y - 39,
    gameChar_x + 8,
    gameChar_y - 39,
    gameChar_x - 3,
    gameChar_y - 20
  );
  fill(230, 230, 250);
  ellipse(gameChar_x - 12, gameChar_y - 39, 7, 6);
  ellipse(gameChar_x + 6, gameChar_y - 39, 7, 6);
  triangle(
    gameChar_x - 11,
    gameChar_y - 33,
    gameChar_x - 9,
    gameChar_y - 33,
    gameChar_x - 3,
    gameChar_y - 20
  );
  triangle(
    gameChar_x + 2,
    gameChar_y - 33,
    gameChar_x + 4,
    gameChar_y - 33,
    gameChar_x - 3,
    gameChar_y - 20
  );

  // head
  // hair
  fill(255, 239, 153);
  ellipse(gameChar_x - 8, gameChar_y - 72, 10, 8);
  ellipse(gameChar_x - 3, gameChar_y - 74, 10, 8);
  ellipse(gameChar_x - 3, gameChar_y - 74, 10, 8);
  ellipse(gameChar_x + 2, gameChar_y - 72, 6, 8);
  ellipse(gameChar_x - 3, gameChar_y - 57, 30, 30);
  // face
  fill(230, 230, 250);
  ellipse(gameChar_x - 3, gameChar_y - 56, 30, 25);
  fill(255, 239, 153);
  ellipse(gameChar_x - 3, gameChar_y - 54, 28, 22);
  fill(255, 245, 234);
  ellipse(gameChar_x - 3, gameChar_y - 51, 25, 20);
  // eyes
  fill(0);
  ellipse(gameChar_x - 8, gameChar_y - 52, 3, 5);
  ellipse(gameChar_x + 2, gameChar_y - 52, 3, 5);
  fill(255);
  stroke(255);
  ellipse(gameChar_x - 8, gameChar_y - 51, 0.5, 0.5);
  ellipse(gameChar_x + 2, gameChar_y - 51, 0.5, 0.5);
  //Eyelash
  stroke(0);
  strokeWeight(0.5);
  line(gameChar_x - 9, gameChar_y - 54, gameChar_x - 10, gameChar_y - 56);
  line(gameChar_x - 8, gameChar_y - 54, gameChar_x - 9, gameChar_y - 56);
  line(gameChar_x + 3, gameChar_y - 54, gameChar_x + 4, gameChar_y - 56);
  line(gameChar_x + 2, gameChar_y - 54, gameChar_x + 3, gameChar_y - 56);
  // Blash
  strokeWeight(0);
  fill(255, 0, 0, 50);
  ellipse(gameChar_x - 9, gameChar_y - 47, 4, 2);
  ellipse(gameChar_x + 3, gameChar_y - 47, 4, 2);

  // Nose
  strokeWeight(1);
  curve(
    gameChar_x - 2,
    gameChar_y - 47,
    gameChar_x - 3,
    gameChar_y - 48,
    gameChar_x - 4,
    gameChar_y - 48,
    gameChar_x - 5,
    gameChar_y - 47
  );
  // smile
  stroke(225, 146, 188);
  curve(
    gameChar_x + 0.5,
    gameChar_y - 51,
    gameChar_x - 1.5,
    gameChar_y - 44,
    gameChar_x - 4.5,
    gameChar_y - 44,
    gameChar_x - 6.5,
    gameChar_y - 51
  );
  stroke(0);
  // earrings
  fill(230, 230, 250);
  stroke(0);
  ellipse(gameChar_x - 15, gameChar_y - 49, 3, 3);
  ellipse(gameChar_x + 9, gameChar_y - 49, 3, 3);

  //   spackles
  noStroke();
  fill(255);
  ellipse(gameChar_x - 10, gameChar_y - 13, random(2), random(2));
  ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
  ellipse(gameChar_x + 8, gameChar_y - 10, random(2), random(2));
  ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
  ellipse(gameChar_x - 10, gameChar_y - 26, random(2), random(2));
  ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
}

function frontJumpingDesgin() {
  // leg
  stroke(0);
  fill(255, 245, 234);
  rect(gameChar_x - 6, gameChar_y - 9, 2, 6);
  rect(gameChar_x - 1, gameChar_y - 9, 2, 10);
  fill(230, 230, 250);
  rect(gameChar_x - 6, gameChar_y - 3, 2, 2);
  rect(gameChar_x - 1, gameChar_y - 1, 2, 2);
  //  Body
  fill(35, 216, 245);
  beginShape();
  vertex(gameChar_x + 5, gameChar_y - 40, gameChar_x - 25, gameChar_y - 40);
  bezierVertex(
    gameChar_x - 25,
    gameChar_y - 40,
    gameChar_x - 20, //20
    gameChar_y - 2, //2
    gameChar_x - 20,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x - 20,
    gameChar_y - 7,
    gameChar_x - 5,
    gameChar_y - 2,
    gameChar_x + 15,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x + 15,
    gameChar_y - 7,
    gameChar_x + 15,
    gameChar_y - 22,
    gameChar_x + 8,
    gameChar_y - 32
  );
  bezierVertex(
    gameChar_x + 10,
    gameChar_y - 32,
    gameChar_x,
    gameChar_y - 40,
    gameChar_x + 5,
    gameChar_y - 40
  );
  endShape();

  fill(230, 230, 250);
  ellipse(gameChar_x - 3, gameChar_y - 39, 10, 8);
  fill(255, 245, 234);
  ellipse(gameChar_x - 3, gameChar_y - 41, 6, 5);
  // arm
  fill(230, 230, 250);
  beginShape();
  vertex(gameChar_x - 15, gameChar_y - 39);
  vertex(gameChar_x - 20, gameChar_y - 33);
  vertex(gameChar_x - 17, gameChar_y - 22);
  vertex(gameChar_x - 18, gameChar_y - 32);
  vertex(gameChar_x - 13, gameChar_y - 38);
  endShape(CLOSE);
  beginShape();
  vertex(gameChar_x + 9, gameChar_y - 39);
  vertex(gameChar_x + 13, gameChar_y - 33);
  vertex(gameChar_x + 11, gameChar_y - 22);
  vertex(gameChar_x + 11, gameChar_y - 32);
  vertex(gameChar_x + 7, gameChar_y - 38);
  endShape(CLOSE);
  ellipse(gameChar_x - 12, gameChar_y - 39, 7, 6);
  ellipse(gameChar_x + 6, gameChar_y - 39, 7, 6);
  // head
  // hair
  fill(255, 239, 153);
  ellipse(gameChar_x - 8, gameChar_y - 72, 10, 8);
  ellipse(gameChar_x - 3, gameChar_y - 74, 10, 8);
  ellipse(gameChar_x - 3, gameChar_y - 74, 10, 8);
  ellipse(gameChar_x + 2, gameChar_y - 72, 6, 8);
  ellipse(gameChar_x - 3, gameChar_y - 57, 30, 30);
  // face
  fill(230, 230, 250);
  ellipse(gameChar_x - 3, gameChar_y - 56, 30, 25);
  fill(255, 239, 153);
  ellipse(gameChar_x - 3, gameChar_y - 54, 28, 22);
  fill(255, 245, 234);
  ellipse(gameChar_x - 3, gameChar_y - 51, 25, 20);
  // eyes
  fill(0);
  ellipse(gameChar_x - 8, gameChar_y - 52, 3, 5);
  ellipse(gameChar_x + 2, gameChar_y - 52, 3, 5);
  fill(255);
  stroke(255);
  ellipse(gameChar_x - 8, gameChar_y - 51, 0.5, 0.5);
  ellipse(gameChar_x + 2, gameChar_y - 51, 0.5, 0.5);
  //Eyelash
  stroke(0);
  strokeWeight(0.5);
  line(gameChar_x - 9, gameChar_y - 54, gameChar_x - 10, gameChar_y - 56);
  line(gameChar_x - 8, gameChar_y - 54, gameChar_x - 9, gameChar_y - 56);
  line(gameChar_x + 3, gameChar_y - 54, gameChar_x + 4, gameChar_y - 56);
  line(gameChar_x + 2, gameChar_y - 54, gameChar_x + 3, gameChar_y - 56);
  // Blash
  strokeWeight(0);
  fill(255, 0, 0, 50);
  ellipse(gameChar_x - 9, gameChar_y - 47, 4, 2);
  ellipse(gameChar_x + 3, gameChar_y - 47, 4, 2);

  // Nose
  strokeWeight(1);
  curve(
    gameChar_x - 2,
    gameChar_y - 47,
    gameChar_x - 3,
    gameChar_y - 48,
    gameChar_x - 4,
    gameChar_y - 48,
    gameChar_x - 5,
    gameChar_y - 47
  );
  // smile
  stroke(225, 146, 188);
  curve(
    gameChar_x + 0.5,
    gameChar_y - 51,
    gameChar_x - 1.5,
    gameChar_y - 44,
    gameChar_x - 4.5,
    gameChar_y - 44,
    gameChar_x - 6.5,
    gameChar_y - 51
  );
  stroke(0);
  // earrings
  fill(230, 230, 250);
  stroke(0);
  ellipse(gameChar_x - 15, gameChar_y - 49, 3, 3);
  ellipse(gameChar_x + 9, gameChar_y - 49, 3, 3);

  //   spackles
  noStroke();
  fill(255);
  ellipse(gameChar_x - 10, gameChar_y - 13, random(2), random(2));
  ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
  ellipse(gameChar_x + 8, gameChar_y - 10, random(2), random(2));
  ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
  ellipse(gameChar_x - 10, gameChar_y - 26, random(2), random(2));
  ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
}

function leftFacingDesign() {
  // leg
  stroke(0);
  fill(255, 245, 234);
  rect(gameChar_x - 7, gameChar_y - 9, 2, 10);
  rect(gameChar_x, gameChar_y - 9, 2, 10);
  fill(230, 230, 250);
  rect(gameChar_x - 7, gameChar_y - 1, 2, 2);
  rect(gameChar_x, gameChar_y - 1, 2, 2);
  //  Body
  fill(35, 216, 245);
  beginShape();
  vertex(gameChar_x + 5, gameChar_y - 40, gameChar_x - 25, gameChar_y - 40);
  bezierVertex(
    gameChar_x - 25,
    gameChar_y - 40,
    gameChar_x,
    gameChar_y - 32,
    gameChar_x - 20,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x - 20,
    gameChar_y - 7,
    gameChar_x - 5,
    gameChar_y - 2,
    gameChar_x + 15,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x + 15,
    gameChar_y - 7,
    gameChar_x + 5,
    gameChar_y - 22,
    gameChar_x + 5,
    gameChar_y - 32
  );
  bezierVertex(
    gameChar_x + 5,
    gameChar_y - 32,
    gameChar_x + 5,
    gameChar_y - 40,
    gameChar_x + 5,
    gameChar_y - 40
  );
  endShape();

  fill(230, 230, 250);
  ellipse(gameChar_x - 3, gameChar_y - 39, 10, 8);
  fill(255, 245, 234);
  ellipse(gameChar_x - 3, gameChar_y - 41, 6, 5);
  // arm
  triangle(
    gameChar_x - 15,
    gameChar_y - 39,
    gameChar_x - 11,
    gameChar_y - 39,
    gameChar_x - 3,
    gameChar_y - 20
  );
  triangle(
    gameChar_x + 4,
    gameChar_y - 39,
    gameChar_x + 8,
    gameChar_y - 39,
    gameChar_x - 3,
    gameChar_y - 20
  );
  fill(230, 230, 250);
  ellipse(gameChar_x - 12, gameChar_y - 39, 7, 6);
  ellipse(gameChar_x + 6, gameChar_y - 39, 7, 6);
  triangle(
    gameChar_x - 11,
    gameChar_y - 33,
    gameChar_x - 9,
    gameChar_y - 33,
    gameChar_x - 3,
    gameChar_y - 20
  );
  triangle(
    gameChar_x + 2,
    gameChar_y - 33,
    gameChar_x + 4,
    gameChar_y - 33,
    gameChar_x - 3,
    gameChar_y - 20
  );

  // head
  // hair
  fill(255, 239, 153);
  ellipse(gameChar_x + 6, gameChar_y - 65, 16, 18);
  ellipse(gameChar_x - 3, gameChar_y - 57, 30, 30);
  fill(230, 230, 250);
  // hairband
  beginShape();
  vertex(gameChar_x - 4, gameChar_y - 72);
  vertex(gameChar_x + 2, gameChar_y - 54);
  vertex(gameChar_x + 5, gameChar_y - 55);
  vertex(gameChar_x + 2, gameChar_y - 72);
  endShape(CLOSE);
  // face
  fill(255, 245, 234);
  beginShape();
  vertex(gameChar_x - 17, gameChar_y - 62);
  bezierVertex(
    gameChar_x - 14,
    gameChar_y - 65,
    gameChar_x - 7,
    gameChar_y - 64,
    gameChar_x - 1,
    gameChar_y - 59
  );
  bezierVertex(
    gameChar_x + 2,
    gameChar_y - 54,
    gameChar_x + 4,
    gameChar_y - 51,
    gameChar_x + 3,
    gameChar_y - 44
  );
  bezierVertex(
    gameChar_x - 13,
    gameChar_y - 38,
    gameChar_x - 20,
    gameChar_y - 50,
    gameChar_x - 17,
    gameChar_y - 62
  );
  endShape();
  // eyes
  fill(0);
  ellipse(gameChar_x - 12, gameChar_y - 57, 3, 5);
  fill(255);
  stroke(255);
  ellipse(gameChar_x - 13, gameChar_y - 56, 0.5, 0.5);
  //Eyelash
  stroke(0);
  strokeWeight(0.5);
  line(gameChar_x - 13, gameChar_y - 59, gameChar_x - 12, gameChar_y - 61);
  line(gameChar_x - 12, gameChar_y - 59, gameChar_x - 11, gameChar_y - 61);
  // Blash
  strokeWeight(0);
  fill(255, 0, 0, 50);
  ellipse(gameChar_x - 9, gameChar_y - 53, 4, 2);

  // Nose
  strokeWeight(1);
  curve(
    gameChar_x - 15,
    gameChar_y - 50,
    gameChar_x - 16,
    gameChar_y - 51,
    gameChar_x - 17,
    gameChar_y - 51,
    gameChar_x - 18,
    gameChar_y - 50
  );
  // smile
  stroke(225, 146, 188);
  // gameChar_x = 45;
  // gameChar_y = 337;
  curve(
    gameChar_x - 15,
    gameChar_y - 47,
    gameChar_x - 14,
    gameChar_y - 47,
    gameChar_x - 13,
    gameChar_y - 48,
    gameChar_x - 12,
    gameChar_y - 49
  );
  stroke(0);
  // earrings and ear
  fill(255, 245, 234);
  ellipse(gameChar_x - 1, gameChar_y - 57, 4, 7);
  fill(230, 230, 250);
  stroke(0);
  ellipse(gameChar_x - 1, gameChar_y - 53, 3, 3);

  //   spackles
  noStroke();
  fill(255);
  ellipse(gameChar_x - 10, gameChar_y - 13, random(2), random(2));
  ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
  ellipse(gameChar_x + 8, gameChar_y - 10, random(2), random(2));
  ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
  ellipse(gameChar_x - 10, gameChar_y - 26, random(2), random(2));
  ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
}

function leftJumpingDesign() {
  // leg
  stroke(0);
  fill(255, 245, 234);
  rect(gameChar_x - 6, gameChar_y - 9, 2, 6);
  rect(gameChar_x - 1, gameChar_y - 9, 2, 10);
  fill(230, 230, 250);
  rect(gameChar_x - 6, gameChar_y - 3, 2, 2);
  rect(gameChar_x - 1, gameChar_y - 1, 2, 2);
  //  Body
  fill(35, 216, 245);
  beginShape();
  vertex(gameChar_x + 5, gameChar_y - 40, gameChar_x - 25, gameChar_y - 40);
  bezierVertex(
    gameChar_x - 25,
    gameChar_y - 40,
    gameChar_x - 20, //20
    gameChar_y - 2, //2
    gameChar_x - 20,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x - 20,
    gameChar_y - 7,
    gameChar_x - 5,
    gameChar_y - 2,
    gameChar_x + 15,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x + 15,
    gameChar_y - 7,
    gameChar_x + 15,
    gameChar_y - 22,
    gameChar_x + 8,
    gameChar_y - 32
  );
  bezierVertex(
    gameChar_x + 10,
    gameChar_y - 32,
    gameChar_x,
    gameChar_y - 40,
    gameChar_x + 5,
    gameChar_y - 40
  );
  endShape();

  fill(230, 230, 250);
  ellipse(gameChar_x - 3, gameChar_y - 39, 10, 8);
  fill(255, 245, 234);
  ellipse(gameChar_x - 3, gameChar_y - 41, 6, 5);
  // arm
  fill(230, 230, 250);
  beginShape();
  vertex(gameChar_x - 15, gameChar_y - 39);
  vertex(gameChar_x - 20, gameChar_y - 33);
  vertex(gameChar_x - 17, gameChar_y - 22);
  vertex(gameChar_x - 18, gameChar_y - 32);
  vertex(gameChar_x - 13, gameChar_y - 38);
  endShape(CLOSE);
  beginShape();
  vertex(gameChar_x + 9, gameChar_y - 39);
  vertex(gameChar_x + 13, gameChar_y - 33);
  vertex(gameChar_x + 11, gameChar_y - 22);
  vertex(gameChar_x + 11, gameChar_y - 32);
  vertex(gameChar_x + 7, gameChar_y - 38);
  endShape(CLOSE);
  ellipse(gameChar_x - 12, gameChar_y - 39, 7, 6);
  ellipse(gameChar_x + 6, gameChar_y - 39, 7, 6);
  // head
  // hair
  fill(255, 239, 153);
  ellipse(gameChar_x + 6, gameChar_y - 65, 16, 18);
  ellipse(gameChar_x - 3, gameChar_y - 57, 30, 30);
  fill(230, 230, 250);
  // hairband
  beginShape();
  vertex(gameChar_x - 4, gameChar_y - 72);
  vertex(gameChar_x + 2, gameChar_y - 54);
  vertex(gameChar_x + 5, gameChar_y - 55);
  vertex(gameChar_x + 2, gameChar_y - 72);
  endShape(CLOSE);
  // face
  fill(255, 245, 234);
  beginShape();
  vertex(gameChar_x - 17, gameChar_y - 62);
  bezierVertex(
    gameChar_x - 14,
    gameChar_y - 65,
    gameChar_x - 7,
    gameChar_y - 64,
    gameChar_x - 1,
    gameChar_y - 59
  );
  bezierVertex(
    gameChar_x + 2,
    gameChar_y - 54,
    gameChar_x + 4,
    gameChar_y - 51,
    gameChar_x + 3,
    gameChar_y - 44
  );
  bezierVertex(
    gameChar_x - 13,
    gameChar_y - 38,
    gameChar_x - 20,
    gameChar_y - 50,
    gameChar_x - 17,
    gameChar_y - 62
  );
  endShape();
  // eyes
  fill(0);
  ellipse(gameChar_x - 12, gameChar_y - 57, 3, 5);
  fill(255);
  stroke(255);
  ellipse(gameChar_x - 13, gameChar_y - 56, 0.5, 0.5);
  //Eyelash
  stroke(0);
  strokeWeight(0.5);
  line(gameChar_x - 13, gameChar_y - 59, gameChar_x - 12, gameChar_y - 61);
  line(gameChar_x - 12, gameChar_y - 59, gameChar_x - 11, gameChar_y - 61);
  // Blash
  strokeWeight(0);
  fill(255, 0, 0, 50);
  ellipse(gameChar_x - 9, gameChar_y - 53, 4, 2);

  // Nose
  strokeWeight(1);
  curve(
    gameChar_x - 15,
    gameChar_y - 50,
    gameChar_x - 16,
    gameChar_y - 51,
    gameChar_x - 17,
    gameChar_y - 51,
    gameChar_x - 18,
    gameChar_y - 50
  );
  // smile
  stroke(225, 146, 188);
  // gameChar_x = 45;
  // gameChar_y = 337;
  curve(
    gameChar_x - 15,
    gameChar_y - 47,
    gameChar_x - 14,
    gameChar_y - 47,
    gameChar_x - 13,
    gameChar_y - 48,
    gameChar_x - 12,
    gameChar_y - 49
  );
  stroke(0);
  // earrings and ear
  fill(255, 245, 234);
  ellipse(gameChar_x - 1, gameChar_y - 57, 4, 7);
  fill(230, 230, 250);
  stroke(0);
  ellipse(gameChar_x - 1, gameChar_y - 53, 3, 3);

  //   spackles
  noStroke();
  fill(255);
  ellipse(gameChar_x - 10, gameChar_y - 13, random(2), random(2));
  ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
  ellipse(gameChar_x + 8, gameChar_y - 10, random(2), random(2));
  ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
  ellipse(gameChar_x - 10, gameChar_y - 26, random(2), random(2));
  ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
}

function rightFacingDesign() {
  // leg
  stroke(0);
  fill(255, 245, 234);
  rect(gameChar_x - 7, gameChar_y - 9, 2, 10);
  rect(gameChar_x, gameChar_y - 9, 2, 10);
  fill(230, 230, 250);
  rect(gameChar_x - 7, gameChar_y - 1, 2, 2);
  rect(gameChar_x, gameChar_y - 1, 2, 2);
  //  Body
  fill(35, 216, 245);
  beginShape();
  vertex(gameChar_x + 5, gameChar_y - 40, gameChar_x - 25, gameChar_y - 40);
  bezierVertex(
    gameChar_x - 25,
    gameChar_y - 40,
    gameChar_x,
    gameChar_y - 32,
    gameChar_x - 20,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x - 20,
    gameChar_y - 7,
    gameChar_x - 5,
    gameChar_y - 2,
    gameChar_x + 15,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x + 15,
    gameChar_y - 7,
    gameChar_x + 5,
    gameChar_y - 22,
    gameChar_x + 5,
    gameChar_y - 32
  );
  bezierVertex(
    gameChar_x + 5,
    gameChar_y - 32,
    gameChar_x + 5,
    gameChar_y - 40,
    gameChar_x + 5,
    gameChar_y - 40
  );
  endShape();

  fill(230, 230, 250);
  ellipse(gameChar_x - 3, gameChar_y - 39, 10, 8);
  fill(255, 245, 234);
  ellipse(gameChar_x - 3, gameChar_y - 41, 6, 5);
  // arm
  triangle(
    gameChar_x - 15,
    gameChar_y - 39,
    gameChar_x - 11,
    gameChar_y - 39,
    gameChar_x - 3,
    gameChar_y - 20
  );
  triangle(
    gameChar_x + 4,
    gameChar_y - 39,
    gameChar_x + 8,
    gameChar_y - 39,
    gameChar_x - 3,
    gameChar_y - 20
  );
  fill(230, 230, 250);
  ellipse(gameChar_x - 12, gameChar_y - 39, 7, 6);
  ellipse(gameChar_x + 6, gameChar_y - 39, 7, 6);
  triangle(
    gameChar_x - 11,
    gameChar_y - 33,
    gameChar_x - 9,
    gameChar_y - 33,
    gameChar_x - 3,
    gameChar_y - 20
  );
  triangle(
    gameChar_x + 2,
    gameChar_y - 33,
    gameChar_x + 4,
    gameChar_y - 33,
    gameChar_x - 3,
    gameChar_y - 20
  );

  // head
  // hair
  fill(255, 239, 153);
  ellipse(gameChar_x - 12, gameChar_y - 65, 16, 18);
  ellipse(gameChar_x - 3, gameChar_y - 57, 30, 30);
  fill(230, 230, 250);
  // hairband
  beginShape();
  vertex(gameChar_x - 8, gameChar_y - 72);
  vertex(gameChar_x - 11, gameChar_y - 55);
  vertex(gameChar_x - 8, gameChar_y - 54);
  vertex(gameChar_x - 2, gameChar_y - 72);
  endShape(CLOSE);
  // face
  fill(255, 245, 234);
  beginShape();
  vertex(gameChar_x + 10, gameChar_y - 64);
  bezierVertex(
    gameChar_x + 4,
    gameChar_y - 65,
    gameChar_x,
    gameChar_y - 64,
    gameChar_x - 5,
    gameChar_y - 59
  );
  bezierVertex(
    gameChar_x - 6,
    gameChar_y - 59,
    gameChar_x - 11,
    gameChar_y - 51,
    gameChar_x - 8,
    gameChar_y - 43
  );
  bezierVertex(
    gameChar_x + 11,
    gameChar_y - 39,
    gameChar_x + 14,
    gameChar_y - 55,
    gameChar_x + 10,
    gameChar_y - 64
  );
  endShape();
  // eyes
  fill(0);
  ellipse(gameChar_x + 6, gameChar_y - 57, 3, 5);
  fill(255);
  stroke(255);
  ellipse(gameChar_x + 7, gameChar_y - 56, 0.5, 0.5);
  //Eyelash
  stroke(0);
  strokeWeight(0.5);
  line(gameChar_x + 6, gameChar_y - 59, gameChar_x + 5, gameChar_y - 61);
  line(gameChar_x + 5, gameChar_y - 59, gameChar_x + 4, gameChar_y - 61);
  // Blash
  strokeWeight(0);
  fill(255, 0, 0, 50);
  ellipse(gameChar_x + 2, gameChar_y - 53, 4, 2);

  // Nose
  strokeWeight(1);
  curve(
    gameChar_x + 8,
    gameChar_y - 50,
    gameChar_x + 9,
    gameChar_y - 51,
    gameChar_x + 10,
    gameChar_y - 51,
    gameChar_x + 11,
    gameChar_y - 50
  );
  // smile
  stroke(225, 146, 188);
  curve(
    gameChar_x + 5,
    gameChar_y - 49,
    gameChar_x + 6,
    gameChar_y - 48,
    gameChar_x + 8,
    gameChar_y - 47,
    gameChar_x + 11,
    gameChar_y - 47
  );
  stroke(0);
  // earrings and ear
  fill(255, 245, 234);
  ellipse(gameChar_x - 5, gameChar_y - 57, 4, 7);
  fill(230, 230, 250);
  stroke(0);
  ellipse(gameChar_x - 5, gameChar_y - 53, 3, 3);

  //   spackles
  noStroke();
  fill(255);
  ellipse(gameChar_x - 10, gameChar_y - 13, random(2), random(2));
  ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
  ellipse(gameChar_x + 8, gameChar_y - 10, random(2), random(2));
  ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
  ellipse(gameChar_x - 10, gameChar_y - 26, random(2), random(2));
  ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
}

function rightJumpingDesign() {
  // leg
  stroke(0);
  fill(255, 245, 234);
  rect(gameChar_x - 6, gameChar_y - 9, 2, 10);
  rect(gameChar_x - 1, gameChar_y - 9, 2, 6);
  fill(230, 230, 250);
  rect(gameChar_x - 6, gameChar_y - 1, 2, 2);
  rect(gameChar_x - 1, gameChar_y - 3, 2, 2);
  //  Body
  fill(35, 216, 245);
  beginShape();
  vertex(gameChar_x + 5, gameChar_y - 40, gameChar_x - 25, gameChar_y - 40);
  bezierVertex(
    gameChar_x - 25,
    gameChar_y - 40,
    gameChar_x - 20, //20
    gameChar_y - 2, //2
    gameChar_x - 20,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x - 20,
    gameChar_y - 7,
    gameChar_x - 5,
    gameChar_y - 2,
    gameChar_x + 15,
    gameChar_y - 7
  );
  bezierVertex(
    gameChar_x + 15,
    gameChar_y - 7,
    gameChar_x + 15,
    gameChar_y - 22,
    gameChar_x + 8,
    gameChar_y - 32
  );
  bezierVertex(
    gameChar_x + 10,
    gameChar_y - 32,
    gameChar_x,
    gameChar_y - 40,
    gameChar_x + 5,
    gameChar_y - 40
  );
  endShape();

  fill(230, 230, 250);
  ellipse(gameChar_x - 3, gameChar_y - 39, 10, 8);
  fill(255, 245, 234);
  ellipse(gameChar_x - 3, gameChar_y - 41, 6, 5);
  // arm
  fill(230, 230, 250);
  beginShape();
  vertex(gameChar_x - 15, gameChar_y - 39);
  vertex(gameChar_x - 20, gameChar_y - 33);
  vertex(gameChar_x - 17, gameChar_y - 22);
  vertex(gameChar_x - 18, gameChar_y - 32);
  vertex(gameChar_x - 13, gameChar_y - 38);
  endShape(CLOSE);
  beginShape();
  vertex(gameChar_x + 9, gameChar_y - 39);
  vertex(gameChar_x + 13, gameChar_y - 33);
  vertex(gameChar_x + 11, gameChar_y - 22);
  vertex(gameChar_x + 11, gameChar_y - 32);
  vertex(gameChar_x + 7, gameChar_y - 38);
  endShape(CLOSE);
  ellipse(gameChar_x - 12, gameChar_y - 39, 7, 6);
  ellipse(gameChar_x + 6, gameChar_y - 39, 7, 6);
  // head
  // hair
  fill(255, 239, 153);
  ellipse(gameChar_x - 12, gameChar_y - 65, 16, 18);
  ellipse(gameChar_x - 3, gameChar_y - 57, 30, 30);
  fill(230, 230, 250);
  // hairband
  beginShape();
  vertex(gameChar_x - 8, gameChar_y - 72);
  vertex(gameChar_x - 11, gameChar_y - 55);
  vertex(gameChar_x - 8, gameChar_y - 54);
  vertex(gameChar_x - 2, gameChar_y - 72);
  endShape(CLOSE);
  // face
  fill(255, 245, 234);
  beginShape();
  vertex(gameChar_x + 10, gameChar_y - 64);
  bezierVertex(
    gameChar_x + 4,
    gameChar_y - 65,
    gameChar_x,
    gameChar_y - 64,
    gameChar_x - 5,
    gameChar_y - 59
  );
  bezierVertex(
    gameChar_x - 6,
    gameChar_y - 59,
    gameChar_x - 11,
    gameChar_y - 51,
    gameChar_x - 8,
    gameChar_y - 43
  );
  bezierVertex(
    gameChar_x + 11,
    gameChar_y - 39,
    gameChar_x + 14,
    gameChar_y - 55,
    gameChar_x + 10,
    gameChar_y - 64
  );
  endShape();
  // eyes
  fill(0);
  ellipse(gameChar_x + 6, gameChar_y - 57, 3, 5);
  fill(255);
  stroke(255);
  ellipse(gameChar_x + 7, gameChar_y - 56, 0.5, 0.5);
  //Eyelash
  stroke(0);
  strokeWeight(0.5);
  line(gameChar_x + 6, gameChar_y - 59, gameChar_x + 5, gameChar_y - 61);
  line(gameChar_x + 5, gameChar_y - 59, gameChar_x + 4, gameChar_y - 61);
  // Blash
  strokeWeight(0);
  fill(255, 0, 0, 50);
  ellipse(gameChar_x + 2, gameChar_y - 53, 4, 2);

  // Nose
  strokeWeight(1);
  curve(
    gameChar_x + 8,
    gameChar_y - 50,
    gameChar_x + 9,
    gameChar_y - 51,
    gameChar_x + 10,
    gameChar_y - 51,
    gameChar_x + 11,
    gameChar_y - 50
  );
  // smile
  stroke(225, 146, 188);
  curve(
    gameChar_x + 5,
    gameChar_y - 49,
    gameChar_x + 6,
    gameChar_y - 48,
    gameChar_x + 8,
    gameChar_y - 47,
    gameChar_x + 11,
    gameChar_y - 47
  );
  stroke(0);
  // earrings and ear
  fill(255, 245, 234);
  ellipse(gameChar_x - 5, gameChar_y - 57, 4, 7);
  fill(230, 230, 250);
  stroke(0);
  ellipse(gameChar_x - 5, gameChar_y - 53, 3, 3);

  //   spackles
  noStroke();
  fill(255);
  ellipse(gameChar_x - 10, gameChar_y - 13, random(2), random(2));
  ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
  ellipse(gameChar_x + 8, gameChar_y - 10, random(2), random(2));
  ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
  ellipse(gameChar_x - 10, gameChar_y - 26, random(2), random(2));
  ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
}
