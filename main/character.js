/*

Keagan Suah - The Game Project

Game project submission

This file consist of all the game character's design, function and conditions

Table of Contents
    1 Character Design - line 26
        1.1 Changing Character Design conditions - line 28
        1.2 Particle Effect for star trail - line 55
        1.3 Front Facing Design - line 130
        1.4 Front Facing Design with Jump - line 320
        1.5 Left Facing Design - line 493
        1.6 Left Facing Design with Jump - line 702
        1.7 Right Facing Design - line 893
        1.8 Right Facing Design with Jump - line 1103
    2 Character Conditions
        2.1 Character Movement - line 1297
        2.2 Player Death Condition - line 1340
        2.3 Jumping Animations - line 1361
        2.4 Death Animations - line 1405
*/

////////////// Character Design ///////////////////
// all functions below are created with coursera assistance
function changeCharDesign() {
  // jumping-left code and only after jumping jumpAcceleration is over
  if (isLeft && isFalling && jumpVelocity <= 0) {
    leftJumpingDesign();
  }
  // add your jumping-right code and only after jumping jumpAcceleration is over
  else if (isRight && isFalling && jumpVelocity <= 0) {
    rightJumpingDesign();
  }
  // walking left code
  else if (isLeft) {
    leftFacingDesign();
  }
  // walking right code
  else if (isRight) {
    rightFacingDesign();
  }
  // jumping facing forwards code and only after jumping jumpAcceleration is over
  else if ((isFalling || isPlummeting) && jumpVelocity <= 0) {
    frontJumpingDesgin();
  }
  // facing front code
  else {
    frontFacingDesign();
  }
}
// Using the Particle effect to have stars trail on cinderella
function Particle(x, y, xSpeed, ySpeed, size, colour, alpha) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.colour = colour;
  this.alpha = alpha;
  this.age = 0;
  // design of the shiny sparkle
  this.drawParticle = function () {
    fill(this.colour, this.alpha);
    noStroke();
    ellipse(this.x, this.y, random(this.size));
  };
  // update the particle motion
  this.updateParticle = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    this.age++;
  };
}
function Emitter(x, y, xSpeed, ySpeed, size, colour, alpha) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.size = size;
  this.colour = colour;
  this.alpha = alpha;

  this.startParticles = 0;
  this.lifetime = 0;
  this.particles = [];
  // add the sparkles to the current emitter
  this.addparticles = function (x, y) {
    var p = new Particle(
      random(x - 20, x + 15),
      random(y - 40, y),
      random(this.xSpeed - 0.1, this.xSpeed + 0.1),
      random(this.ySpeed - 0.1, this.ySpeed + 0.1),
      random(this.size - 2, this.size + 2),
      this.colour,
      random(this.alpha - 50, this.alpha + 50)
    );
    return p;
  };
  this.startEmitter = function (startParticles, lifetime) {
    this.startParticles = startParticles;
    this.lifetime = lifetime;

    // Start emitter with initial particles
    for (let i = 0; i < startParticles; i++) {
      this.particles.push(this.addparticles(this.x, this.y));
    }
  };
  this.updateParticles = function (x, y) {
    // iterate particles and draw on the screen
    var deadParticles = 0;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].drawParticle();
      this.particles[i].updateParticle();
      if (this.particles[i].age > random(0, this.lifetime)) {
        this.particles.splice(i, 1);
        deadParticles++;
      }
    }
    if (deadParticles > 0) {
      for (let i = 0; i < deadParticles; i++) {
        this.particles.push(this.addparticles(x, y));
      }
    }
  };
}
// anchor point of game character is set in the bottom left of the game character right leg
function characterDesign(x_pos, y_pos, half) {
  strokeWeight(1);
  if (half == "full") {
    // leg
    stroke(0);
    fill(255, 245, 234);
    rect(x_pos - 7, y_pos - 9, 2, 10);
    rect(x_pos, y_pos - 9, 2, 10);
    fill(230, 230, 250);
    rect(x_pos - 7, y_pos - 1, 2, 2);
    rect(x_pos, y_pos - 1, 2, 2);
    //  Body
    // Dress
    fill(35, 216, 245);
    beginShape();
    vertex(x_pos + 5, y_pos - 40, x_pos - 25, y_pos - 40);
    bezierVertex(
      x_pos - 25,
      y_pos - 40,
      x_pos,
      y_pos - 32,
      x_pos - 20,
      y_pos - 7
    );
    bezierVertex(
      x_pos - 20,
      y_pos - 7,
      x_pos - 5,
      y_pos - 2,
      x_pos + 15,
      y_pos - 7
    );
    bezierVertex(
      x_pos + 15,
      y_pos - 7,
      x_pos + 5,
      y_pos - 22,
      x_pos + 5,
      y_pos - 32
    );
    bezierVertex(
      x_pos + 5,
      y_pos - 32,
      x_pos + 5,
      y_pos - 40,
      x_pos + 5,
      y_pos - 40
    );
    endShape();
    // shoulders
    fill(230, 230, 250);
    ellipse(x_pos - 3, y_pos - 39, 10, 8);
    fill(255, 245, 234);
    ellipse(x_pos - 3, y_pos - 41, 6, 5);
    // arm
    triangle(
      x_pos - 15,
      y_pos - 39,
      x_pos - 11,
      y_pos - 39,
      x_pos - 3,
      y_pos - 20
    );
    triangle(
      x_pos + 4,
      y_pos - 39,
      x_pos + 8,
      y_pos - 39,
      x_pos - 3,
      y_pos - 20
    );
    fill(230, 230, 250);
    ellipse(x_pos - 12, y_pos - 39, 7, 6);
    ellipse(x_pos + 6, y_pos - 39, 7, 6);
    triangle(
      x_pos - 11,
      y_pos - 33,
      x_pos - 9,
      y_pos - 33,
      x_pos - 3,
      y_pos - 20
    );
    triangle(
      x_pos + 2,
      y_pos - 33,
      x_pos + 4,
      y_pos - 33,
      x_pos - 3,
      y_pos - 20
    );
    // shiny spackles
    emit.updateParticles(gameChar_x, gameChar_y);
  }
  stroke(0);
  // head
  // hair
  fill(255, 239, 153);
  ellipse(x_pos - 8, y_pos - 72, 10, 8);
  ellipse(x_pos - 3, y_pos - 74, 10, 8);
  ellipse(x_pos - 3, y_pos - 74, 10, 8);
  ellipse(x_pos + 2, y_pos - 72, 6, 8);
  ellipse(x_pos - 3, y_pos - 57, 30, 30);
  // face
  fill(230, 230, 250);
  ellipse(x_pos - 3, y_pos - 56, 30, 25);
  fill(255, 239, 153);
  ellipse(x_pos - 3, y_pos - 54, 28, 22);
  fill(255, 245, 234);
  ellipse(x_pos - 3, y_pos - 51, 25, 20);
  // eyes
  fill(0);
  ellipse(x_pos - 8, y_pos - 52, 3, 5);
  ellipse(x_pos + 2, y_pos - 52, 3, 5);
  fill(255);
  stroke(255);
  ellipse(x_pos - 8, y_pos - 51, 0.5, 0.5);
  ellipse(x_pos + 2, y_pos - 51, 0.5, 0.5);
  //Eyelash
  stroke(0);
  strokeWeight(0.5);
  line(x_pos - 9, y_pos - 54, x_pos - 10, y_pos - 56);
  line(x_pos - 8, y_pos - 54, x_pos - 9, y_pos - 56);
  line(x_pos + 3, y_pos - 54, x_pos + 4, y_pos - 56);
  line(x_pos + 2, y_pos - 54, x_pos + 3, y_pos - 56);
  // Blash
  strokeWeight(0);
  fill(255, 0, 0, 50);
  ellipse(x_pos - 9, y_pos - 47, 4, 2);
  ellipse(x_pos + 3, y_pos - 47, 4, 2);
  // Nose
  strokeWeight(1);
  curve(
    x_pos - 2,
    y_pos - 47,
    x_pos - 3,
    y_pos - 48,
    x_pos - 4,
    y_pos - 48,
    x_pos - 5,
    y_pos - 47
  );
  // smile
  stroke(225, 146, 188);
  curve(
    x_pos + 0.5,
    y_pos - 51,
    x_pos - 1.5,
    y_pos - 44,
    x_pos - 4.5,
    y_pos - 44,
    x_pos - 6.5,
    y_pos - 51
  );
  stroke(0);
  // earrings
  fill(230, 230, 250);
  stroke(0);
  ellipse(x_pos - 15, y_pos - 49, 3, 3);
  ellipse(x_pos + 9, y_pos - 49, 3, 3);
  // fringe
  fill(255, 239, 153);
  beginShape();
  vertex(x_pos - 12, y_pos - 59);
  bezierVertex(
    x_pos - 8,
    y_pos - 57,
    x_pos - 1,
    y_pos - 57,
    x_pos + 6,
    y_pos - 59
  );
  bezierVertex(
    x_pos + 12,
    y_pos - 64,
    x_pos + 3,
    y_pos - 68,
    x_pos - 8,
    y_pos - 62
  );
  vertex(x_pos - 2, y_pos - 65);
  bezierVertex(
    x_pos - 13,
    y_pos - 66,
    x_pos - 17,
    y_pos - 64,
    x_pos - 12,
    y_pos - 59
  );
  endShape();
}
function frontFacingDesign() {
  characterDesign(gameChar_x, gameChar_y, "full");
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
  // Dress
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
  // Shoulders
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
  // shiny spackles
  emit.updateParticles(gameChar_x, gameChar_y);

  // fringe
  stroke(0);
  fill(255, 239, 153);
  beginShape();
  vertex(gameChar_x - 12, gameChar_y - 59);
  bezierVertex(
    gameChar_x - 8,
    gameChar_y - 57,
    gameChar_x - 1,
    gameChar_y - 57,
    gameChar_x + 6,
    gameChar_y - 59
  );
  bezierVertex(
    gameChar_x + 12,
    gameChar_y - 64,
    gameChar_x + 3,
    gameChar_y - 68,
    gameChar_x - 8,
    gameChar_y - 62
  );
  vertex(gameChar_x - 2, gameChar_y - 65);
  bezierVertex(
    gameChar_x - 13,
    gameChar_y - 66,
    gameChar_x - 17,
    gameChar_y - 64,
    gameChar_x - 12,
    gameChar_y - 59
  );
  endShape();
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
  // Dress
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
  // Shoulders
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
  // shiny spackles
  emit.updateParticles(gameChar_x, gameChar_y);
  stroke(0);
  fill(255, 239, 153);
  // fringe
  beginShape();
  vertex(gameChar_x - 7, gameChar_y - 69);
  bezierVertex(
    gameChar_x - 21,
    gameChar_y - 73,
    gameChar_x - 25,
    gameChar_y - 64,
    gameChar_x - 18,
    gameChar_y - 59
  );
  bezierVertex(
    gameChar_x - 16,
    gameChar_y - 63,
    gameChar_x - 14,
    gameChar_y - 64,
    gameChar_x - 13,
    gameChar_y - 65
  );
  bezierVertex(
    gameChar_x - 14,
    gameChar_y - 61,
    gameChar_x - 9,
    gameChar_y - 61,
    gameChar_x - 4,
    gameChar_y - 65
  );
  endShape();
}
function leftJumpingDesign() {
  // Legs
  stroke(0);
  fill(255, 245, 234);
  rect(gameChar_x - 6, gameChar_y - 9, 2, 6);
  rect(gameChar_x - 1, gameChar_y - 9, 2, 10);
  fill(230, 230, 250);
  rect(gameChar_x - 6, gameChar_y - 3, 2, 2);
  rect(gameChar_x - 1, gameChar_y - 1, 2, 2);
  // Body
  // Dress
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
  //Shoulders
  fill(230, 230, 250);
  ellipse(gameChar_x - 3, gameChar_y - 39, 10, 8);
  fill(255, 245, 234);
  ellipse(gameChar_x - 3, gameChar_y - 41, 6, 5);
  // Arm
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
  // Shiny spackles
  emit.updateParticles(gameChar_x, gameChar_y);
  stroke(0);
  fill(255, 239, 153);
  // fringe
  beginShape();
  vertex(gameChar_x - 7, gameChar_y - 69);
  bezierVertex(
    gameChar_x - 21,
    gameChar_y - 73,
    gameChar_x - 25,
    gameChar_y - 64,
    gameChar_x - 18,
    gameChar_y - 59
  );
  bezierVertex(
    gameChar_x - 16,
    gameChar_y - 63,
    gameChar_x - 14,
    gameChar_y - 64,
    gameChar_x - 13,
    gameChar_y - 65
  );
  bezierVertex(
    gameChar_x - 14,
    gameChar_y - 61,
    gameChar_x - 9,
    gameChar_y - 61,
    gameChar_x - 4,
    gameChar_y - 65
  );
  endShape();
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
  // Dress
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
  // Shoulders
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
  // shiny spackles
  emit.updateParticles(gameChar_x, gameChar_y);
  stroke(0);
  fill(255, 239, 153);
  // fringe
  beginShape();
  vertex(gameChar_x + 2, gameChar_y - 69);
  // 37
  bezierVertex(
    gameChar_x + 13,
    gameChar_y - 73,
    gameChar_x + 19,
    gameChar_y - 64,
    gameChar_x + 12,
    gameChar_y - 59
  );
  bezierVertex(
    gameChar_x + 10,
    gameChar_y - 63,
    gameChar_x + 8,
    gameChar_y - 64,
    gameChar_x + 7,
    gameChar_y - 65
  );
  bezierVertex(
    gameChar_x + 8,
    gameChar_y - 61,
    gameChar_x + 3,
    gameChar_y - 61,
    gameChar_x - 2,
    gameChar_y - 65
  );
  endShape();
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
  // Dress
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
  // Shoulders
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
  // shiny spackles
  emit.updateParticles(gameChar_x, gameChar_y);
  stroke(0);
  fill(255, 239, 153);
  // fringe
  beginShape();
  vertex(gameChar_x + 2, gameChar_y - 69);
  // 37
  bezierVertex(
    gameChar_x + 13,
    gameChar_y - 73,
    gameChar_x + 19,
    gameChar_y - 64,
    gameChar_x + 12,
    gameChar_y - 59
  );
  bezierVertex(
    gameChar_x + 10,
    gameChar_y - 63,
    gameChar_x + 8,
    gameChar_y - 64,
    gameChar_x + 7,
    gameChar_y - 65
  );
  bezierVertex(
    gameChar_x + 8,
    gameChar_y - 61,
    gameChar_x + 3,
    gameChar_y - 61,
    gameChar_x - 2,
    gameChar_y - 65
  );
  endShape();
}

