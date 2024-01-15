var gamePattern = []; 
var buttonColours = ["red", "blue", "green", "yellow"]; 
var running = false; 
var index = 0; 

$("body").keypress(function() {
    gameStart(); 
})

function gameStart(){
    if (!running)
    {
        gamePattern.splice(0,gamePattern.length); 
        nextSequence(); 
        running = true; 
    }
}


$(".btn").on("click", function() {
    if (running){
        var color = $(this).attr("id"); 

        if (!checkCorrect(color,index))
        {
            gameOver(); 
            return; 
        }
        play(color); 
        if (++index >= gamePattern.length) {
            setTimeout(nextSequence,500); 
            index = 0; 
        } 
    }
})



function gameOver()
{
    var wrong = new Audio("./sounds/wrong.mp3"); 
    wrong.volume = 0.1; 
    wrong.play(); 
    $("#level-title").text("Score: " + (gamePattern.length - 1) + ". Press A Key To Start Over"); 

    running = false; 
    index = 0; 


}

function checkCorrect(color, index) {
    if (color == gamePattern[index]) {
        return true; 
    }
    return false; 
}

function play(color) {
    playSound(color); 
    playAnimation(color); 
}

function playSound(color) {
    var audio = new Audio("./sounds/"+ color + ".mp3");
    audio.volume = 0.1; 
    audio.play(); 
}

function playAnimation(color) {
    $("#" + color).fadeOut(100).fadeIn(100); 
}

function nextSequence() {
    var color = buttonColours[getRandom()]; 
    gamePattern.push(color); 
    $("#level-title").text("Level " + gamePattern.length);  
    play(color); 
}

function getRandom(){
    var random = Math.floor(Math.random() * 4); 
    return random; 
}


