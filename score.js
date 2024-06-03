function Score() {
   this.score = [];
   this.value = [];
   this.bonusIndex = -1;
}

Score.prototype.setScores = function() {
   this.score = [];
   this.value = [];
   var array = [
      [2, 3, 1, 5, 2],
      [1, 5, 2, 4, 1],
      [2, 3, 5, 3, 2],
      [2, 4, 5, 3, 1],
      [1, 2, 3, 4, 5],
      [5, 4, 3, 2, 1],
      [2, 4, 3, 5, 2]
   ]
   var n = floor(random(6));
   this.score = array[n];
   this.setValues();
}

Score.prototype.setValues = function() {
   for (var i = 0; i < this.score.length; i++) {
      switch (this.score[i]) {
         case 1:
            this.value[i] = 50;
            break;
         case 2:
            this.value[i] = 100;
            this.bonusIndex = i;
            break;
         case 3:
            this.value[i] = 200;
            break;
         case 4:
            this.value[i] = 500;
            break;
         case 5:
            this.value[i] = 1000;
            break;
      }
   }
}

Score.prototype.getImage = function(Nth) {
   return this.score[Nth];
}
Score.prototype.getValue = function(Nth) {
   return this.value[Nth];
}

Score.prototype.return100 = function() {
   return this.bonusIndex;
}