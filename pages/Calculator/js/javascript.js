








const NONE = "none";
let calc = new Calculator();


const btnContainer = document.querySelector('.btn-container');
const displayValue = document.querySelector('.value');
const MAX_VALUE_LENGTH = 14;

displayValue.addEventListener('custom:lengthChange', e => {
    const valueLength = e.detail.valueLength;
    console.log(valueLength);
    if (valueLength > MAX_VALUE_LENGTH) {
        displayValue.setAttribute('style', 'font-size: 1rem;');
        console.log('set to 1 rem');

    } else {
        displayValue.setAttribute('style', 'font-size: 2rem;');
    }
})





btnContainer.addEventListener('click', e => { 
    const click = e.target;
    if (click.classList.contains('number')) {
        calc.processNumber(click);
        return;
    }

    if (click.classList.contains('operation')) {
        calc.processOperation(click);
        return;
    }

    if (click.classList.contains('operator')) {
        calc.processOperator(click);
        return;
    }

    if (click.classList.contains('special')) {
        calc.processSpecial(click);
        return;
    }

})



btnContainer.addEventListener('click', e => {
    const valueLength = displayValue.innerHTML.length;
    //console.log(valueLength);
    const changeDisplayLength = new CustomEvent('custom:lengthChange', {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
            valueLength,
        }
    });

    displayValue.dispatchEvent(changeDisplayLength);
    
})


function Calculator() {
    
    this.num1 = 0; 
    this.num2 = 0;
    this.op = NONE;
    this.prevTarget;
    this.enteringNumber = false;

    this.operations = { 
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "div": (a, b) => a / b,
        [NONE]: (a, b) => a,
    }

    this.calculate = function (operator) {
        return this.operations[operator](this.num1, this.num2);
    }
    this.makeCalculation = function (operator) {
        if (this.prevTarget) this.prevTarget.classList.remove('active');
        this.num1 = calc.calculate(operator);
        this.num2 = 0;
        this.op = NONE;
        displayValue.innerText = this.num1;
    }

    this.processOperator = function(click) {

        this.enteringNumber = false;
        this.num1 = this.removeOnDot(this.num1);
        this.num2 = this.removeOnDot(this.num2);

        if (click.id === '=') {
            this.makeCalculation(this.op);
            return;
        }

        if (this.onOperation()) {
            this.num2 = this.num1;
            this.makeCalculation(this.op);
            click.classList.add('active');
            this.prevTarget = click;
            this.op = click.id;
        } else {
            click.classList.add('active');
            this.prevTarget = click;
            this.op = click.id;
        }
    }

    this.processNumber = function (click) {
        

        if (this.onOperation()) {
            this.num2 += click.id;
            this.num2 = parseFloat(this.num2); 
            displayValue.innerText = this.num2;
        }
        else {
            if (this.enteringNumber) {
                this.num1 += click.id;
            } else {
                this.num1 = click.id;
                this.enteringNumber = true;
            }
            this.num1 = parseFloat(this.num1);
            displayValue.innerText = this.num1;
        }
    }

    this.processOperation = function (click) {
        switch (click.id) {
            case 'AC':
                this.num1 = '0';
                this.num2 = '0';
                this.op = NONE;
                this.enteringNumber = false;
                if (this.prevTarget) this.prevTarget.classList.remove('active');
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

    this.processSpecial = function (click) {
        switch (click.id) {
            case 'unar':
                if (this.onOperation()) {
                    this.num2 = (parseFloat(this.num2)* -1);
                    displayValue.innerText = this.num2;
                }
                else {
                    this.num1 = (parseFloat(this.num1)* -1);
                    console.log(this.num1);
                    displayValue.innerText = this.num1;
                }
                break;
            case '.':
                if (this.onOperation()) {
                    if (this.containsDot(this.num2)) return;
                    let strNum = this.num2.toString();
                    strNum += '.';
                    this.num2 = strNum;
                    displayValue.innerText = this.num2;
                }
                else {
                    if (this.containsDot(this.num1)) return;
                    let strNum = this.num1.toString();
                    strNum += '.';
                    this.num1 = strNum;
                    displayValue.innerText = this.num1;
                }
                break;
        }
    }


    this.containsDot = function(num){
        return num.toString().includes('.');
    }
    this.removeOnDot = function (num) {
        return parseFloat(num);
    }

    this.reduceNum = function(num) {
        num = parseFloat(num.slice(0, num.length - 1));
        if (!num) num = 0;
        displayValue.innerText = num;
        return num;
    }

    this.onOperation = function () {
        return this.op !== NONE;
    }
}