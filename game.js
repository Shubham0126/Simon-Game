
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(".btn").click(function(){
     var userChosenColour = $(this).attr("id");
     userClickedPattern.push(userChosenColour);
     playSound(userChosenColour);
     animatePress(userChosenColour);
     var index = userClickedPattern.length - 1;
     checkAnswer(index);
})

$(document).keydown(function(){
  
  if(!started){
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
  
})

function checkAnswer(currentlevel){
  if(userClickedPattern[currentlevel] == gamePattern[currentlevel]){
   console.log("success");

   if(userClickedPattern.length === gamePattern.length){

    setTimeout(function () {
      nextSequence();
    }, 1000);
    
   }

  }
  else{
    console.log("failed");

    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }

  
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence(){

  userClickedPattern = [];
    level++;

    $("#level-title").text("level " + level);

    var randomNumber =  Math.floor( Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(name){
  $("#" + name).addClass("pressed");
  setTimeout(function(){
    $("#" + name).removeClass("pressed");
  }, 100);
}


