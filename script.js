let selectedEntry = 0;

const result = document.getElementById('result');

const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const operate = (a, b, op) => {};

// Grab a nodelist from all of the number buttons.
const numbers = document.querySelectorAll('.number-btn');
//operate(e.target.dataset.key)
numbers.forEach((number) =>
    number.addEventListener(
        'click',
        (e) => (result.textContent = parseInt(e.target.dataset.key))
    )
);
