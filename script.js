// Naming Variables
const displayInput = document.querySelector("#numberInput");
const clearBtn = document.querySelector(".clear-button");
const deleteBtn = document.querySelector(".delete-button");
const numberBtn = document.querySelectorAll(".number-button");
const operatorBtn = document.querySelectorAll(".operator-button");
const equalBtn = document.querySelector(".equals-button");

let currentValue = "0"
let previousValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    displayInput.textContent = currentValue
}
function appendNumber(value) {
    if (shouldResetDisplay === true) {
        currentValue = "0"
        shouldResetDisplay = false
    }
    if (value === "." && currentValue.includes(".")) {
        return
    }
    else if (currentValue === "0" && value !== ".") {
        currentValue = value;
    }
    else {
        currentValue += value;
    }
}

numberBtn.forEach((button) => {
    button.addEventListener("click", () => {
        appendNumber(button.dataset.value)
        updateDisplay();
    });
});
// deleting numbers
function deleteDisplay() {
    if (currentValue.length === 1) {
        currentValue = "0"
    }
    else {
        currentValue = currentValue.slice(0, -1)
    }
    updateDisplay();
}
deleteBtn.addEventListener("click", () => {
    deleteDisplay()
})

//        clearing numbers
function clearDisplay() {
    currentValue = "0";
    previousValue = null
    operator = null
    shouldResetDisplay = false
    updateDisplay()
}

clearBtn.addEventListener("click", () => {
    clearDisplay()
})

function calulation() {
    let result 
    let b = parseFloat(currentValue);
    let a = parseFloat(previousValue);

    if (operator === "+") {
        result = a+b
    } 
    else if (operator === "-"){
        result = a-b
    }
    else if (operator === "*") {
        result = a*b
    }
    else if(operator === "/"){
        if (b == "0") {
            return "Error"
        } else {
            result = a/b
        }
    }
    return String(result);
}
operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
        chooseOperator(button.dataset.value)
        updateDisplay()
    })
})
function chooseOperator(value) {
    if (previousValue !== null && shouldResetDisplay === false) {
        currentValue = calulation();
    }
    previousValue = currentValue;
    operator = value;
    shouldResetDisplay = true;
}
function handleEquals() {
    if (previousValue === null || operator === null) {
        return
    } 
    currentValue = calulation();
    operator = null;
    previousValue = null;
    shouldResetDisplay= true;
}
equalBtn.addEventListener("click",()=>{
    handleEquals();
    updateDisplay();
})