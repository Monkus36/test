
buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

//detect key press

document.addEventListener("keydown", function() {
  if (started == false) {
    nextSequence();
    started = true;
  }
});

//detect click

$(".btn").click(function(e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if (userClickedPattern.length == gamePattern.length){
    checkAnswer(level - 1);
  }else {
    console.log("won't check answer")
  }
});


function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4)
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

function playSound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  var user = userClickedPattern.toString();
  var game = gamePattern.toString();
  if (user == game) {
    setTimeout(function() {
      nextSequence();
      userClickedPattern = [];
    }, 1000);
  }else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
