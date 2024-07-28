var gamePattern = [];
var buttonColors = ["red", "blue", "yellow", "green"];
var userClickedPattern = [];
var level = 0;
var success = true;

$(document).keypress(function () {
    if (level < 1) {
        success = true;
        $("body").removeClass("game-over");
        setTimeout(SetNewSequence, 1000);
    }
});

var userClickedButton;
$(".btn").click(function () {
    if (level > 0) {
        userClickedButton = $(this).attr("id");

        PlaySound(userClickedButton);
        AnimatePress(userClickedButton);

        userClickedPattern.push(userClickedButton);
        if (userClickedPattern.length > gamePattern.length) {
            setTimeout(RestartTheGame, 200);
        }
        CheckUserAnswer(userClickedPattern.length - 1);
    }
});

function SetNewSequence() {
    if (success === true) {
        userClickedPattern = [];
        var randomIndex = Math.floor(Math.random() * 4);
        gamePattern.push(buttonColors[randomIndex]);

        var buttonToSelect = buttonColors[randomIndex];

        PlaySound(buttonToSelect);
        AnimatePress(buttonToSelect);

        level += 1;
        $("h1").text("Level " + level);
    }
}

function PlaySound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function AnimatePress(color) {
    $("." + color).fadeOut();
    setTimeout(100);
    $("." + color).fadeIn();
}

function CheckUserAnswer(index) {
    if (userClickedPattern[index] === gamePattern[index]) {
        success = true;
        if (index + 1 === gamePattern.length) {
            setTimeout(SetNewSequence, 1000);
        }
    }
    else {
        setTimeout(RestartTheGame, 200);
    }
}

function RestartTheGame() {
    success = false;
    $("body").addClass("game-over");
    $("h1").text("Press A Key to Start");
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
}