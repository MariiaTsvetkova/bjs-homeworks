'use strict'

function getResult(a,b,c){
    let d;
    let x = [];

    d = b**2 - 4 * a * c;
    let root = Math.sqrt(d);

    if (d < 0) {
        x = [];
    } else if (d === 0) {
        x.push((-b + root) / (2 * a));
    } else if (d > 0) {
        x.push((-b + root) / (2 * a));
        x.push((-b - root) / (2 * a));
    }

    return x;
}

function getAverageMark(marks){
    let averageMark;
    let sum = 0;

    if (!marks || marks.length === 0) {
        return 0;
    } 
    if (marks.length > 5) {
        console.log("Вы ввели большее количество оценок, чем программа может посчитать. Максимальное количество оценок - 5");
        marks.splice(5);
    }
    for (let i = 0; i < marks.length; i++) {
        sum += marks[i];
    }
    averageMark = sum / marks.length;
    
    return averageMark;
}

function askDrink(name,dateOfBirthday){
    let age = dateOfBirthday.getFullYear();
    let today = new Date().getFullYear();

    if (today - age >= 18) {
        return(`Не желаете ли олд-фэшн, ${name}?`);
    } else {
        return(`Сожалею, ${name}, но я не могу вам продать алкоголь. Могу предложить вам замечательный клюквенный компот!`);
    }

}