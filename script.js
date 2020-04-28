let calculator = {
    currentResult: '0',
    firstValue: null,
    waitingForSecondValue: false,
    operator: null,
};

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const updateDisplay = () => {
    const resultScreen = document.getElementById('result');
    resultScreen.textContent = calculator.currentResult;
};

const clear = () => {
    (calculator.firstValue = null),
        (calculator.waitingForSecondValue = true),
        (calculator.operator = null),
        (calculator.currentResult = '0'),
        updateDisplay();
};

const operate = (digit1, digit2, op) => {
    // Figure out the type of operation we're doing and call that function
    console.log(digit1, digit2, op);

    switch (op) {
        case '+':
            console.log('addition');
            calculator.currentResult = add(digit1, digit2);
            break;
        case '-':
            console.log('subtraction');
            calculator.currentResult = subtract(digit1, digit2);
            break;
        case '*':
            console.log('multiplication');
            calculator.currentResult = multiply(digit1, digit2);
            break;
        case '/':
            console.log('division');
            calculator.currentResult = divide(digit1, digit2);
            break;
    }
    updateDisplay(calculator.currentResult);
    calculator.firstValue = calculator.currentResult;
    calculator.secondValue = null;
    calculator.operator = null;
};

const getDigit = (digit) => {
    const { currentResult } = calculator;
    if (calculator.waitingForSecondValue === true) {
        calculator.currentResult = digit;
        calculator.waitingForSecondValue = false;
    } else {
        calculator.currentResult =
            currentResult === '0' ? digit : currentResult + digit;
    }
    console.log(calculator);
};

const inputDecimal = (dot) => {
    // If the `currentResult` does not contain a decimal point
    if (!calculator.currentResult.includes(dot)) {
        // Append the decimal point
        calculator.currentResult += dot;
    }
};

const getOperator = (nextOperator) => {
    const { firstValue, currentResult, operator } = calculator;
    const inputValue = parseFloat(currentResult);

    if (firstValue === null) {
        calculator.firstValue = inputValue;
    }

    calculator.waitingForSecondValue = true;
    calculator.operator = nextOperator;
    console.log(calculator);
};

// Grab a nodelist from all of the number buttons.
const numbers = document.querySelectorAll('.number-btn');
//(e.target.dataset.key)
numbers.forEach((number) =>
    number.addEventListener('click', (e) => {
        getDigit(e.target.dataset.key);
        updateDisplay();
    })
);

const decimalButton = document.querySelector('.decimal-btn');
decimalButton.addEventListener('click', (e) => {
    inputDecimal(e.target.dataset.key);
    updateDisplay();
});

// Grab a nodelist from all of the operator buttons.
const operators = document.querySelectorAll('.operator-btn');
operators.forEach((operator) =>
    operator.addEventListener('click', (e) => {
        getOperator(e.target.dataset.key);
        updateDisplay();
    })
);

const equalsButton = document.querySelector('.equals-btn');
equalsButton.addEventListener('click', () => {
    operate(
        parseFloat(calculator.firstValue),
        parseFloat(calculator.currentResult),
        calculator.operator
    );
});

const clearButton = document.querySelector('.clear-btn');
clearButton.addEventListener('click', () => {
    clear();
});
