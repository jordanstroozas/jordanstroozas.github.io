var res1 = document.getElementById("res1");
var res2 = document.getElementById("res2");
var res3 = document.getElementById("res3");

// Initialize game values
var num_of_guesses = 0;
var max_guess = 15;
var guessed_nums = [];
var num_to_guess = Math.floor(Math.random()*1000) + 1;



function guess_number() {
    var user_guess = document.getElementById("guess").value;

    // Validate inputs
    if (isNaN(user_guess))
    {
        alert("Input given was not a number");
    }
    else if (user_guess < 1 || user_guess > 1000)
    {
        alert("Number was not withing the bounds of 1-100");
    }
    else if (guessed_nums.includes(user_guess))
    {
        alert("Number has already been guessed, try a new number :)");
    }
    else
    {
        guessed_nums.push(user_guess);
        num_of_guesses++;
        num_guesses_remaining = max_guess - num_of_guesses;
        var difference = Math.sign(user_guess - num_to_guess);
        
        // Too low condition
        if (difference == -1){
            res1.textContent = "Previous Guesses: " + guessed_nums;
            res2.textContent = "Guesses Remaining: " + num_guesses_remaining;
            res3.textContent = user_guess + " is too low";
        }   
        // Too high condition
        else if (difference == 1)
        {
            res1.textContent = "Previous Guesses: " + guessed_nums;
            res2.textContent = "Guesses Remaining: " + num_guesses_remaining;
            res3.textContent = user_guess + " is too high";
        }
        // Winning condition
        else
        {
            res1.textContent = "You guessed the number!";
            res2.textContent = "The number was: " + num_to_guess;
            res3.textContent = "Number of guesses used: " + num_of_guesses;
        }

        // Tell the user they lost and start a new game
        if (num_guesses_remaining < 0)
        {
            alert("Number was not guessed in 10 tries. The number was: " + num_to_guess);
            new_game();
        }
    }
}

// Welcome to the wholesome pitstop. If you stumbled upon this comment, just wanted to say hope you have an awesome day!
function new_game() {
    // Reinitialize the starting parameters of the game
    num_of_guesses = 0;
    max_guess = 15;
    guessed_nums = [];
    num_to_guess = Math.floor(Math.random()*1000) + 1;

    // Reset the text to start of game message
    res1.textContent = "Guesses Remaining: 10";
    res2.textContent = "Previous Guesses: ";
    res3.textContent = "";
}

// Shoutout to https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
document.getElementById("guess")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("guess_btn").click();
    }
});
