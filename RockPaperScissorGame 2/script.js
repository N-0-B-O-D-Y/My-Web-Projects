// here we are fetching various necessary elements from the DOM object
const choices = document.querySelectorAll('.choice');
const msg = document.querySelector('#msg');
const uScore = document.querySelector('#user-score');
const rScore = document.querySelector('#robot-score');

// there are score variables initialize as 0
let userScore = 0;
let robotScore = 0;

// this function is for dealing with the draw Matches
const drawGame = () => {
  msg.innerText = 'Game was Draw. Play Again';
  msg.style.backgroundColor = '#081b31';
};

// this function will generate a random index for a random choice from the array of elements
const genRobotChoice = () => {
  const options = ['rock', 'paper', 'scissors'];

  const randIdx = Math.floor(Math.random() * 3);

  return options[randIdx];
};

// this function will help in setting scores and viewing the match statements related to win and lose
const showWinner = (userWin, userChoice, robotChoice) => {
  if (userWin) {
    userScore++;
    uScore.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${robotChoice}`;
    msg.style.backgroundColor = 'darkgreen';
  } else {
    robotScore++;
    rScore.innerText = robotScore;
    msg.innerText = `You Lose!! ${robotChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = 'darkred';
  }
};

const playGame = (userChoice) => {
  // Here we are finding the robot's choice among the 3 elements
  const robotChoice = genRobotChoice();

  //   Here we are checking if user and robot's choices are same or not
  if (userChoice === robotChoice) {
    // if yes, then call drawGame function to declare the game is a draw
    drawGame();
  }
  //   else check for conditions
  else {
    // this variable will be initialized as true, that means currently the user is winning
    let userWin = true;
    // now we will check conditions and update 'userWin' variable accordingly
    if (userChoice === 'rock') {
      userWin = robotChoice === 'paper' ? false : true;
    } else if (userChoice === 'paper') {
      userWin = robotChoice === 'rock' ? true : false;
    } else {
      userWin = robotChoice === 'rock' ? false : true;
    }

    // Here we are calling showWinner function which accepts 3 arguments
    showWinner(userWin, userChoice, robotChoice);
  }
};

// here we are iterating over each div element using forEach Loop
choices.forEach((choice) => {
  // Then we are adding event listeners on each div element for 'click' event
  choice.addEventListener('click', () => {
    // whenever a div is clicked, fetch its id
    const userChoice = choice.getAttribute('id');
    // & pass that id to playGame function
    playGame(userChoice);
  });
});
