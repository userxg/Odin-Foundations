
document.addEventListener('DOMContentLoaded', () => {
    

    const form = document.querySelector('#registrationForm');
    const firstName = document.querySelector('#first_name');
    const lastName = document.querySelector('#last_name');
    const email = document.querySelector('#email');
    const phone = document.querySelector('#number');
    const pwd = document.querySelector('#pwd');
    const confirmPwd = document.querySelector('#confirm-pwd');

    const formInputs = Array.from(form.elements).filter(item => {
        return item.tagName === 'INPUT';
    });
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            clearError(input);
        });
    })


    function clearError(input) {
        console.log('clear')
        input.classList.remove('error-input');
        //input.classList.remove('error-input');
        input.nextElementSibling.textContent = '';
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        checkInputs();
        console.log('submit');
    })

    firstName.addEventListener('input', () => {
        validateField(firstName, [
            {
                validation: (new RegExp(firstName.pattern)).test(firstName.value.trim()),
                errorMessage: 'Name is not valid'
            },
            {
                validation: firstName.value.trim().length >= 3,
                errorMessage: 'Name is too short'
            },
            
             {
                validation: firstName.value.trim() !== '',
                errorMessage: 'Name connot be blank'
            },

        ]);

    })

    lastName.addEventListener('input', () => {
        validateField(lastName, [
            {
                validation: (new RegExp(lastName.pattern)).test(lastName.value.trim()),
                errorMessage: 'surname is not valid'
            },
            {
                validation: lastName.value.trim().length >= 3,
                errorMessage: 'surname is too short'
            },
            {
                validation: lastName.value.trim() !== '',
                errorMessage: 'surname connot be blank'
            },

        ]);

    })

    email.addEventListener('input', () => {
        validateField(email, [
            {
                validation: (new RegExp(email.pattern)).test(email.value.trim()),
                errorMessage: 'Name is not valid'
            },
            {
                validation: email.value.trim() !== '',
                errorMessage: 'Name connot be blank'
            },
        ]);
    })

    phone.addEventListener('input', () => {
        validateField(phone, [
            {
                validation: (new RegExp(phone.pattern)).test(phone.value.trim()),
                errorMessage: 'Name is not valid'
            },
            {
                validation: email.value.trim() !== '',
                errorMessage: 'Name connot be blank'
            },
        ]);
    })    


    pwd.addEventListener('input', () => {
        checkPasswordsMatch();
        validateField(pwd, [
            {
                validation: pwd.value.trim().length >= 6,
                errorMessage: 'Password is too short'
            },
            {
                validation: pwd.value.trim() !== '',
                errorMessage: 'Password connot be blank'
            },
        ]);

    })

    confirmPwd.addEventListener('input', () => {
        checkPasswordsMatch();
        validateField(confirmPwd, [
            {
                validation: confirmPwd.value.trim() !== '',
                errorMessage: 'Confirm password connot be blank'
            },
        ]);


    })


    function checkPasswordsMatch() {
        if (pwd.value === confirmPwd.value) {
            setSuccess(pwd);
            setSuccess(confirmPwd);
        } else {
            pwd.classList.add('error-input');
            pwd.nextElementSibling.textContent = 'passwords don`t match';
            pwd.classList.remove('success-input');
            confirmPwd.classList.add('error-input');
            confirmPwd.classList.remove('success-input');
        }
    }



    function checkInputs() {
        let isValid = true;
        const event = new Event('input');
        firstName.dispatchEvent(event);
        lastName.dispatchEvent(event);
        email.dispatchEvent(event);
        phone.dispatchEvent(event);
        pwd.dispatchEvent(event);
        confirmPwd.dispatchEvent(event);


        document.querySelectorAll('input-box').forEach(formBox => {
            if (formBox.querySelector('input').classList.contains('error-input')) {
                return;
            }
        })
    }

    function validateField(input, checkErrorArray) {
        let isSuccess = true;
        checkErrorArray.forEach(errorToCheck => {
            if (!errorToCheck.validation) {
                input.classList.add('error-input');
                input.nextElementSibling.textContent = errorToCheck.errorMessage;
                isSuccess = false;
                input.classList.remove('success-input');
            }
        }
        )
        if (isSuccess) {
            setSuccess(input);
        }
    }

    function setSuccess(input) {
        input.classList.remove('error-input');
        input.classList.add('success-input');
        input.nextElementSibling.textContent = '';
    }

    

})




