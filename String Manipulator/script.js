window.onload = function(){
    alert("Enter a string with some underscores(_), to see the magic…");
    document.querySelector('h1').classList.remove('hidden');
    document.querySelector('.outer-container').classList.remove('hidden');
};

//fetching elements from the HTML using DOM
const inputBox = document.querySelector('#input');
const changeBtn = document.querySelector('#change-btn');
const reloadBtn = document.querySelector('#reload-btn');
const copyBtn = document.querySelector('#copy-btn');

// to store the status of the current value in the input box.
let flag=0;

counter = ()=>{
    let count =0;
    let str = inputBox.value;
    for(let ch of str){
        if(ch==='_'){
            count=count+1;
        }
    }
    return count;
}

//event listener on change button
changeBtn.addEventListener('click',()=>{
    if(inputBox.value !== "") {
        if(counter()>0) {
            inputBox.value = inputBox.value.replaceAll('_', ' ');
            inputBox.disabled = true;
            changeBtn.classList.add('hidden');
            reloadBtn.classList.remove('hidden');
            flag = 1;
        }
        else{
            alert("enter a valid string first (Only '_' is allowed)");
        }
    }
    else{
        alert("enter a string first");
    }
});

//event listener on reload button
reloadBtn.addEventListener('click',()=>{
    inputBox.value ='';
    inputBox.disabled = false;
    changeBtn.classList.remove('hidden');
    reloadBtn.classList.add('hidden');
    flag = 0;
});

//event listener on copy button
copyBtn.addEventListener('click',()=>{
    if(flag===1){
        let str = inputBox.value;
        navigator.clipboard.writeText(str).then(()=>{
            alert('Text Copied');
        }).catch(()=>{
            alert('unable to copy');
        });
    }
});

