const FORNATTING = document.querySelector(".formatting");

const SOURCE = FORNATTING.querySelector("#source");
const RESULT = FORNATTING.querySelector("#result");

const buttonNoSpace = FORNATTING.querySelector("#button__no_space"); // " "
const buttonHyphenInsertione = FORNATTING.querySelector("#button__hyphen_insertion"); // " - "
const buttonHyphenLowerinsertion = FORNATTING.querySelector("#button__hyphen_lowerinsertion"); // " _ "
const buttonHyphenDiagonalinsertion = FORNATTING.querySelector("#button__hyphen_diagonalinsertion"); // " / "
const buttonUppercase = FORNATTING.querySelector("#button__uppercase"); // " A "
const buttonLowercase = FORNATTING.querySelector("#button__lowercase"); // " a "
const buttonDrop = FORNATTING.querySelector("#button__drop"); // " Сбросить "

const BUTTON_ADD = {
    "NoSpace": FORNATTING.querySelector("#no_space--add"), // " "
    "HyphenInsertion": FORNATTING.querySelector("#hyphen_insertion--add"), // " - "
    "HyphenLowerinsertion": FORNATTING.querySelector("#hyphen_lowerinsertion--add"), // " _ "
    "HyphenDiagonalinsertion": FORNATTING.querySelector("#hyphen_diagonalinsertion--add"), // " / "
    "Uppercase": FORNATTING.querySelector("#uppercase--add"), // " A "
    "Lowercase": FORNATTING.querySelector("#lowercase--add") // " a "
};
const NUMBER = [FORNATTING.querySelector("#source-number"), FORNATTING.querySelector("#result-number")];
let textSource;

SOURCE.addEventListener("input", () => {
    textSource = SOURCE.value;
    RESULT.value = textSource;

    NUMBER[0].textContent = textSource.length;
    NUMBER[1].textContent = RESULT.value.length;

    BUTTON_ADD.NoSpace.addEventListener("click", () => {
        if(RESULT.value != '')
            RESULT.value = RESULT.value.replace(/ /g, "");
            NUMBER[1].textContent = RESULT.value.length;
    });
    BUTTON_ADD.HyphenInsertion.addEventListener("click", () => {
        if(RESULT.value != '')
            RESULT.value = RESULT.value.replace(/ /g, "-");
            NUMBER[1].textContent = RESULT.value.length;
    });
    BUTTON_ADD.HyphenLowerinsertion.addEventListener("click", () => {
        if(RESULT.value != '')
            RESULT.value = RESULT.value.replace(/ /g, "_");
            NUMBER[1].textContent = RESULT.value.length;
    });
    BUTTON_ADD.HyphenDiagonalinsertion.addEventListener("click", () => {
        if(RESULT.value != '')
            RESULT.value = RESULT.value.replace(/ /g, "/");
            NUMBER[1].textContent = RESULT.value.length;
    });
    BUTTON_ADD.Uppercase.addEventListener("click", () => {
        if(RESULT.value != '')
            RESULT.value = RESULT.value.toUpperCase();
    });
    BUTTON_ADD.Lowercase.addEventListener("click", () => {
        if(RESULT.value != '')
            RESULT.value = RESULT.value.toLowerCase();
    });


    buttonNoSpace.addEventListener("click", () => {
        RESULT.value = textSource.replace(/ /g, "");
        NUMBER[1].textContent = RESULT.value.length;
    });
    buttonHyphenInsertione.addEventListener("click", () => {
        RESULT.value = textSource.replace(/ /g, "-");
        NUMBER[1].textContent = RESULT.value.length;
    });
    buttonHyphenLowerinsertion.addEventListener("click", () => {
        RESULT.value = textSource.replace(/ /g, "_");
        NUMBER[1].textContent = RESULT.value.length;
    });
    buttonHyphenDiagonalinsertion.addEventListener("click", () => {
        RESULT.value = textSource.replace(/ /g, "/");
        NUMBER[1].textContent = RESULT.value.length;
    });
    buttonUppercase.addEventListener("click", () => {
        RESULT.value = textSource.toUpperCase();
    });
    buttonLowercase.addEventListener("click", () => {
        RESULT.value = textSource.toLowerCase();
    });
    buttonDrop.addEventListener("click", () => {
        RESULT.value = textSource.replace(/ /g, " ");
        NUMBER[1].textContent = RESULT.value.length;
    });
});

FORNATTING.querySelector("#button--copy").addEventListener("click", () => {
    if(RESULT.value != '')
    {
        RESULT.select();
        document.execCommand("copy"); 
    }else
    {
        alert("Нету отформатированного текста!");
    }
});