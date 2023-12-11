/*

The Game Project

Week 3

Game interaction

*/

var grassX_pos = -200;
var cloudY_pos = 105;
var smallTreeY_pos = 265;
var bigTreeY_pos = 230;
var rocksInSoilY_pos = 520;

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;

// addition variable for addition function
// jumpinng effect
var isJumping = 0;
var acceleration = 0;
// death animation effect
var death = false;
// 60 is equal to 1 second, animation delay is half a second
var deathCountDown = 15;
var deathAcceleration = 12;

function setup() {
  createCanvas(1024, 576);
  floorPos_y = (height * 3) / 4;
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  moon = { x_pos: 781, y_pos: 150 };
  cloud_x = [282, 500, 900, 1150, 1700];
  canyon = { y_pos: 500, width: 100 };
  canyon_x = [645, 1000, 1500, 2000];
  smallTree_x = [310, 610, 1000, 1500];
  bigTree_x = [210, 710, 1100, 1550];
  // size range from 0 to 10
  collectableShoe_x = [710, 1200, 1600];
  collectableShoe_isFound = [false, false, false];
  collectableShoe = { y_pos: 423, size: 1 };
  rocksInSoil_x = [];
  for (let numRocks = 0; numRocks < 8; numRocks++) {
    rocksInSoil_x.push(0 + 330 * numRocks);
  }
  mountain = { x_pos: width / 2, y_pos: height / 2 };

  stars = [];
  // Creation of Stars, 1000 stars in sky
  for (let amount_stars = 0; amount_stars < 800; amount_stars++) {
    let x_pos = random(-100, width);
    let y_pos = random(height / 2);
    stars.push({ x_pos, y_pos });
  }
}

