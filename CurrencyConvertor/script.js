const BASE_URL =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

//   Here we are fetching all the 'select' elements from the '.dropdown' class of the html
const dropdown = document.querySelectorAll('.dropdown select'); // selecting all as an array
// now we will fetch our button
const btn = document.querySelector('form button'); // selecting a single element
// now we will access our to and from 'select' elements
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
// here we are accesing our msg block
const msg = document.querySelector('.msg');

// here we are adding an eventListener for the first time page loading i.e., for 'load' event, that is on our 'window' object of DOM
window.addEventListener('load', () => {
  updateExchangeRate();
});

//now we will populate our options

for (let select of dropdown) {
  for (currCode in countryList) {
    let newOption = document.createElement('option');
    // Here we are setting the innerText and value of each option tag that will we added to the dropDown
    newOption.innerText = currCode;
    newOption.value = currCode;
    // here we are setting 'usd' as by default country in 'from' by setting 'selected' attribute here for that 'option tag'
    if (select.name === 'from' && currCode === 'USD') {
      newOption.selected = 'selected';
    } else if (select.name === 'to' && currCode === 'INR') {
      newOption.selected = 'selected';
    }
    select.append(newOption); //here we are adding newOption inside the select element
  }

  // here we are adding 'change' event over the select element, so it will be triggered whenever the option inside the select changes
  select.addEventListener('change', (evt) => {
    // here we are calling the updateFlag function & passing current target using eventListener's "event" object as 'evt'
    updateFlag(evt.target);
  });
}

// function for updating flag accoridng to the country
const updateFlag = (element) => {
  // here we are extracting currency Code from the element
  let currCode = element.value;
  //   now, uing currency code, we can fetch the countryCode from the codes.js file
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`;
  //   now currently our element is 'select' & its parent element is class 'select-container' in html, which contains both the 'img tag' & 'select tag', so we will have to goto that parent element to access 'img tag', as we can't do it with 'select tag' alone
  let img = element.parentElement.querySelector('img');
  //   now we will update its src link
  img.src = newSrc;
};

// now we will add eventListener over the button

btn.addEventListener('click', (evt) => {
  // now we will disable the default setting of the button, as for a button inside a 'form tag' there are some default settings like, refresh the page, add the passed data into the url, so using this method, we want that on clicking the button, all such automatic features should be turned off, as we want to do all stuffs by ourselves
  evt.preventDefault();
  updateExchangeRate();
});

// this is our function which will be responsible for fetching our exchange rate & print that rate on the webpage
// to use our 'await', we have to make this arrow function as an 'async' function
const updateExchangeRate = async () => {
  //   now we will fetch our user input amount
  let amount = document.querySelector('.amount input');
  let amtValue = amount.value;
  //   this our condition for checking if amount is empty or less than 1
  if (amtValue === '' || amtValue < 1) {
    amtValue = 1;
    amount.value = '1';
  }

  //   now we will set our url, for sending our request through 'fetch API'
  //   here we will set our values from uppercase to lowercase, as our api won't accept uppercase values
  //this link will fetch the object of current 'from currency'
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

  //   now we wil use pass our url to the fetch() method(it's an asynchronous method) & add await to it
  let response = await fetch(URL); //this method returns a promise, which is in JSON format
  //now we will convert this response into a useful JS object using json() method()(it's an asynchronous method)
  let data = await response.json();

  //   now, will extract our exchange rate from the data object
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  //   now we will find the final amount
  let finalAmt = rate * amtValue;

  //   now we wil update our message with the help of "template literal" which is responsible for 'string interpolation'
  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};
