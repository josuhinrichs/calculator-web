const numericButtons = document.querySelectorAll('.numeric');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');

let displayValue = document.querySelector('.screen-result');
const equation = {
    number:[],
    operation:[],
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a/b;
}

function percent(a, b) {
    return (a / 100) * b;
}

function operate(operator, a, b) {
    switch(operator){
        case 'add':
            return add(a,b);
        case 'subtract':
            return subtract(a,b);
        case 'multiply':
            return multiply(a,b);
        case 'divide':
            return divide(a,b);
        default:
            return percent(a,b);
    }
}

function executeOperation() {
    const operations = equation.operation;
    const numbers = equation.number;
    while(operations.length != 0){
        for(let i=0; i<operations.length; i++){
            console.log(numbers);
            if(operations.includes('%') == true){
                if(operations[i] == '%'){
                    numbers[i] = operate('percent', numbers[i], numbers[i+1]);
                    operations.splice(i,1);
                    numbers.splice(i+1,1);
                } else continue;
            }
            if(operations.includes('/') == true){
                if(operations[i] == '/'){
                    numbers[i] = operate('divide', numbers[i], numbers[i+1]);
                    operations.splice(i,1);
                    numbers.splice(i+1,1);
                } else continue;
            }
            if(operations.includes('*') == true){
                if(operations[i] == '*'){
                    numbers[i] = operate('multiply', numbers[i], numbers[i+1]);
                    operations.splice(i,1);
                    numbers.splice(i+1,1);
                } else continue;
            }
            if(operations.includes('-') == true){
                if(operations[i] == '-'){
                    numbers[i] = operate('subtract', numbers[i], numbers[i+1]);
                    operations.splice(i,1);
                    numbers.splice(i+1,1);
                } else continue;
            }
            if(operations[i] == '+'){
                numbers[i] = operate('add', numbers[i], numbers[i+1]);
                operations.splice(i,1);
                numbers.splice(i+1,1);
            }
            
        }
    }
    numbers[0] = Math.round(numbers[0] * 10000) / 10000;
    displayValue.textContent = numbers[0];
    equation.number = [];
}

numericButtons.forEach( item => {
    item.addEventListener('click', e => {
        if(e.target.dataset.key == '.') {
            if(displayValue.textContent.includes('.') == true) {
                return;
            }
        }

        if(displayValue.textContent === '0'){
            displayValue.textContent = e.target.dataset.key;;
        } else { displayValue.textContent = displayValue.textContent + e.target.dataset.key; }
        
    });
});

operationButtons.forEach( item => {
    item.addEventListener('click', e =>{
        equation.number.push( +displayValue.textContent );
        if(e.target.dataset.key != '=') { 
            equation.operation.push( e.target.dataset.key );
        }
        displayValue.textContent = 0;
        console.log(equation.operation);
        console.log(equation);
    });
});

equalsButton.addEventListener('click', executeOperation);

clearButton.addEventListener('click', e => {
    equation.number = [];
    equation.operation = [];
    displayValue.textContent = '0';
});

deleteButton.addEventListener('click', e => {
    console.log(displayValue.textContent);
    if(displayValue.textContent > 2) {displayValue.textContent = displayValue.textContent.slice(0, -1)
        console.log(displayValue.textContent);
    } else {
        displayValue.textContent = '0';
    }
});

