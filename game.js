let buttonColours = ["red", "blue", "green", "yellow"];
let randomChosenColour;
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;


/* Creat sequence randomically */ 
function nextSequence()
{
    level++;
    userClickedPattern=[];
    $("#level-title").text("Level " + level);
    randowNumber=Math.floor(Math.random()*4);
    randomChosenColour=buttonColours[randowNumber];
    //Add random sequence on game
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

/* Blink function */ 
function animatePress (myColor){
    $("#" + myColor).fadeIn(100).fadeOut(100).fadeIn(100);
}

/* Play sound function */ 
function playSound(mySound){
    var audio = new Audio("sounds/" + mySound + ".mp3");
    audio.play();
}

// Check which botton was clicked
$(".btn").click(function() {
    if (!started) {
        setTimeout(function () 
                { 
                  nextSequence();
                },500);
      started = true;
    }
    else{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length);}
  });

  //Check keyboard pressed to start
  $(document).keypress(function() {
    if (!started) {
        setTimeout(function () 
                { 
                    nextSequence();
                },500);
      started = true;
    }
  });
  $(document).keypress(function(e) {
 	var tecla = e.keyCode;
	// if pressed 1 - Yellow
     if(tecla == 49) 
     { 
        userChosenColour = "yellow";
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length);
	 } // if pressed 2 - Blue
        else if(tecla == 50) 
        {
            userChosenColour = "blue";
            userClickedPattern.push(userChosenColour);
            playSound(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length);
	 	} //if pressed 4 - Green
         else if(tecla == 52) 
         {             
            userChosenColour = "green";
            userClickedPattern.push(userChosenColour);
            playSound(userChosenColour);
            animatePress(userChosenColour);
            checkAnswer(userClickedPattern.length);
         } //if pressed 5 - Red
            else if(tecla == 53) 
            {
                userChosenColour = "red";
                userClickedPattern.push(userChosenColour);
                playSound(userChosenColour);
                animatePress(userChosenColour);
                checkAnswer(userClickedPattern.length);
        	} 
	});

    //restart function
    function startOver() {
        level = 0;
        gamePattern = [];
        userClickedPattern =[];
        started = false;
      }

    //Check if sequence is right

    function checkAnswer(myPos){
        if(userClickedPattern[myPos-1]===gamePattern[myPos-1])
        {
            if(userClickedPattern.length===gamePattern.length)
            {
                setTimeout(function () 
                { 
                    nextSequence();
                },1000);
            }
        }
        else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(function () {
                $("body").removeClass("game-over");
              }, 1000);
            startOver();
        }
    }