const numericButtons = document.querySelectorAll('.numeric');
const operationButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');

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
    return a / b;
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
        case divide:
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
                    console.log(numbers[i]);
                    operations.splice(i,1);
                    numbers.splice(i+1,1);
                } else continue;
            }
            if(operations.includes('/') == true){
                if(operations[i] == '/'){
                    numbers[i] = operate('divide', numbers[i], numbers[i+1]);
                    console.log(numbers[i]);
                    operations.splice(i,1);
                    numbers.splice(i+1,1);
                } else continue;
            }
            if(operations.includes('*') == true){
                if(operations[i] == '*'){
                    numbers[i] = operate('multiply', numbers[i], numbers[i+1]);
                    console.log(numbers[i]);
                    operations.splice(i,1);
                    numbers.splice(i+1,1);
                } else continue;
            }
            if(operations.includes('-') == true){
                if(operations[i] == '-'){
                    numbers[i] = operate('subtract', numbers[i], numbers[i+1]);
                    console.log(numbers[i]);
                    operations.splice(i,1);
                    numbers.splice(i+1,1);
                } else continue;
            }
            if(operations[i] == '+'){
                numbers[i] = operate('add', numbers[i], numbers[i+1]);
                console.log(numbers[i]);
                operations.splice(i,1);
                numbers.splice(i+1,1);
            }
            
        }
    }
    displayValue.textContent = numbers[0];
}

numericButtons.forEach( item => {
    item.addEventListener('click', e => {
        if(e.target.dataset.key == '.') {
            if(displayValue.textContent.includes('.') == true) {
                return;
            }
        }
        displayValue.textContent = displayValue.textContent + e.target.dataset.key;
        //console.log(e.target);
    });
});

operationButtons.forEach( item => {
    item.addEventListener('click', e =>{
        equation.number.push( +displayValue.textContent );
        if(e.target.dataset.key != '=') { 
            equation.operation.push( e.target.dataset.key );
        }
        displayValue.textContent = 0;
        //console.log(equation.number);
        console.log(equation.operation);
    });
});

equalsButton.addEventListener('click', executeOperation);

