import { divide, multiply, subtract, add, opposite, operate } from './operators.js'

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

numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (currentOperator != "equals") {
            currentNumber = `${currentNumber}${e.target.id}`
            console.log(currentNumber)
            console.log(previousNumber)
            mainDisplay.innerHTML = mainDisplay.innerHTML + e.target.id
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
                secondaryDisplay.innerHTML = total
            }
        }

    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (currentNumber != '' || total != '') {
            if (total == '') {
                currentOperator = e.target.id
                previousNumber = currentNumber
                currentNumber = ''
                mainDisplay.innerHTML = mainDisplay.innerHTML + e.target.innerHTML
            } else {
                currentOperator = e.target.id
                previousNumber = total
                currentNumber = ''
                mainDisplay.innerHTML = total + e.target.innerHTML
            }
        }
    })
})

equalsButton.addEventListener('click', e => {
    if (currentOperator != "equals") {
        currentOperator = e.target.id
        secondaryDisplay.innerHTML = mainDisplay.innerHTML
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
    console.log("Delete clicked")
    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1)
        mainDisplay.innerHTML = currentNumber
    }
})

