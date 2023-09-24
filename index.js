const passwordLen = document.querySelector(".passwordLen");
const inputSlider = document.querySelector(".inputSlider");
const card1Input = document.querySelector(".card1Input");
const copyBtn = document.querySelector(".copyBtn");
const copyMsg = document.querySelector(".copyMsgDiv");
const getUppercase = document.querySelector("#uppercase");
const getLowercase = document.querySelector("#lowercase");
const getNumber = document.querySelector("#numbers");
const getSymbol = document.querySelector("#symbol");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const strengthColor = document.querySelector(".strengthColor");
const generateBtn = document.querySelector(".generateBtn");
const symbols ="{}!@#$%^&*()+[]\/?><';:";

// let password = "";
let passwordLength = 8;
let checkboxCount = 1;

// // //handleSlider==>
handleSlider();
function handleSlider() {
    inputSlider.value = passwordLength;
    passwordLen.innerText = passwordLength;
};

// // //strengthColorfun==>
// // strengthColorfun(0, 9);
function strengthColorfun(color) {
    strengthColor.style.backgroundColor = color;
    strengthColor.style.boxShadow = `0px 0px 12px 1px ${color}`;
};

// // //toGenerateRandInt==>
// //randomInt(0, 10);
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

// // //toGenerateRandomInt==>
// // getRandomInt();
function getRandomInt() {
    return randomInt(0, 10);
};

// // //toGenerateLowercase==>
// // generateLowercase();
function generateLowercase() {
    return String.fromCharCode(randomInt(97, 123));
};

// // //toGenerateUppercase==>
// // generateUppercase();
function generateUppercase() {
    return String.fromCharCode(randomInt(65, 91));
};

// // //toGetRandomSymbol==>
// //getRandSymbol(0, 23);
function getRandSymbol() {
    const randNum = randomInt(0, symbols.length);
    return symbols.charAt(randNum);
};

// // //toCheckTheStrengthOfPassword==>
// //getStrength();
function getStrength() {
    let hasuppercase = false;
    let haslowercase = false;
    let hasnumber = false;
    let hassymbol = false;

    if(getUppercase.checked) hasuppercase = true;
    if(getLowercase.checked) haslowercase = true;
    if(getNumber.checked) hasnumber = true;
    if(getSymbol.checked) hassymbol = true;

    if(hasuppercase & hasnumber & (hassymbol || haslowercase) & passwordLength >= 8){
        strengthColorfun("#35b726");//green
    }

    else if(hasuppercase & hasnumber & (hassymbol||haslowercase) & passwordLength >= 6){
        strengthColorfun("#cbe122");//yellow
    }
    
    else{
        strengthColorfun("#d31925");//red
    }
};


// // //toCopyDataToClipboard==>
// //copyPswd();
async function copyPswd() {
    try {
        await navigator.clipboard.writeText(card1Input.value);
        copyMsg.classList.add("copyMsgDivActive");
        console.log("Copying...");
    }
    catch (error) {
        copyMsg.innerText = "Failed";
    }
    // copyMsg.classList.add("copyMsgDivActive");

    setTimeout(() => {
        console.log("Copied");
        copyMsg.classList.remove("copyMsgDivActive");
    }, 2000)
}


inputSlider.addEventListener('input', (e)=> {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener("click", ()=>{
    if(card1Input.value){
        copyPswd();
    }
})


// // //handleCheckboxCount==>
function handleCheckboxChange() {
    checkboxCount = 0;
    allCheckBox.forEach(checkbox => {
        if(checkbox.checked){
            checkboxCount++;
        }
    });

    if(passwordLength < checkboxCount){
        passwordLength = checkboxCount;
        handleSlider();
    }
}


function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

allCheckBox.forEach(checkbox => {
    checkbox.addEventListener("change", handleCheckboxChange)
});


// // // //password Generate==>
generateBtn.addEventListener("click", ()=>{
    if(checkboxCount == 0){
        return;
    }

    if(passwordLength < checkboxCount){
        passwordLength = checkboxCount;
        handleSlider();
    }

    // //password Generate
    password ="";
    
    // if(getUppercase.checked) {
    //     password += generateUppercase();
    // }
    // if(getLowercase.checked) {
    //     password += generateLowercase();
    // }
    // if(getNumber.checked) {
    //     password += getRandomInt();
    // }
    // if(getSymbol.checked) {
    //     password += getRandSymbol();
    // }

    let funcArr = [];

    if(getUppercase.checked){
        funcArr.push(generateUppercase);
    }
    if(getLowercase.checked){
        funcArr.push(generateLowercase);
    }
    if(getNumber.checked){
        funcArr.push(getRandomInt);
    }
    if(getSymbol.checked){
        funcArr.push(getRandSymbol);
    }


    for (let index = 0; index < funcArr.length; index++) {
        password += funcArr[index]();
    }


    for (let index = 0; index < passwordLength - funcArr.length; index++) {
        randIndex = randomInt(0, funcArr.length);
        password += funcArr[randIndex]();
    }

    password = shufflePassword(Array.from(password));
    card1Input.value = password;
    getStrength();
})
