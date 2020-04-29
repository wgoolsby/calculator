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
    //todo update this to handle active state buttons
};

const clear = () => {
    (calculator.firstValue = null),
        (calculator.waitingForSecondValue = true),
        (calculator.operator = null),
        (calculator.currentResult = '0');
};

const operate = () => {
    // Figure out the type of operation we're doing and call that function
    const { firstValue, currentResult, operator } = calculator;

    const existingValue = parseFloat(currentResult);

    switch (operator) {
        case '+':
            return add(firstValue, existingValue);
        case '-':
            return subtract(firstValue, existingValue);
        case '*':
            return multiply(firstValue, existingValue);
        case '/':
            return divide(firstValue, existingValue);
    }
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
};

const inputDecimal = (dot) => {
    if (calculator.waitingForSecondValue === true) return;

    // If the `currentResult` does not contain a decimal point
    if (!calculator.currentResult.includes(dot)) {
        // Append the decimal point
        calculator.currentResult += dot;
    }
};

const handleOperator = (nextOperator) => {
    const { firstValue, currentResult, operator } = calculator;
    const inputValue = parseFloat(currentResult);

    if (operator && calculator.waitingForSecondValue) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstValue === null) {
        calculator.firstValue = inputValue;
    } else if (operator) {
        calculator.firstValue = operate();
        calculator.currentResult = String(calculator.firstValue);
        updateDisplay();
    }

    calculator.waitingForSecondValue = true;
    calculator.operator = nextOperator;
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
        handleOperator(e.target.dataset.key);
        updateDisplay();
    })
);
// This seems bad.
const equalsButton = document.querySelector('.equals-btn');
equalsButton.addEventListener('click', () => {
    handleOperator();
    updateDisplay();
});

const clearButton = document.querySelector('.clear-btn');
clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});
