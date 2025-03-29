// here we are accessing the dom elements
const titleBox = document.querySelector('.inner3-inner-div');
const outerBox = document.querySelector('.inner3-inner');
const dataDiv = document.querySelector('.data-div');

let clicked = 0;

// here we are adding the even listener over the title box
titleBox.addEventListener('click', () => {
  if (clicked === 0) {
    // here we are removing the hidden class from the dataDiv's classList
    dataDiv.classList.remove('hidden');
    titleBox.style.border = 'none';
    titleBox.style.borderRadius = 'none';
    dataDiv.style.border = 'none';
    dataDiv.style.borderRadius = 'none';
    outerBox.style.border = '1px solid lightgray';
    outerBox.style.borderRadius = '0.7rem';

    clicked = 1;
  } else {
    // here we are adding the hidden class from the dataDiv's classList
    dataDiv.classList.add('hidden');
    clicked = 0;

    outerBox.style.border = 'none';
    titleBox.style.border = '1px solid lightgray';
    titleBox.style.borderRadius = '0.7rem';
  }
});
