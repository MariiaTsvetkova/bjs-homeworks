"use strict";

function calculateTotalMortgage(percent, contribution, amount, date) {
    if (isNaN(validateNumber(percent))) {

        return `Параметр "Процентная ставка" содержит неправильное значение ${percent}`;
    }

    if (isNaN(validateNumber(contribution))) {

        return `Параметр "Сумма первоначального взноса" содержит неправильное значение ${contribution}`;

    }

    if (isNaN(validateNumber(amount))) {

        return `Параметр "Сумма кредита" содержит неправильное значение ${amount}`;
    } 

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let yearOfPayment = date.getFullYear();
    let monthOfPayment = date.getMonth();
    let numberOfYears = yearOfPayment - currentYear;
    let numberOfMonths = numberOfYears * 12 + (monthOfPayment - currentMonth);

    let loanBody = amount - contribution;
    let p = percent / 100 / 12;
    
    let monthlyPayment = loanBody * (p + p / (((1 + p) ** numberOfMonths) - 1));
    let totalAmount = (monthlyPayment * numberOfMonths).toFixed(2);
    
    
    return totalAmount;
}

function validateNumber(number) {
    if (typeof number === "number") {
        return number;
    } 
    
    return +number;
}

function getGreeting(name) {
    
    if (!name) {
        name = "Аноним";
    }

    let greeting = `Привет, мир! Меня зовут ${name}`;
    console.log(greeting);
    
    return greeting;
}