function draw() {
  ///////////DRAWING CODE//////////
  // THIS WILL BE THE FIXED SCENERY (STARS, BACKGROUND)
  // gradient background
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

  // stars
  // travel from bottom to top right
  for (let i = 0; i < stars.length; i++) {
    if (death == false) {
      stars[i].x_pos += 0.06;
      stars[i].y_pos -= 0.07;
      // star shape
      noStroke();
      fill(255);
      // random shape will give the illusion of a shiny effect
      ellipse(stars[i].x_pos, stars[i].y_pos, random(0.5, 4), random(0.5, 4));
    }
    fill(255);
    ellipse(stars[i].x_pos, stars[i].y_pos, 2, 2);
    // reset the star back generating function
    if (stars[i].x_pos > width || stars[i].y_pos < 10) {
      stars[i].x_pos = random(-100, width);
      stars[i].y_pos = random(floorPos_y, height / 2 - 200);
    }
  }
  // START OF MOVABLE OBJECTS
  // Mountain and cloud
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

  // Moon in front of Mountains
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

  //Cloud
  //4. a cloud in the sky
  for (var i = 0; i < cloud_x.length; i++) {
    noStroke();
    fill(255, 230);
    rect(cloud_x[i] - 82, cloudY_pos - 5, 150, 30, 30);
    fill(255, 250);
    rect(cloud_x[i] - 62, cloudY_pos - 25, 120, 30, 30);
    ellipse(cloud_x[i] + 58, cloudY_pos - 5, 50, 50);
    ellipse(cloud_x[i] + 18, cloudY_pos - 15, 70, 50);
  }

  // Grassy Ground
  // 2.ground and grass
  noStroke();
  // soil
  fill(36, 52, 56);
  rect(0, floorPos_y, 1024, 218);
  // Rocks In Soil
  for (let i = 0; i < rocksInSoil_x.length; i++) {
    fill(137, 148, 153);
    rect(rocksInSoil_x[i] - 155, rocksInSoilY_pos - 45, 150, 40, 5);
    rect(rocksInSoil_x[i] - 155, rocksInSoilY_pos + 5, 70, 40, 5);
    rect(rocksInSoil_x[i] - 75, rocksInSoilY_pos + 5, 70, 40, 5);
    rect(rocksInSoil_x[i] + 5, rocksInSoilY_pos - 45, 40, 90, 5);
    rect(rocksInSoil_x[i] + 55, rocksInSoilY_pos - 45, 90, 60, 5);
    rect(rocksInSoil_x[i] + 55, rocksInSoilY_pos + 25, 90, 20, 5);

    fill(54, 69, 79);
    rect(rocksInSoil_x[i] - 153, rocksInSoilY_pos - 43, 145, 38, 5);
    rect(rocksInSoil_x[i] - 153, rocksInSoilY_pos + 7, 66, 38, 5);
    rect(rocksInSoil_x[i] - 73, rocksInSoilY_pos + 7, 66, 38, 5);
    rect(rocksInSoil_x[i] + 7, rocksInSoilY_pos - 43, 36, 88, 5);
    rect(rocksInSoil_x[i] + 57, rocksInSoilY_pos - 43, 86, 58, 5);
    rect(rocksInSoil_x[i] + 57, rocksInSoilY_pos + 27, 86, 18, 5);
  }
  // grass
  // surface grass
  fill(50, 70, 70);
  beginShape();
  vertex(grassX_pos, floorPos_y);
  vertex(3000, floorPos_y);
  vertex(3000, 470);
  for (let t = 3000; t > 5; t -= 5) {
    if (t % 2 == 0) {
      vertex(t + grassX_pos, 445);
    } else {
      vertex(t + grassX_pos, 460);
    }
  }
  vertex(grassX_pos, 450);
  endShape(CLOSE);

  // tree
  //6. Small tree
  for (var i = 0; i < smallTree_x.length; i++) {
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

  //6.5. Big Tree
  for (var i = 0; i < smallTree_x.length; i++) {
    fill(50, 70, 70);
    rect(bigTree_x[i] - 72, bigTreeY_pos - 70, 150, 150, 30);
    fill(70, 90, 90);
    rect(bigTree_x[i] - 83, bigTreeY_pos + 35, 50, 50, 10);
    fill(40, 60, 60);
    rect(bigTree_x[i] - 40, bigTreeY_pos - 30, 50, 50, 10);
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

  //draw the canyon
  // canyon
  //5. a canyon
  for (var i = 0; i < canyon_x.length; i++) {
    noStroke();
    fill(72, 33, 44);
    rect(canyon_x[i] - canyon.width / 2, canyon.y_pos - 68, canyon.width, 576);
    triangle(
      canyon_x[i] - canyon.width / 2,
      canyon.y_pos - 68,
      canyon_x[i] - canyon.width / 2,
      canyon.y_pos - 30,
      canyon_x[i] - canyon.width / 2 - 5,
      canyon.y_pos - 68
    );
    triangle(
      canyon_x[i] + canyon.width / 2,
      canyon.y_pos - 68,
      canyon_x[i] + canyon.width / 2,
      canyon.y_pos - 30,
      canyon_x[i] + canyon.width / 2 + 5,
      canyon.y_pos - 68
    );
    fill(76, 170, 255, 150);
    rect(
      canyon_x[i] - canyon.width / 2,
      canyon.y_pos,
      canyon.width,
      height - canyon.y_pos
    );
    fill(76, 170, 255);
    ellipse(canyon_x[i], canyon.y_pos, canyon.width, 10);
  }

  ///////////ACTION CODE//////////
  // Control player Moving Direction

  //the game character
  if (isLeft && isFalling && isJumping <= 0) {
    // add your jumping-left code and only after jumping acceleration is over

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
    ellipse(gameChar_x - 10, gameChar_y - 13, random(4), random(4));
    ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
    ellipse(gameChar_x + 8, gameChar_y - 10, random(4), random(4));
    ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
    ellipse(gameChar_x - 10, gameChar_y - 26, random(4), random(4));
    ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
  } else if (isRight && isFalling && isJumping <= 0) {
    // add your jumping-right code and only after jumping acceleration is over

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
    ellipse(gameChar_x - 10, gameChar_y - 13, random(4), random(4));
    ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
    ellipse(gameChar_x + 8, gameChar_y - 10, random(4), random(4));
    ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
    ellipse(gameChar_x - 10, gameChar_y - 26, random(4), random(4));
    ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
  } else if (isLeft) {
    // add your walking left code

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
    ellipse(gameChar_x - 10, gameChar_y - 13, random(4), random(4));
    ellipse(gameChar_x, gameChar_y - 17, random(4), random(4));
    ellipse(gameChar_x + 8, gameChar_y - 10, random(4), random(4));
    ellipse(gameChar_x - 5, gameChar_y - 8, random(4), random(4));
    ellipse(gameChar_x - 10, gameChar_y - 26, random(4), random(4));
    ellipse(gameChar_x - 2, gameChar_y - 32, random(4), random(4));
  } else if (isRight) {
    // add your walking right code

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
    ellipse(gameChar_x - 10, gameChar_y - 13, random(4), random(4));
    ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
    ellipse(gameChar_x + 8, gameChar_y - 10, random(4), random(4));
    ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
    ellipse(gameChar_x - 10, gameChar_y - 26, random(4), random(4));
    ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
  } else if ((isFalling || isPlummeting) && isJumping <= 0) {
    // add your jumping facing forwards code and only after jumping acceleration is over

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
    ellipse(gameChar_x - 10, gameChar_y - 13, random(4), random(4));
    ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
    ellipse(gameChar_x + 8, gameChar_y - 10, random(4), random(4));
    ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
    ellipse(gameChar_x - 10, gameChar_y - 26, random(4), random(4));
    ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
  } else {
    // add your standing front facing code
    // chracter design
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
    ellipse(gameChar_x - 10, gameChar_y - 13, random(4), random(4));
    ellipse(gameChar_x, gameChar_y - 17, random(2), random(2));
    ellipse(gameChar_x + 8, gameChar_y - 10, random(4), random(4));
    ellipse(gameChar_x - 5, gameChar_y - 8, random(2), random(2));
    ellipse(gameChar_x - 10, gameChar_y - 26, random(4), random(4));
    ellipse(gameChar_x - 2, gameChar_y - 32, random(2), random(2));
  }

  // Collectable Items
  // cinderella shoe
  for (let i = 0; i < collectableShoe_x.length; i++) {
    if (collectableShoe_isFound[i] == false) {
      //5. a collectable token - eg. a jewel, fruit, coins
      fill(0, 246, 255, 200);
      rect(
        collectableShoe_x[i] - 17,
        collectableShoe.y_pos - 11 - collectableShoe.size,
        6 + collectableShoe.size / 2,
        20 + collectableShoe.size
      );
      beginShape();
      vertex(collectableShoe_x[i] - 16, collectableShoe.y_pos - 10);
      bezierVertex(
        collectableShoe_x[i] - 17,
        collectableShoe.y_pos - 10,
        collectableShoe_x[i] - 20,
        collectableShoe.y_pos - 16,
        collectableShoe_x[i] - 13,
        collectableShoe.y_pos - 29 - collectableShoe.size
      );
      vertex(
        collectableShoe_x[i] - 6,
        collectableShoe.y_pos - 20 - collectableShoe.size
      );
      vertex(collectableShoe_x[i] - 16, collectableShoe.y_pos - 10);
      endShape();
      triangle(
        collectableShoe_x[i] - 7,
        collectableShoe.y_pos - 6,
        collectableShoe_x[i] + 4,
        collectableShoe.y_pos - 1,
        collectableShoe_x[i] + 4,
        collectableShoe.y_pos - 12 - collectableShoe.size
      );
      beginShape();
      vertex(
        collectableShoe_x[i] + 15,
        collectableShoe.y_pos - 4 - collectableShoe.size
      );
      bezierVertex(
        collectableShoe_x[i] + 15,
        collectableShoe.y_pos - 4 - collectableShoe.size,
        collectableShoe_x[i] + 24 + collectableShoe.size,
        collectableShoe.y_pos - 3 - collectableShoe.size,
        collectableShoe_x[i] + 24 + collectableShoe.size,
        collectableShoe.y_pos + 5
      );
      bezierVertex(
        collectableShoe_x[i] + 24 + collectableShoe.size,
        collectableShoe.y_pos + 5 + collectableShoe.size / 2,
        collectableShoe_x[i] + 24,
        collectableShoe.y_pos + 9,
        collectableShoe_x[i] + 18,
        collectableShoe.y_pos + 8
      );
      bezierVertex(
        collectableShoe_x[i] + 18,
        collectableShoe.y_pos + 8,
        collectableShoe_x[i] + 11,
        collectableShoe.y_pos + 8,
        collectableShoe_x[i] + 17,
        collectableShoe.y_pos + 8
      );
      vertex(collectableShoe_x[i] + 9, collectableShoe.y_pos + 3);
      endShape();
      triangle(
        collectableShoe_x[i],
        collectableShoe.y_pos - 4,
        collectableShoe_x[i] + 6,
        collectableShoe.y_pos + 8,
        collectableShoe_x[i] + 17,
        collectableShoe.y_pos + 8
      );
      fill(0, 195, 255, 200);
      triangle(
        collectableShoe_x[i] - 6,
        collectableShoe.y_pos - 20 - collectableShoe.size,
        collectableShoe_x[i] - 16,
        collectableShoe.y_pos - 10,
        collectableShoe_x[i] - 7,
        collectableShoe.y_pos - 6
      );
      triangle(
        collectableShoe_x[i] + 15,
        collectableShoe.y_pos - 4 - collectableShoe.size,
        collectableShoe_x[i] + 4,
        collectableShoe.y_pos - 1,
        collectableShoe_x[i] + 4,
        collectableShoe.y_pos - 12 - collectableShoe.size
      );
      fill(0, 160, 255, 200);
      triangle(
        collectableShoe_x[i] - 7,
        collectableShoe.y_pos - 6,
        collectableShoe_x[i] - 6,
        collectableShoe.y_pos - 20 - collectableShoe.size,
        collectableShoe_x[i] + 4,
        collectableShoe.y_pos - 12 - collectableShoe.size
      );
      triangle(
        collectableShoe_x[i] + 15,
        collectableShoe.y_pos - 4 - collectableShoe.size,
        collectableShoe_x[i] + 4,
        collectableShoe.y_pos - 1,
        collectableShoe_x[i] + 10,
        collectableShoe.y_pos + 3
      );

      // sparkles
      fill(255);
      ellipse(
        collectableShoe_x[i],
        collectableShoe.y_pos - 13 - collectableShoe.size,
        random(3),
        random(3)
      );
      ellipse(
        collectableShoe_x[i] - 10,
        collectableShoe.y_pos - 8 - collectableShoe.size,
        random(3),
        random(3)
      );
      ellipse(
        collectableShoe_x[i] + 10,
        collectableShoe.y_pos - 3 - collectableShoe.size,
        random(3),
        random(3)
      );
      ellipse(
        collectableShoe_x[i] + 15,
        collectableShoe.y_pos + 4 - collectableShoe.size,
        random(3),
        random(3)
      );
    }
  }

  ///////////ADDTIONAL FUNCTION CODE//////////
  //functions that add more function to the code, etc (jumping animation, death animation)

  // cloud moving to the right
  if (death == false) {
    for (var i = 0; i < cloud_x.length; i++) {
      if (cloud_x[i] > width * 2) {
        cloud_x[i] = -50;
      } else {
        cloud_x[i] += 1;
      }
    }
  }

  // moving the game objects
  if (isLeft == true) {
    if (grassX_pos < 0) {
      for (var i = 0; i < cloud_x.length; i++) {
        cloud_x[i] += 5;
      }
      for (var i = 0; i < smallTree_x.length; i++) {
        smallTree_x[i] += 5;
      }
      for (var i = 0; i < bigTree_x.length; i++) {
        bigTree_x[i] += 5;
      }
      for (var i = 0; i < canyon_x.length; i++) {
        canyon_x[i] += 5;
      }
      for (var i = 0; i < rocksInSoil_x.length; i++) {
        rocksInSoil_x[i] += 5;
      }
      for (var i = 0; i < collectableShoe_x.length; i++) {
        collectableShoe_x[i] += 5;
      }
      moon.x_pos += 0.3;
      mountain.x_pos += 0.3;
      grassX_pos += 5;
    } else {
      textSize(32);
      fill(255);
      stroke(0);
      strokeWeight(4);
      text("Wrong Direction!!", width / 2 - 100, height / 2);
      strokeWeight(1);
    }
  } else if (isRight == true) {
    for (var i = 0; i < cloud_x.length; i++) {
      cloud_x[i] -= 5;
    }
    for (var i = 0; i < smallTree_x.length; i++) {
      smallTree_x[i] -= 5;
    }
    for (var i = 0; i < bigTree_x.length; i++) {
      bigTree_x[i] -= 5;
    }
    for (var i = 0; i < canyon_x.length; i++) {
      canyon_x[i] -= 5;
    }
    for (var i = 0; i < rocksInSoil_x.length; i++) {
      rocksInSoil_x[i] -= 5;
    }
    for (var i = 0; i < collectableShoe_x.length; i++) {
      collectableShoe_x[i] -= 5;
    }
    moon.x_pos -= 0.3;
    mountain.x_pos -= 0.3;
    grassX_pos -= 5;
  }

  // gravity and for cinderella to glide
  if (gameChar_y < floorPos_y) {
    gameChar_y += 1.5;
    isFalling = true;
  } else {
    isFalling = false;
  }

  // slow jumping + acceleration and gradually losing speed
  if (isJumping > 0) {
    gameChar_y -= acceleration;
    acceleration -= 0.95;
    isJumping -= 4;
  } else {
    isJumping = 0;
    acceleration = 0;
  }

  // Player collecting collectable
  for (let i = 0; i < collectableShoe_x.length; i++) {
    if (
      dist(
        collectableShoe_x[i],
        collectableShoe.y_pos,
        gameChar_x,
        gameChar_y
      ) < 30
    ) {
      collectableShoe_isFound[i] = true;
    }
  }

  // Player falling into cayon
  for (var i = 0; i < canyon_x.length; i++) {
    if (
      gameChar_x > canyon_x[i] - canyon.width / 2 &&
      gameChar_x < canyon_x[i] + canyon.width / 2 &&
      gameChar_y >= floorPos_y
    ) {
      isPlummeting = true;
      isRight = false;
      isLeft = false;
      if (gameChar_y < height - 50) {
        gameChar_y += 2;
        if (gameChar_x < canyon_x[i] - canyon.width / 2 + 25) {
          gameChar_x += 1;
        } else if (gameChar_x > canyon_x[i] + canyon.width / 2 - 25) {
          gameChar_x -= 1;
        }
      } else {
        gameChar_y += 1.5;
      }
    }
  }

  // Death Condition -- For now only have death by canyon
  if (gameChar_y > height - 50) {
    death = true;
  }

  // Death animation
  if (death == true) {
    isLeft = false;
    isRight = false;
    if (deathCountDown > 0) {
      gameChar_y -= 1.5;
      deathCountDown -= 1;
    } else {
      gameChar_y -= deathAcceleration;
      deathAcceleration -= 0.7;
      textSize(32);
      fill(255);
      stroke(0);
      strokeWeight(4);
      text("You have Mati!!", width / 2 - 100, height / 2);
      strokeWeight(1);
    }
  }
}

///////////INTERACTION CODE//////////
//Put conditional statements to move the game character below here

function keyPressed() {
  // if statements to control the animation of the character when
  // keys are pressed.

  //open up the console to see how these work
  console.log("keyPressed: " + key);
  console.log("keyPressed: " + keyCode);
  if (
    (key.toLowerCase() == "a" || key == "ArrowLeft") &&
    isPlummeting != true
  ) {
    isLeft = true;
  } else if (
    (key.toLowerCase() == "d" || key == "ArrowRight") &&
    isPlummeting != true
  ) {
    isRight = true;
  } else if (
    (key.toLowerCase() == "w" || key == "ArrowUp") &&
    isJumping <= 0 &&
    isFalling != true &&
    isPlummeting != true
  ) {
    isJumping += 100;
    acceleration += 15;
  }
}

function keyReleased() {
  // if statements to control the animation of the character when
  // keys are released.

  console.log("keyReleased: " + key);
  console.log("keyReleased: " + keyCode);
  if (key.toLowerCase() == "a" || key == "ArrowLeft") {
    isLeft = false;
  } else if (key.toLowerCase() == "d" || key == "ArrowRight") {
    isRight = false;
  }
}
