function Particle(x, y, r, sleeping) {
   var options = {
      restitution: .8,
      friction: 0.1,
      density: 1
   };
   this.body = Bodies.circle(x, y, r, options);
   this.body.label = "particle";
   Sleeping.set(this.body, sleeping);
   World.add(world, this.body);
   this.r = r;
   this.hue = random(255);
}

Particle.prototype.isOffScreen = function() {
   x = this.body.position.x;
   return (x < -50 || x > width + 50);
}

Particle.prototype.show = function() {
   fill(this.hue, 255, 255);
   stroke(this.hue, 60, 60);
   var pos = this.body.position;
   push();
   translate(pos.x, pos.y);
   image(ball, 0, 0, this.r * 2, this.r * 2)
   pop();
}

Particle.prototype.wake = function() {
   Sleeping.set(this.body, false);
}