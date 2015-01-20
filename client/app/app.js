(function(){
  var app = angular.module('simonApp', []);

  app.controller('simonController', function($interval, $timeout){
    this.keys = [];
    this.round = 0;
    this.answers = [];
    this.displayed = "--";
    this.score = 0;
    this.arrows = {
      37: 'LEFT',
      38: 'UP',
      39: 'RIGHT',
      40: 'DOWN'
    };
    var green = false;

    this.newAnswers = function(){
      console.log(this.round);
      this.keys = [];
      this.round += 2;
      var length = this.round;
      var arr = [];
      for (var i = 0; i < length; i++){
        this.answers[i] = Math.floor(Math.random()*4)+37;
      };
      console.log(this.answers);
      this.display();
    };

    this.keypress = function(event){
      var key = event.which;
      if (key >= 37 && key <= 40 && this.green === true){
        this.keys.push(key);
      }
      if (this.keys.length === this.round){
        if (this.compare(this.keys, this.round)){
          console.log("correct");
          this.newAnswers();
        } else {
          console.log("wrong");
        }
      }
    }

    this.compare = function(keys, round){ 
      console.log(keys);
      console.log(round);
      for (var i = 0; i < keys.length; i++){
        if (keys[i] !== this.answers[i]) return false;
        else this.score++;
      }
      return true;
    };

    this.display = function(){
      this.green = false;
      var counter = 0;

      var refreshAnswer = function(){
        if (counter < this.answers.length){
          this.displayed = this.arrows[this.answers[counter]];
          $timeout(function(){
            this.displayed = '--';
          }.bind(this),800).then(function(){
            counter++;
          });
        } else {
          $interval.cancel(refresh);
          this.green = true;
        }
      };
      var refresh = $interval(refreshAnswer.bind(this),1000);
    };


  });

})();