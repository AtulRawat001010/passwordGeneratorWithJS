const passwordLen = document.querySelector(".passwordLen");
const inputSlider = document.querySelector(".inputSlider");
const card1Input = document.querySelector(".card1Para");
const copyBtn = document.querySelector(".copyBtn");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const number = document.querySelector("#number");
const symbol = document.querySelector("#symbol");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const strengthColor = document.querySelector(".strengthColor");
const generateBtn = document.querySelector(".generateBtn");

let password = ""
let passwordLength = 10;


handleSlider();
function handleSlider() {
    inputSlider.value = passwordLength;
    passwordLen.innerText = passwordLength;
}

function strengthColorfun(min, max) {
    let x= Math.floor(Math.random()*(max - min));
    console.log(x);
}

strengthColorfun(0, 9);





function copied() {
    copyBtn.textContent = "copied";
        console.log("Copying...");

    setTimeout(() => {
        console.log("Copied");
    }, 2000)
};
