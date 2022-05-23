window.addEventListener('DOMContentLoaded', (event) => {
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const surnameInput = document.getElementById('surname');
    const deliveryDateInput = document.getElementById('delivery');
    const streetInput = document.getElementById('street');
    const houseNumberInput = document.getElementById('houseNum');
    const flatInput = document.getElementById('flatNum');
    const submitBtn = document.getElementById('submit');

    //regexp for checking string only literals
    var stringCheck = new RegExp('^[a-zA-Z]+$');
    var stringWithNumbers = new RegExp('^[a-zA-Z0-9]+$');
    var onlyNumbers = new RegExp('^[0-9]+$');
    var stringStartsWithNumbers = new RegExp('^[0-9]');
    var stringContainsOnlyNumbersAndDashes = new RegExp('^[0-9-]+$')
        //attaching event handlers
    nameInput.addEventListener('change', function() {
        if (nameInput.value && nameInput.value.length >= 4 && stringCheck.test(nameInput.value)) {
            hideValidation(nameInput);
        } else {
            showValidation(nameInput);
        }
    });
    surnameInput.addEventListener('change', function() {
        if (surnameInput.value && surnameInput.value.length >= 5 && stringCheck.test(surnameInput.value)) {
            hideValidation(surnameInput);
        } else {
            showValidation(surnameInput);
        }
    });
    deliveryDateInput.addEventListener('change', function() {
        const deliveryDate = new Date(deliveryDateInput.value);
        deliveryDate.setHours(0, 0, 0, 0);
        const tomorrow = new Date();
        tomorrow.setHours(0, 0, 0, 0);
        if (tomorrow <= deliveryDate) {
            hideValidation(deliveryDateInput);
        } else {
            showValidation(deliveryDateInput);
        }
    });
    streetInput.addEventListener('change', function() {
        if (streetInput.value && streetInput.value.length >= 5 && stringWithNumbers.test(streetInput.value)) {
            hideValidation(streetInput);
        } else {
            showValidation(streetInput);
        }
    });
    houseNumberInput.addEventListener('change', function() {
        if (houseNumberInput.value && onlyNumbers.test(houseNumberInput.value)) {
            hideValidation(houseNumberInput);
        } else {
            showValidation(houseNumberInput);
        }
    });
    flatInput.addEventListener('change', function() {
        if (flatInput.value && stringStartsWithNumbers.test(flatInput.value) &&
            stringContainsOnlyNumbersAndDashes.test(flatInput.value)) {
            hideValidation(flatInput);
        } else {
            showValidation(flatInput);
        }
    });

    form.addEventListener('change', function() {
        let arr = Array.from(form.querySelectorAll('[isValid]'));
        if (arr.every(a => a.attributes.isValid.value === 'true')) {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', 'disabled');
        }
    });

    submitBtn.addEventListener('click', function() {
        const formData = "The delivery address is: " +
            streetInput.value + " " + houseNumberInput.value + " " + flatInput.value + ". " +
            "Customer is: " + nameInput.value + " " + surnameInput.value + ".";
        localStorage.setItem('orderData', formData);
    });
});

const showValidation = (input) => {
    input.attributes.isValid.value = false;
    input.style.border = "1px solid red";
    const validationMessage = document.getElementById(input.id + "Warning");
    validationMessage.style.display = "block";
}

const hideValidation = (input) => {
    input.attributes.isValid.value = true;
    input.style.border = "none";
    input.style.borderBottom = "1px solid white";
    const validationMessage = document.getElementById(input.id + "Warning");
    validationMessage.style.display = "none";
}