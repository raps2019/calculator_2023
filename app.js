import { divide, multiply, subtract, add, opposite, operate } from './operators.js'

let previousNumberDisplay = document.querySelector('#previousNumber')
let currentNumberDisplay = document.querySelector('#currentNumber')
let totalDisplay = document.querySelector('#total')



let numberButtons = document.querySelectorAll('.numberButton')
let clearButton = document.querySelector('.clearButton')
let deleteButton = document.querySelector('.deleteButton')
let operatorButtons = document.querySelectorAll('.operatorButton')
let equalsButton = document.querySelector('.equalsButton')
let mainDisplay = document.querySelector('.mainDisplay')
let secondaryDisplay = document.querySelector('.secondaryDisplay')
let secondaryDisplayText = ""
let currentNumber = ""
let previousNumber = ""
let total = ""
let currentOperator = ""
let secondaryDisplayCopy = ""

numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (currentOperator != "equals") {
            // if (currentNumber.length > 17) {
            //     secondaryDisplayCopy = mainDisplay.innerHTML
            //     secondaryDisplay.innerHTML = "Number Limit Reached"
            //     setTimeout(() => {
            //         secondaryDisplay.innerHTML = secondaryDisplayCopy;
            //     }, 750)
            //     return;
            // }
            currentNumber = `${currentNumber}${e.target.id}`
            console.log(currentNumber)
            console.log(previousNumber)
            secondaryDisplay.innerHTML = secondaryDisplay.innerHTML + e.target.id
            if (previousNumber != "") {
                switch (currentOperator) {
                    case "divide":
                        total = divide(previousNumber, currentNumber)
                        console.log("running divide")
                        break
                    case "multiply":
                        total = multiply(previousNumber, currentNumber)
                        break
                    case "subtract":
                        total = subtract(previousNumber, currentNumber)
                        break
                    case "add":
                        total = add(previousNumber, currentNumber)
                        break
                }
                mainDisplay.innerHTML = total
            }
        }
        totalDisplay.innerHTML = total
        previousNumberDisplay.innerHTML = previousNumber
        currentNumberDisplay.innerHTML = currentNumber
    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (currentNumber != '' || total != '') {
            if (total == '') {
                previousNumber = currentNumber
            } else {
                // currentOperator = e.target.id
                previousNumber = total
                // currentNumber = ''
                // mainDisplay.innerHTML = mainDisplay.innerHTML + e.target.innerHTML
            }
            if (currentOperator == "equals") {
                secondaryDisplay.innerHTML = `${previousNumber}${e.target.innerHTML}`
            } else {
                secondaryDisplay.innerHTML = `${secondaryDisplay.innerHTML}${e.target.innerHTML}`
            }
            // mainDisplay.innerHTML = mainDisplay.innerHTML + e.target.innerHTML
            currentOperator = e.target.id
            currentNumber = ''
        }
    })
})

equalsButton.addEventListener('click', e => {
    if (currentOperator != "equals") {
        currentOperator = e.target.id
        secondaryDisplay.innerHTML = ''
        if (previousNumber == '') {
            previousNumber = currentNumber;
            currentNumber = ''
            total = previousNumber
            mainDisplay.innerHTML = previousNumber
        } else {
            mainDisplay.innerHTML = total
            previousNumber = total
            currentNumber = ''
        }
    }
})

clearButton.addEventListener('click', e => {
    currentOperator = ''
    previousNumber = ''
    currentNumber = ''
    total = ''
    mainDisplay.innerHTML = ''
    secondaryDisplay.innerHTML = ''
})

deleteButton.addEventListener('click', e => {
    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1)
        mainDisplay.innerHTML = currentNumber
    }
})

