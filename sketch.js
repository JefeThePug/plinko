//aliases
var Engine = Matter.Engine,
   World = Matter.World,
   Bodies = Matter.Bodies,
   Events = Matter.Events,
   Sleeping = Matter.Sleeping;
//matter files
var engine;
var world;
//images
var ball;
var board;
var scoreballs = [];
//sounds
var dings = [];
//objects
var particles = [];
var plinkos = [];
var bounds = [];
var score;
//arrays
var goals = [];
//dimensions
var cols = 10;
var rows = 8;
var spacing;
//booleans
var finished = false;
var tilted = false;
var tiltreset = 0;

function reset() {
   score.setScores();
   for (var i = particles.length - 1; i >= 0; i--) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
   }
   goals = [];
   finished = false;
}

function preload() {
   for (var i = 1; i < 9; i++) {
      dings[i] = loadSound("assets/" + i + ".wav");
   }
   ball = loadImage("assets/ball.png");
   board = loadImage("assets/bg.jpg");
   for (var sb = 0; sb < 6; sb++) {
      scoreballs[sb] = loadImage("assets/" + sb + ".png");
   }
}

function setup() {
   createCanvas(400, 600);
   colorMode(HSB);
   imageMode(CENTER);
   textAlign(CENTER, CENTER);
   engine = Engine.create();
   Engine.run(engine);
   world = engine.world;
   world.gravity.y = 2;
   spacing = width / cols;
   var margin = 2 * spacing;
   //pegs
   for (var j = 0; j < rows; j++) {
      for (var i = 0; i < ((j % 2 === 0) ? cols : cols + 1); i++) {
         var plinkoX = ((j % 2 === 0) ? spacing / 2 : 0) + i * spacing;
         var plinkoY = (spacing + j * spacing) + margin;
         var p = new Plinko(plinkoX, plinkoY, 4, constrain(j + 1, 1, 8));
         plinkos.push(p);
      }
   }
   //borders
   var b1 = new Boundary(width / 2, height + 50, width, 100, "floor");
   bounds.push(b1);
   var b2 = new Boundary(-45, height / 2, 100, height, "side");
   bounds.push(b2);
   var b3 = new Boundary(width + 45, height / 2, 100, height, "side");
   bounds.push(b3);
   //buckets
   for (var b = 1; b < cols / 2; b++) {
      var w = 10;
      var h = 180;
      var x = b * (2 * spacing);
      var y = height - h / 2;
      var bound = new Boundary(x, y, w, h, "bucket");
      bounds.push(bound);
   }
   //listener
   Events.on(engine, 'collisionStart', collision);
   //score
   score = new Score();
   score.setScores();
}

function draw() {
   //bg
   image(board, width / 2, height / 2);
   //pegs
   for (var p = 0; p < plinkos.length; p++) {
      plinkos[p].show();
   }
   //borders and buckets
   for (var b = 0; b < bounds.length; b++) {
      bounds[b].show();
   }
   //scoreballs
   for (var i = 0; i < 5; i++) {
      if (finished) {
         var x = score.getImage(i);
         image(scoreballs[x], i * spacing * 2 + spacing, height - spacing * 3);
      } else {
         image(scoreballs[0], i * spacing * 2 + spacing, height - spacing * 3);
      }
   }
   push();
   fill(0, 0, 0);
   stroke(60, 100, 100);
   strokeWeight(3);
   textSize(50);
   if (finished) {
      var SCORE = 0;
      for (var s = 0; s < goals.length; s++) {
         SCORE += score.getValue(goals[s] - 1);
      }
      console.log(SCORE + " ");
      text("YOUR SCORE", width / 2, height / 2 - 100);
      strokeWeight(6);
      textSize(150);
      text(SCORE, width / 2, height / 2);
   } else {
      if (particles.length < 5) {
         text("Place 5 balls", width / 2, height / 2 - 100);
         text("at the top", width / 2, height / 2 - 50);
      } else {
         for (var i = 0; i < particles.length; i++) {
            particles[i].wake();
         }
      }
   }
   pop();
   //balls
   var activecount = 0;
   for (var _ = particles.length - 1; _ >= 0; _--) {
      particles[_].show();
      if (particles[_].isOffScreen()) {
         World.remove(world, particles[_].body);
         particles.splice(_, 1);
      }
      if (particles[_].body.label === "particle") {
         activecount++;
      }
   }
   if (activecount === 0 && particles.length !== 0) {
      finished = true;
   }
   if (tilted) {
      push();
      textSize(150);
      fill(0, 100, 100);
      textStyle(ITALIC);
      if (tiltreset % 2 === 1) {
         text("TILT", width / 2 - 10, height / 2);
      }
      pop();
      tiltreset++;
      if (tiltreset === 10) {
         tiltreset = 0;
         tilted = false;
      }
   }
}

function newParticle(_x, _y, sleeping, atStart) {
   var x = _x;
   var y = _y;
   if (atStart) {
      x = constrain(x, 25, width - 25);
      y = constrain(y, 0, spacing * 2);
   }
   var p = new Particle(x, y, 0.5 * spacing - 5, sleeping);
   particles.push(p);
}

function mouseClicked() {
   if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      if (particles.length < 5) {
         newParticle(mouseX, mouseY, true, true);
      }
      if (finished === true) {
         reset();
      }
   }
}

function keyPressed() {
   if (key == " " && particles.length < 5) {
      newParticle(mouseX, mouseY, true, true);
   } else if (key == "B") {
      giveBonus();
   } else if (keyCode == SHIFT && particles.length > 0) {
      tilt();
   }
}

function collision(event) {
   var pairs = event.pairs;
   for (var i = 0; i < pairs.length; i++) {
      var bodyA = pairs[i].bodyA;
      var bodyB = pairs[i].bodyB;
      var C = bodyA.label + bodyB.label;
      if (C === "particlepeg" || C === "pegparticle") {
         pegHit(bodyA, bodyB);
      } else if (C === "particlefloor" || C === "floorparticle") {
         goalHit(bodyA, bodyB);
      }
   }
}

function pegHit(A, B) {
   if (A.label === "peg") {
      dings[A.sound].play(0, 1, 1, 0.5, 0.5);
      A.c = 60;
   } else {
      dings[B.sound].play(0, 1, 1, 0.5, 0.5);
      B.c = 60;
   }
}

function goalHit(A, B) {
   var pos;
   if (A.label === "particle") {
      pos = A.position.x;
      A.label = "floor";
      A.velocity.x = 0;
   } else {
      pos = B.position.x;
      B.label = "floor";
      B.velocity.x = 0;
   }
   goals.push(ceil(pos / (spacing * 2)));
   goals.sort(function(a, b) {
      return a - b
   });
}

function giveBonus() {
   var x = score.return100() * spacing * 2 + spacing;
   for (var i = 0; i < 5; i++) {
      newParticle(x, height, false, false);
      newParticle(width / 2, 0, false, false);
   }
}

function tilt() {
   var forcemag = 0.005 * particles[0].body.mass;
   for (var i = 0; i < particles.length; i++) {
      if (particles[i].body.label === "particle") {
         Matter.Body.applyForce(particles[i].body, particles[i].body.position, {
            x: (forcemag + random() * forcemag) * Matter.Common.choose([1, -1]),
            y: -forcemag + random() * -forcemag
         });
         tilted = true;
         tiltreset = 0;
      }
   }
}