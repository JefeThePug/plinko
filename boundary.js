function Boundary(x, y, w, h, label) {
   var options = {
      isStatic: true,
      restitution: (label === "side") * 1,
   };
   this.body = Bodies.rectangle(x, y, w, h, options);
   this.body.label = label;
   World.add(world, this.body);
   this.w = w;
   this.h = h;
}

Boundary.prototype.show = function() {
   fill(210, 100, 100);
   stroke(0, 0, 20);
   var pos = this.body.position;
   push();
   translate(pos.x, pos.y);
   rectMode(CENTER);
   strokeWeight(2);
   rect(0, 0, this.w, this.h);
   pop();
}