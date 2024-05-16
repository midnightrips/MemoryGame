const gameContainer = document.getElementById("game");
//const resetGame = document.getElementById("reset");
const allCards = document.querySelectorAll("#card");
let allowClick = true; //based on solution

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    newDiv.id = "card"; //added this for the reset button

    //resets game when reset button is clicked -- why isn't this working?
    // resetGame.addEventListener("click", function(e) {
    //   for (let i = 0; i < allCards.length; i++) {
    //     allCards[i].style.backgroundColor = "";
    //   }
    // })

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    
    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let count = 0;
let firstCard = null;
let twoFlipped = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  if (!allowClick) return; //if allow click is false skip eventlistener

  
  let clickedCard = event.target;

  let color = clickedCard.className;

  if (count === 0) {
    clickedCard.style.backgroundColor = color;
    firstCard = clickedCard;
    count = 1; 
    allowClick = true;
  } 
  else if (count === 1 && clickedCard !== firstCard) {
    clickedCard.style.backgroundColor = color;
    let secondCard = clickedCard;
    // allowClick = false; //if two cards are chosen, the player isn't allowed to click
    allowClick = false;

    if (firstCard.className === secondCard.className) {
      // If the two clicked cards match, keep their background colors showing
      count = 0;
      allowClick = true; //player allowed to click next card
    } 
    else { //if first cards don't match
      // If the two clicked cards don't match reset the background colors after a 1 second
      let timer = setInterval(function () {
        //allowClick = false; //player not allowed to click
        allowClick = true;
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        clearInterval(timer);
        count = 0;
      }, 1000);
      // allowClick = true; //allowed to click after the interval is over
    }
  }
}



// when the DOM loads
createDivsForColors(shuffledColors);
