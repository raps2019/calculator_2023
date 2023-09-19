import { divide, multiply, subtract, add, opposite, operate } from './operators.js'

let numberButtons = document.querySelectorAll('.numberButton')
let operatorButtons = document.querySelectorAll('.operatorButton')
let equalsButton = document.querySelector('.equalsButton')
let mainDisplay = document.querySelector('.mainDisplay')
let secondaryDisplay = document.querySelector('.secondaryDisplay')
let secondaryDisplayText = ""
// let numbersArray = []
// let operatorsArray = []
let currentNumber = ""
let previousNumber = ""
let total = ""
let currentOperator = ""
let mainDisplayText = ""

numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        if (currentOperator == "equals") {
            mainDisplayText = ""
            mainDisplay.innerHTML = ""
            currentOperator = ""
        }
        currentNumber = `${currentNumber}${e.target.id}`
        mainDisplayText = mainDisplayText+e.target.id
        mainDisplay.innerHTML = mainDisplayText
        console.log("currentNumber: " + currentNumber)
        console.log("previousNumber: " + previousNumber)


        if (previousNumber != "") {
            console.log("Running")

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
            console.log(total)

            secondaryDisplay.innerHTML = total
        }
    });
})

operatorButtons.forEach(button => {
    button.addEventListener('click', e => {
        currentOperator = e.target.id
        mainDisplayText = mainDisplayText+e.target.innerHTML
        mainDisplay.innerHTML = mainDisplayText
        if (previousNumber == "") {
            previousNumber = currentNumber
            currentNumber = ""
            console.log(currentOperator)
        } else {
            previousNumber = total;
            currentNumber = ""
        }
        // if (previousNumber == "") {
            //     previousNumber = currentNumber
            //     // currentNumber = ""
            // } else {
                //     total = previousNumber * currentNumber
                //     secondaryDisplay.innerHTML = total
                // }
                // previousNumber = currentNumber;
                // currentNumber = ""
                
                // if (mainDisplay.innerHTML !== '') {
                    //     numbersArray.push(mainDisplay.innerHTML)
                    //     secondaryDisplay.innerHTML = `${secondaryDisplay.innerHTML} ${mainDisplay.innerHTML} ${e.target.innerHTML}`
                    //     // secondaryDisplay.innerHTML = secondaryDisplayText
                    //     mainDisplay.innerHTML = ''
                    //     operatorsArray.push(e.target.id)
                    //     console.log(numbersArray)
                    //     console.log(operatorsArray)
                    // }
                })
            })
            
            equalsButton.addEventListener('click', e => {
                currentOperator = e.target.id
                secondaryDisplay.innerHTML = mainDisplayText 
                mainDisplayText = total
                mainDisplay.innerHTML = mainDisplayText
                currentNumber = ""
                previousNumber = "total"
            } )

