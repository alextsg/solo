(function(){
  var app = angular.module('simonApp', []);

  app.controller('simonController', function($interval, $timeout){
    this.keys = [];
    this.round = 1;
    this.answers = [];
    this.displayed;
    this.score = 0;
    this.arrows = {
      37: 'LEFT',
      38: 'UP',
      39: 'RIGHT',
      40: 'DOWN'
    };
    this.green = false;
    this.correct = true;

    this.newAnswers = function(){
      this.keys = [];
      this.round++;
      var length = this.round;
      for (var i = 0; i < length; i++){
        this.answers[i] = Math.floor(Math.random()*4)+37;
      };
      this.display();
    };

    this.addAnswer = function(){
      this.keys = [];
      this.round++;
      this.answers.push(Math.floor(Math.random()*4)+37);
      this.display();
    }

    this.keypress = function(event){
      var key = event.which;
      if (key >= 37 && key <= 40 && this.green === true){
        this.keys.push(key);
        //this.displayed = this.arrows[key];
        this.displayed = key;
        console.log(this.displayed);
        $timeout(function(){
          this.displayed = '';
        }.bind(this),100).then(function(){
          if (this.keys.length === this.answers.length){
            if (this.compare(this.keys, this.answers.length)){
              this.correct = true;
              //this.newAnswers();
              this.addAnswer();
            } else {
              this.lose();
            }
          }
        }.bind(this));
      }
    }

    this.compare = function(keys, round){ 
      console.log(keys);
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
            this.displayed = '';
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

    this.resetGame = function(){
      this.keys = [];
      this.round = 1;
      this.answers = [];
      this.displayed = '';
      this.score = 0;
      this.newAnswers();
      this.green = false;
      this.correct = true;
    };

    this.lose = function(){
      this.correct = false;
    }

  });

})();