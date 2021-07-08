'use strict'

const buttons = document.querySelectorAll('.number');
const operator = document.querySelector('.operator');
const operators = document.querySelectorAll('.operators');
let input = document.querySelector('.input-number');
var is_operating = false;
var numbers = {
    1: '0',
    2: '0'
};

var number_operation = 1;

var number_input = ''
if (input.textContent == '0'){
    var number_input = ''
}

buttons.forEach( element => {
    element.addEventListener('click',function(){
        let number_selected = element.textContent;

        numbers[number_operation] = numbers[number_operation] + number_selected;

        input.textContent = delete_zero(numbers[number_operation]);
    });
})

operators.forEach( element => {
    element.addEventListener('click',function(){
        if (numbers[1] != '0') {
            operator.textContent = element.textContent;
            number_operation = 2;
            input.textContent = '0';
            is_operating = true;
        }
    });
})

document.getElementById('delete').addEventListener('click',function(){
    numbers[number_operation] = numbers[number_operation].substr(0,numbers[number_operation].length -1);

    if (numbers[number_operation].length == 0) {
        numbers[number_operation] = '0';
    }

    input.textContent = delete_zero(numbers[number_operation]);
});

document.getElementById('equals').addEventListener('click',function(){
    if (is_operating) {
        let number1 = transform_number(numbers[1]);
        let number2 = transform_number(numbers[2]);
        let result = 0;
        switch (operator.textContent) {
            case '+':
                result = number1 + number2;
                break;
        
            case '-':
                result = number1 -number2;
                break;

            case 'x':
                result = number1 * number2;
                break;

            case '/':
                result = number1 / number2;
                break;
            default:
                break;
        }

        input.textContent = result;
        numbers[1] = result.toString();
        numbers[2] = '0';
        is_operating = false;
        operator.textContent = '';
        number_operation = 1;
    }
});

document.getElementById('reset').addEventListener('click',function () {
    numbers[1] = '0';
    numbers[2] = '0';
    is_operating = false;
    operator.textContent = '';
    input.textContent = '0';
    number_operation = 1;
})


function delete_zero(number_string){
    let index = number_string.search('0');

    if (index == 0 && number_string.length > 1 && number_string.search('.') != -1) {
        return number_string.substr(1);
    }

    return number_string;
}

function transform_number(number){
    if (number.toString().search('.') != -1) {
        return Number.parseFloat(number);
    }

    return Number(number);
}
