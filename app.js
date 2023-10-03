import { divide, multiply, subtract, add, opposite, operate } from './operators.js'

let previousNumberDisplay = document.querySelector('#previousNumber')
let currentNumberDisplay = document.querySelector('#currentNumber')
let totalDisplay = document.querySelector('#total')



let numberButtons = document.querySelectorAll('.numberButton')
let clearButton = document.querySelector('.clearButton')
let deleteButton = document.querySelector('.deleteButton')
let operatorButtons = document.querySelectorAll('.operatorButton')
let equalsButton = document.querySelector('.equalsButton')
// let decimalButton = document.querySelector('.decimalButton')
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
let secondaryDisplayMaxLength = 30
let mainDisplayMaxLength = 16


numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        //check if the number is a decimal already
        if (e.target.id == '.' && currentNumber.includes('.')) {
            return
        }
        //check if the last operator was equal. If so, an operator has to be clicked next. 
        if (currentOperator != "equals" && block == false) {
            currentNumber = `${currentNumber}${e.target.id}`
            secondaryDisplayText = secondaryDisplay.innerHTML + e.target.id
            if (secondaryDisplayText.length > secondaryDisplayMaxLength) {
                secondaryDisplayText = `${previousNumber}${currentOperatorSymbol}${currentNumber}`
                if (secondaryDisplayText.length < secondaryDisplayMaxLength) {
                    secondaryDisplay.innerHTML = secondaryDisplayText
                } else {
                    secondaryDisplay.innerHTML = "Limit Reached"
                    block = true;
                    setTimeout(() => {
                        secondaryDisplay.innerHTML = secondaryDisplayText
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
            if (total.toString().length > mainDisplayMaxLength) {
                mainDisplay.innerHTML = total.toExponential(10)
            } else {
                mainDisplay.innerHTML = total
            }
        }
    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (currentNumber != '' || total != '') {
            if (total == '') {
                previousNumber = currentNumber
            } else {
                previousNumber = total
            }
        }
        if (currentOperator == "equals") {
            //If current operator is equals, add operator to the secondary display
            secondaryDisplay.innerHTML = `${previousNumber}${e.target.innerHTML}`
        } else if (currentNumber == '') {
            //If no current number, check if operator is being pressed with no number entered after the operator yet. If so, allow user to change operator. 
            if (currentOperator != e.target.id) {
                secondaryDisplay.innerHTML = secondaryDisplay.innerHTML.slice(0, -1) + e.target.innerHTML
            }
        } else {
            secondaryDisplay.innerHTML = `${secondaryDisplay.innerHTML}${e.target.innerHTML}`
        }
        secondaryDisplay.classList.remove('dimmed')
        currentOperator = e.target.id
        currentOperatorSymbol = e.target.innerHTML
        currentNumber = ''
    })
})

equalsButton.addEventListener('click', e => {
    if (currentOperator != "equals" && currentNumber != '') {
        currentOperator = e.target.id
        currentOperatorSymbol = e.target.innerHTML
        secondaryDisplay.classList.add('dimmed')
        if (previousNumber == '') {
            previousNumber = currentNumber
            total = previousNumber
            mainDisplayText = total
        } else {
            previousNumber = total
            mainDisplayText = previousNumber
        }
        currentNumber = ''
        if (total.toString().length > 15) {
            console.log(total.length)
            mainDisplay.innerHTML = total.toExponential(10)
        } else {
            mainDisplay.innerHTML = total
        }
    }
})

clearButton.addEventListener('click', e => {
    secondaryDisplay.classList.remove('dimmed')
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

// decimalButton.addEventListener('click', e => {
//      currentNumber = currentNumber + '.'
//     secondaryDisplay.innerHTML = secondaryDisplay.innerHTML + '.'
//     })

const refreshCounter = () => {
    console.log('clicked')
    previousNumberDisplay.innerHTML = 'PreviousNumber = ' + previousNumber
    currentNumberDisplay.innerHTML = 'CurrentNumber = ' + currentNumber
    totalDisplay.innerHTML = 'Total = ' + total

}

document.addEventListener('click', () => {
    refreshCounter()
}
)

