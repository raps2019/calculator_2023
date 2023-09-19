const divide = (num1, num2) => {
    return parseFloat(num1) / parseFloat(num2)
}

const multiply = (num1, num2) => {
    return parseFloat(num1) * parseFloat(num2)
}

const subtract = (num1, num2) => {
    return parseFloat(num1) - parseFloat(num2)
}

const add = (num1, num2) => {
    return parseFloat(num1) + parseFloat(num2)
}

const opposite = (num) => {
    return num * -1
}

const operate = (operator, num1, num2) => {
    switch (operator) {
        case "divide":
            return divide(num1, num2)
            break;
        case "multiply":
            return multiply(num1, num2)
            break;
        case "subtract":
            return subtract(num1, num2)
            break;
        case "add":
            return add(num1, num2)
            break;
        case "opposite":
            return opposite(num1)
            break;
    }
}

export { divide, multiply, subtract, add, opposite, operate }

