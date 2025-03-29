// Here we are accessing some of our elements from the DOM to perform some operations accordingly
let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turnO = true; // playerX, playerO
let count = 0; //this will store the count of total boxes clicked

// Here we are storing our winning patterns
let winPatterns = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// this function will reset the game
const resetGame = () => {
  // here we are setting the initial values to turn) and count variable
  turnO = true;
  count = 0;

  // Here we are calling the enableBoxes function to enable all the disabled boxes again
  enableBoxes();

  // Here we are adding the 'hide' class again in the msgContainer element to hide it from the page
  msgContainer.classList.add('hide');
};

// Now we will add event listeners on each box
boxes.forEach((box) => {
  // Here is action for each box
  // and our action is adding an eventListner to each box
  box.addEventListener('click', () => {
    // here is the body of our callback for each 'click' event

    if (turnO) {
      //This box is for our player O, here we are checking the current value of turn0, if it's true
      box.style.color = '#ffffc9';
      box.innerText = 'O'; //then set innerText of the box as 'O'
      turnO = false; //and update the turnO value to false, so that next change could be given to player X
    } else {
      //this box is for our player X
      box.style.color = '#b0413e';
      box.innerText = 'X';
      turnO = true;
    }
    // here we are increment count by 1 as 1 box is clicked now
    count = count + 1;

    // Here we are disabling our box after it get clicked
    box.disabled = true;

    //method call for checkWinner function
    checkWinner();

    // Here we are calling the drawMatch function
    drawMatch(count);
  });
});

// DrawMatch Function definition to check if all boxes are clicked & still we didn't get a winner
const drawMatch = (count) => {
  //here we are checking if all boxes are clicked & still we didn't get a winner
  if (count === 9) {
    msg.innerText = "It's A Draw Match";
    msgContainer.classList.remove('hide');
    console.log(`count value is ${count}`);
  }
};

// function for disabling boxes
let disableBoxes = () => {
  for (let box of boxes) {
    //here we are disabling each box
    box.disabled = true;
  }
};

// function for enabling boxes
let enableBoxes = () => {
  for (let box of boxes) {
    //here we are enabling each box
    box.disabled = false;
    box.innerText = ''; //here we are setting innerText as empty
  }
};

// showWinner function definition, that accept the winner name
const showWinner = (winner) => {
  // Here we are printing the winner inside the msg element
  msg.innerText = `Congratulations, winner is ${winner}`;
  // here we are removing the hide class from the msg container to make it visible now
  msgContainer.classList.remove('hide');
  disableBoxes();
};

// arrow function definition for checkWinner function
const checkWinner = () => {
  // here we are iterating over the each sub-array of winPattern array
  for (let pattern of winPatterns) {
    // here are our 3 positions
    let pos1 = pattern[0];
    let pos2 = pattern[1];
    let pos3 = pattern[2];

    // here we are storing the value at each box into 3 variables at a time according to the current pattern values
    let pos1Val = boxes[pos1].innerText;
    let pos2Val = boxes[pos2].innerText;
    let pos3val = boxes[pos3].innerText;

    // Here we are checking if boxes are empty or not
    if (pos1Val != '' && pos2Val != '' && pos3val != '') {
      // This is our winning condition
      if (pos1Val === pos2Val && pos2Val === pos3val) {
        // Here we are calling showWinner function
        showWinner(pos1Val);
      }
    }
  }
};

// resetGame function calls
newGameBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
