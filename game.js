var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  //console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(){
  if (started === false){
    started = true;
    $("#level-title").html("Level " + level);
    nextSequence();
  }
});


function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}


function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");}, 100);
}

function nextSequence(){
  userClickedPattern = [];
  level += 1;
  $("#level-title").html("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
  {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();

      }, 1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").html("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
