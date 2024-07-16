
console.log(parseFloat('') ? true : false);
const MAX_NUMBER_SIZE = 8;
let calc = new Calculator();


const btnContainer = document.querySelector('.btn-container');
const displayValue = document.querySelector('.value');


btnContainer.addEventListener('click', e => { 
    //console.log(e.target);
    const click = e.target;
    if (click.classList.contains('number')) {
        calc.processNumber(click);
    }

    if (click.classList.contains('operation')) {
        calc.processOperation(click);
    }

    if (click.classList.contains('operator')) {
        
    }

})

function Calculator() {
    this.onOperation = false;

    this.num1 = 0; 
    this.num2 = 0;
    this.op = null;


    this.operations = { 
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a + b
    }

    this.calculate = function () {
        
    }

    this.processNumber = function(click) {
        if (this.onOperation()) {
            if (this.num2.toString().length === MAX_NUMBER_SIZE) return;
            this.num2 += click.id;
            this.num2 = parseFloat(this.num2);
            displayValue.innerText = this.num2;
        }
        else {
            if (this.num1.toString().length === MAX_NUMBER_SIZE) return;
            this.num1 += click.id;
            this.num1 = parseFloat(this.num1);
            displayValue.innerText = this.num1;
        }
    }

    this.processOperation = function (click) {
        switch (click.id) {
            case 'AC':
                this.num1 = '0';
                this.num2 = '0';
                this.op = null;
                displayValue.innerText = this.num1;
                break;
            case 'percent':
                if (this.onOperation()) {
                    this.num2 = (parseFloat(this.num2) / 100);
                    displayValue.innerText = this.num2;
                }
                else {
                    this.num1 = (parseFloat(this.num1) / 100);
                    console.log(this.num1);
                    displayValue.innerText = this.num1;
                }
                break;
            
            case 'back':
                if (this.onOperation()) {
                    this.num2 = this.reduceNum(this.num2.toString());
                }
                else {
                    this.num1 = this.reduceNum(this.num1.toString());
                }
                break;
        }
    }

    this.reduceNum = function(num) {
        num = num.slice(0, num.length - 1);
        if (!parseFloat(num)) num = 0;
        displayValue.innerText = num;
        return num;
    }

    this.onOperation = function () {
        return this.op !== null;
    }
}