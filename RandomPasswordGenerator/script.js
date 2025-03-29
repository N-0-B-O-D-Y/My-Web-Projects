const textBox = document.querySelector(".text-box");
const copyBtn = document.querySelector("#copy-btn");
const generateBtn = document.querySelector("#generate-password-btn");

const showPwd = document.querySelector("#show-pwd"); //anchor tag for next page
const displayBox = document.querySelector(".display-box"); //box for showing pwd

// here we are creating our key which will store all the necessary tokens required for creating a pwd
let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_+=";
let password = "";

// function to generate a random password of 10 digits
function generatePassword() {
    password = '';
    // this loop will be iterating for 10 times
    for(let i=0;i<10;i++){
        // here we are generating a random number that will act as an index number for extracting an element from the char string randomly, it will be generated for 10 times as 10 is our password's length
        password += char.charAt(Math.floor(Math.random() * char.length));
    }
    textBox.innerText = password; // show password in text box
    localStorage.setItem("generatedPassword", password); // store in localStorage for second.html
}

// Event Listener for Generate button
generateBtn.addEventListener('click', generatePassword);

// Event Listener for the 'copy' button & it's listener will help in copying the current password into the clipboard
copyBtn.addEventListener('click', ()=>{

    let generatedPassword = textBox.innerText; //extracting the generated pwd

    // copying the password into the clipboard using writeText() function, & also adding the promise concept into it using (.then() & .catch() functions)
    navigator.clipboard.writeText(generatedPassword).then(()=> {

        // here we are checking if generated password is empty
        if(generatedPassword ===''){
            alert("Generate a password first!");
        }
        // if generated password is not-empty
        else {
            alert("Password copied to clipboard!"); // showing an alert of successfully password copied
            textBox.innerText = ''; // clear the text box after copying
        }
    }).catch(err=>{ // it will execute only when an error is occurred in copying the password
        console.error(`error copying password: ${err}`);
    });
});


