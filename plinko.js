function Plinko(x, y, r, sound) {
   var options = {
      isStatic: true,
      restitution: 0.5,
      friction: 0
   };
   this.body = Bodies.circle(x, y, r, options);
   this.body.label = "peg";
   this.body.sound = sound;
   this.body.c = 220;
   World.add(world, this.body);
   this.r = r;
   this.reset = 0;
}

Plinko.prototype.show = function() {
   fill(this.body.c, 100, 100);
   stroke(0, 0, 10);
   var pos = this.body.position;
   push();
   strokeWeight(2);
   translate(pos.x, pos.y);
   ellipse(0, 0, this.r * 2);
   pop();
   this.reset++;
   if (this.reset === 10) {
      this.reset = 0;
      this.body.c = 220;
   }
}