////////////// Character Conditions ///////////////////
function characterMovement() {
  // Game character moving left
  if (isLeft && !pauseState) {
    if (gameChar_x > width / 4 + 100) {
      // The more collectable is collected, the faster gamechar will be
      gameChar_x -= 3 + 0.1 * game_score;
      // moving the mountains and glowingMoon gives the illution that object is further away
      // ES6 loop can be used to shorten the condition to iterate through each object in the array
      for (let mountain of mountains) {
        mountain.x_pos -= 2.3 + 0.1 * game_score;
      }
      glowingMoon.x_pos -= 2.8 + 0.1 * game_score;
      // Sound effect for the character when walking on the ground
      if (!walkGrass.isPlaying() && gameChar_y >= floorPos_y) {
        walkGrass.play();
        walkGrass.loop();
      }
    } else {
      // Inform player that the are at the boundary of the game
      smallSplashScreen("  ✕ Wrong Direction ✕", "   ☞ Only Go Right please ☞");
    }
  }

  // Game character moving right
  else if (isRight && !pauseState) {
    // The more collectable is collected, the faster gamechar will be
    gameChar_x += 3 + 0.1 * game_score;
    // moving the mountains and glowingMoon gives the illution that object is further away
    // ES6 loop can be used to shorten the condition to iterate through each object in the array
    for (let mountain of mountains) {
      mountain.x_pos += 2.3 + 0.1 * game_score;
    }
    glowingMoon.x_pos += 2.8 + 0.1 * game_score;
    // Sound effect for the character when walking on the ground
    if (!walkGrass.isPlaying() && gameChar_y >= floorPos_y) {
      walkGrass.play();
    }
  }
  // stop the sound effect when not moving
  else {
    walkGrass.stop();
  }
}
function checkPlayerDie() {
  // check if any of the conditon is fulfiled to end the character life
  // ES6 loop can be used to shorten the condition to iterate through each object in the array
  for (let enermy of enemies) {
    if (
      gameChar_y >= height - 50 ||
      timeLimit <= 0 ||
      enermy.checkContact(gameChar_x, gameChar_y) == true
    ) {
      // when player die, stop the sound track from playing
      themesong.stop();
      death = true;
      jumpAcceleration = 0;
      // ensure the death soundtrake is only played once
      if (!deathsound.isPlaying() && lives >= 0) {
        deathsound.play();
      }
    }
  }
}
// all functions below are created myself without assistance
function jumpingPhysics() {
  // gravity and for cinderella to glide
  if (gameChar_y < floorPos_y && !pauseState) {
    walkGrass.stop();
    var isContact = false;
    // ES6 loop can be used to shorten the condition to iterate through each object in the array
    for (let platform of platforms) {
      if (platform.checkContact(gameChar_x, gameChar_y)) {
        isContact = true;
        if (!walkPlat.isPlaying() && (isLeft || isRight)) {
          walkPlat.play();
          walkPlat.loop();
        } else if (!isLeft && !isRight) {
          walkPlat.stop();
        }
        break;
      }
    }

    // Interaction to check if game character has made contact with platfrom to stop fall
    if (isContact == false) {
      walkPlat.stop();
      gameChar_y += 1.5;
      isFalling = true;
    } else {
      isFalling = false;
    }
  } else {
    isFalling = false;
  }

  // slow jumping + speed and gradually losing jumpAcceleration
  if (jumpVelocity > 0) {
    // like in physics, jumpAcceleration start of high and gradually lose acceleration
    gameChar_y -= jumpAcceleration;
    // acceleration decreasing speed
    jumpAcceleration -= 0.95;
    jumpVelocity -= 4;
    // once the counter jumpVelocity hits 0, the character starts falling
  } else {
    jumpVelocity = 0;
    jumpAcceleration = 0;
  }
}
function playerDieAnimation() {
  // Death animation
  if (death == true) {
    isLeft = false;
    isRight = false;
    if (deathCountDown > 0) {
      // Once the countdown end, the player will bounce up before decending down
      gameChar_y -= 1.5;
      deathCountDown -= 1;
    } else {
      // start to decend out of the world
      gameChar_y -= deathHopVelocity;
      deathHopVelocity -= 0.7;
      if (lives <= 1) {
        lives -= 1;
        // display the Game over splash screen
        smallSplashScreen("   ☠︎ GAME OVER ☠︎ ", "Press SPACEBAR to continue");
      } else {
        if (respawnTime > 140) {
          // once the countdown end, the player will respawn
          respawnTime -= 1;
        } else if (respawnTime > 0) {
          lifeSplashScreen();
        } else {
          lives -= 1;
          startGame();
        }
      }
    }
  }
}
