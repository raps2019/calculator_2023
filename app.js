import { divide, multiply, subtract, add, opposite, operate } from './operators.js'

let previousNumberDisplay = document.querySelector('#previousNumber')
let currentNumberDisplay = document.querySelector('#currentNumber')



let numberButtons = document.querySelectorAll('.numberButton')
let clearButton = document.querySelector('.clearButton')
let deleteButton = document.querySelector('.deleteButton')
let operatorButtons = document.querySelectorAll('.operatorButton')
let equalsButton = document.querySelector('.equalsButton')
let mainDisplay = document.querySelector('.mainDisplay')
let secondaryDisplay = document.querySelector('.secondaryDisplay')
let mainDisplayText = ""
let secondaryDisplayText = ""
let currentNumber = ""
let previousNumber = ""
let total = ""
let currentOperator = ""
let currentOperatorSymbol = ""
let secondaryDisplayCopy = ""
let block = false
let secondaryDisplayMaxLength = 34


numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (currentOperator != "equals" && block == false) {
            // if (secondaryDisplay.innerHTML.length > 34) {
            //     secondaryDisplayCopy = secondaryDisplay.innerHTML
            //     secondaryDisplay.innerHTML = "Limit Reached"
            //     block = true;
            //     setTimeout(() => {
            //         secondaryDisplay.innerHTML = secondaryDisplayCopy
            //         block = false
            //     }, 750)
            //     return;
            // }
            currentNumber = `${currentNumber}${e.target.id}`
            secondaryDisplayText = secondaryDisplay.innerHTML + e.target.id
            if (secondaryDisplayText.length > secondaryDisplayMaxLength) {
                console.log("running")
                secondaryDisplayText = `${previousNumber}${currentOperatorSymbol}${currentNumber}`
                if (secondaryDisplayText.length < secondaryDisplayMaxLength) {
                    secondaryDisplay.innerHTML = secondaryDisplayText
                } else {
                    secondaryDisplayCopy = secondaryDisplay.innerHTML
                    secondaryDisplay.innerHTML = "Limit Reached"
                    block = true;
                    setTimeout(() => {
                        secondaryDisplay.innerHTML = secondaryDisplayCopy
                        block = false
                    }, 750)
                    return;
                }
            } else {
                secondaryDisplay.innerHTML = secondaryDisplay.innerHTML + e.target.id
            }
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
            }
            if (total.toString().length > 15) {
                console.log(total.length)
                mainDisplay.innerHTML = total.toExponential(10)
            } else {
                mainDisplay.innerHTML = total
            }
        }
        // // totalDisplay.innerHTML = total
        // previousNumberDisplay.innerHTML = previousNumber
        // currentNumberDisplay.innerHTML = currentNumber
    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
        // if (secondaryDisplay.innerHTML.length > secondaryDisplayMaxLength) {
        //     secondaryDisplayCopy = secondaryDisplay.innerHTML
        //     secondaryDisplay.innerHTML = "Limit Reached"
        //     block = true
        //     setTimeout(() => {
        //         secondaryDisplay.innerHTML = secondaryDisplayCopy;
        //         block = false
        //     }, 750)
        //     return;
        // }
        if (currentNumber != '' || total != '') {
            if (total == '') {
                previousNumber = currentNumber
            } else {
                // currentOperator = e.target.id
                previousNumber = total
                // currentNumber = ''
                // mainDisplay.innerHTML = mainDisplay.innerHTML + e.target.innerHTML
            }
        }
        if (currentOperator == "equals") {
            secondaryDisplay.innerHTML = `${previousNumber}${e.target.innerHTML}`
        } else if (currentNumber == '') {
            if (currentOperator != e.target.id) {
                secondaryDisplay.innerHTML = secondaryDisplay.innerHTML.slice(0,-1)+e.target.innerHTML
            }
        }
        else {
            secondaryDisplay.innerHTML = `${secondaryDisplay.innerHTML}${e.target.innerHTML}`
        }
        // mainDisplay.innerHTML = mainDisplay.innerHTML + e.target.innerHTML
        currentOperator = e.target.id
        currentOperatorSymbol = e.target.innerHTML
        currentNumber = ''

    })
})

equalsButton.addEventListener('click', e => {
    if (currentOperator != "equals" && currentNumber != '') {
        currentOperator = e.target.id
        currentOperatorSymbol = e.target.innerHTML
        secondaryDisplay.innerHTML = ''
        if (previousNumber == '') {
            previousNumber = currentNumber;
            currentNumber = ''
            total = previousNumber
            mainDisplayText = total
        } else {
            mainDisplayText = total
            previousNumber = total
            currentNumber = ''
        }
        if (total.toString().length > 15) {
            console.log(total.length)
            mainDisplay.innerHTML = total.toExponential(10)
        } else {
            mainDisplay.innerHTML = total
        }
    }
})

clearButton.addEventListener('click', e => {
    currentOperator = ''
    currentOperatorSymbol = ''
    previousNumber = ''
    currentNumber = ''
    total = ''
    mainDisplay.innerHTML = ''
    secondaryDisplay.innerHTML = ''
})

deleteButton.addEventListener('click', e => {
    if (currentNumber !== "") {
        currentNumber = currentNumber.slice(0, -1)
        secondaryDisplay.innerHTML = secondaryDisplay.innerHTML.slice(0, -1)
    }
})

