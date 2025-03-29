// Here we are accessing the html elements using our DOM object
let rock = document.querySelector('#rock');
let paper = document.querySelector('#paper');
let scissor = document.querySelector('#scissor');
let pickUrMove = document.querySelector('#yourMove');
let userVal = document.querySelector('#userVal');
let compVal = document.querySelector('#compVal');
let boxes = document.querySelectorAll('.box');
let r = document.querySelector('#r');
let p = document.querySelector('#p');
let s = document.querySelector('#s');

/* --------------------------- Variable's section starts Here --------------------------- */

// it will monitor the click event over the pickUrMove button
let clicked = false;
// initializing the userPicked & compPicked variables
let userPicked = '';
let compPicked = '';

let uVal = 0;
let cVal = 0;

/* ------------------------- variable's section ends Here ------------------------ */

/* ------------------ When 'Pick-Your-Move' button clicked starts ------------------ */

// Here we are adding click event listener over the button 'pickUrMove'
pickUrMove.addEventListener('click', () => {
  clicked = true; //this is our handler
  console.log(
    '1. Pick Your Move button clicked & value of clicked is: ',
    clicked,
  );

  // if pickUrMove button is clicked
  if (clicked) {
    // Here we are calling functions related to all three elements (Rock, Paper, & Scissor)
    console.log('2. now we are inside clicked condition');
    pickRock();
    pickPaper();
    pickScissor();
    clicked = false;
  }
  //here we are iterating over each box
  for (box of boxes) {
    box.disabled = false; //enabling the box

    // here we are adding 'hov' class over the boxes again to enable the hover feature over the each box
    box.classList.add('hov');
  }

  // reseting backgroundColors of the elements
  rock.style.backgroundColor = 'pink';
  r.style.color = 'black';
  paper.style.backgroundColor = 'rgb(149, 75, 149)';
  p.style.color = 'black';
  scissor.style.backgroundColor = 'skyblue';
  s.style.color = 'black';
});

/* ------------------ When 'Pick-Your-Move' button clicked ends ------------------ */

/* --------------------------- Event call function starts --------------------------- */

// pickRock function definition
let pickRock = () => {
  console.log('3. pickRock function called');
  rock.addEventListener('click', rockHandler); //Here 'userPicked' value will become 'rock'
};

// pickPaper function definition
let pickPaper = () => {
  console.log('3. pickPaper function called');
  paper.addEventListener('click', paperHandler); //Here 'userPicked' value will become 'paper'
};

// pickScissor function definition
let pickScissor = () => {
  console.log('3. pickScissor Function called');
  scissor.addEventListener('click', scissorHandler); //Here 'userPicked' value will become 'scissor'
};

/* ------------------------ Event call function ends ------------------------ */

/* ---------------------------- Handler Functions Starts --------------------------- */

//rockHandler
let rockHandler = () => {
  console.log('4. rock clicked');
  userPicked = 'rock';
  // Here we are calling compChoice function that will return a number between 1 & 3
  let randNum = compChoice(1, 3);
  // here we are calling randPick function which will accept random number returned by compChoice function
  randPick(randNum, userPicked);
};

// paperHandler
let paperHandler = () => {
  console.log('4. paper clicked');
  userPicked = 'paper';
  // Here we are calling compChoice function that will return a number between 1 & 3
  let randNum = compChoice(1, 3);
  // here we are calling randPick function which will accept random number returned by compChoice function
  randPick(randNum, userPicked);
};

// scissorHandler
let scissorHandler = () => {
  console.log('4. scissor clicked');
  userPicked = 'scissor';
  // Here we are calling compChoice function that will return a number between 1 & 3
  let randNum = compChoice(1, 3);
  // here we are calling randPick function which will accept random number returned by compChoice function
  randPick(randNum, userPicked);
};

/* ------------------------- Handler Functions Ends ------------------------- */

/* ------------------------------- Other Works starts here ------------------------------ */

// this method will return an integer that lies in the range 1 to 3 (both inclusive)
let compChoice = (min, max) => {
  console.log('5. inside compChoice function');
  return Math.floor(Math.random() * (max - min + 1) + min); //it will return either 1 or 2 or 3
};

// function for randomly picking a box for the computer side
let randPick = (randNum, userPicked) => {
  console.log('6. inside randPick function');
  if (randNum === 1) {
    compPicked = 'rock'; // pick rock
  } else if (randNum === 2) {
    compPicked = 'paper'; // pick paper
  } else if (randNum === 3) {
    compPicked = 'scissor'; // pick scissor
  }

  // Here we are calling the matcher function to check the result on the basis of user and computer's choice
  matcher(userPicked, compPicked);
};

/* -------------------------- Other work ends here -------------------------- */

/* ------------------------- Matcher function starts ------------------------ */
let matcher = (user, comp) => {
  console.log(
    `7. inside matcher Function & value of 'user' is ${user} & value of 'comp' is ${comp} `,
  );

  // rock conditions
  if (user === 'rock') {
    if (comp === 'rock') {
      console.log('match draw, as both picked rock');
    } else if (comp === 'paper') {
      cVal = cVal + 1;
      compVal.innerText = cVal;
      console.log('computer wins, as paper can wrap up the rock');
    } else if (comp === 'scissor') {
      uVal = uVal + 1;
      userVal.innerText = uVal;
      console.log('User wins, as rock can break the scissor');
    }
  }

  // paper conditions
  else if (user === 'paper') {
    if (comp === 'rock') {
      uVal = uVal + 1;
      userVal.innerText = uVal;
      console.log('User wins, as paper can wrap up the rock');
    } else if (comp === 'paper') {
      console.log('match draw, as both picked paper');
    } else if (comp === 'scissor') {
      cVal = cVal + 1;
      compVal.innerText = cVal;
      console.log('Computer wins, as scissor can cut the paper');
    }
  }

  // paper conditions
  else if (user === 'scissor') {
    if (comp === 'rock') {
      cVal = cVal + 1;
      compVal.innerText = cVal;
      console.log('Computer wins, as rock can break the scissor');
    } else if (comp === 'paper') {
      uVal = uVal + 1;
      userVal.innerText = uVal;
      console.log('User wins, as scissor can cut the paper');
    } else if (comp === 'scissor') {
      console.log('match draw, as both picked scissor');
    }
  }

  // here after 1 match, we are disabling all 3 elements

  if (comp === 'rock') {
    rock.style.backgroundColor = 'lightgreen';
    r.style.color = 'darkred';
  } else if (comp === 'paper') {
    paper.style.backgroundColor = 'lightgreen';
    p.style.color = 'darkred';
  } else if (comp === 'scissor') {
    scissor.style.backgroundColor = 'lightgreen';
    s.style.color = 'darkred';
  }

  // here we are iterating over each box
  for (box of boxes) {
    box.disabled = true; //disabling box

    // here we are removing 'hov' class that contains the hover feature
    box.classList.remove('hov');
  }
};

/* -------------------------- Matcher function ends ------------------------- */
