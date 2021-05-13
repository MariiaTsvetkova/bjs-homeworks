String.prototype.isPalindrome = function () {
    const caseInsensitive = this.valueOf().replace(/\s/g, '').toLowerCase();
    return caseInsensitive === reverseString(caseInsensitive);
}

function reverseString(str) {
    return str.split("").reverse().join("");
}

function getAverageMark(marks) {
    if (!arrayCheck(marks)) {
        console.log('Marks is not valid');
        return;
    }

    if (marks.length === 0)
    {
        return 0;
    }

    const minGrade = 1;
    const maxGrade = 5;

    let count = 0;
    let amount = 0;
    marks.forEach(item => {
        if (gradeCheck(item, minGrade, maxGrade)) {
            amount += item;
            count++;
        }
    });

    return Math.round(amount / count);
}

function arrayCheck(value) {
    return Array.isArray(value);
}

function isNumber(number) {
    return typeof number === 'number' && !isNaN(number);
}

function gradeCheck(value,min, max) {
    return isNumber(value) && value >= min && value <= max;
}

Date.prototype.getDateFromString = function (str) {
    let arr = str.split('-');

    if (arr.length !== 3) {
        console.log('Date is not valid');
        return null;
    }

    const year = +arr[0];
    const month = +arr[1] - 1;
    const day = +arr[2];

    if (!validateYear(year) ||
        !validateMonth(month) ||
        !validateDate(day)) {
        console.log('Date is not valid');
        return null;
    }

    const date = new Date();
    date.setFullYear(+arr[0]);
    date.setMonth(+arr[1] - 1);
    date.setDate(+arr[2]);

    return +date;
}

function validateYear(year) {
    return isNumber(year) && year >= 1970;
}

function validateMonth(month) {
    return isNumber(month) && month >= 0 && month <= 11 ;
}

function validateDate(date) {
    return isNumber(date) && date >= 1 && date <= 31 ;
}

function checkBirthday(birthday) {
    const millisecondsInYear = 31557600000;
    const now = Date.now();
    const date = new Date().getDateFromString(birthday);

    if (date === null) {
        return false;
    }

    const result = (now - date) / millisecondsInYear;

    return result > 18;
}
