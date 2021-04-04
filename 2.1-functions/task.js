// Задача 1

function getSolutions(a, b, c) {
    let D = b ** 2 - 4 * a * c;
    let x1;
    let x2;

    if (D < 0) {
        return {
            D, 
            roots: [],
        };
    } if (D === 0) {
        x1 = -b / (2 * a);
        return {
            D,
            roots: [x1],
        };
    } if (D > 0) {
        x1 = (-b + Math.sqrt(D)) / (2 * a);
        x2 = (-b - Math.sqrt(D)) / (2 * a);
        return {
            D,
            roots: [x1, x2],
        };
    };
};

function showSolutionsMessage(a, b, c) {
    if (!validateNumber(a) || !validateNumber(b) || !validateNumber(c)) {
        console.log("Некорректно введены данные.");
        return;
    }

    let result = getSolutions(a, b, c);
    console.log(`Вычисляем корни квадратного уравнения ${a}x\u00B2 + ${b}x + ${c}`);
    console.log(`Значение дискриминанта: ${result.D}`);
    if (result.roots.length === 0) {
        console.log(`Уравнение не имеет вещественных корней`);
    } if (result.roots.length === 1) {
        console.log(`Уравнение имеет один корень X\u2081 = ${result.roots[0]}`);
    } if (result.roots.length === 2) {
        console.log(`Уравнение имеет два корня. X\u2081 = ${result.roots[0]}, X\u2082 = ${result.roots[1]}`);
    }
};

function validateNumber(value) {
    return typeof value === "number" && !isNaN(value) 
}


// Задача 2

function getAverageScore(data = {}) {  // Делаем data объектом по умолчанию на случай, если не передадут параметров вообще, чтобы выводил  average = 0

    let result = {};  // Создаем пустой объект, в который затем будем добавлять предметы, среднюю оценку по каждому и общую среднюю оценку
    
    let numberOfSubjects = Object.keys(data).length; // Считаем количество предметов

    if (numberOfSubjects === 0) {    // Проверяем объект на пустоту
        return result = {average: 0}; 
    }

    let sumOfMarks = 0; // Переменная для суммы средних оценок по всем предметам
    for (let subject in data) {  // Перебираем свойства в объекте data, чтобы достать оттуда предметы
       result[subject] = getAverageMark(data[subject]); // Добавляем в result предметы и среднии оценки по ним 
        sumOfMarks += getAverageMark(data[subject]); // Считаем сумму всех средних оценок
    }
     
    result.average = sumOfMarks / numberOfSubjects; // Добавляем среднюю оценку по всем предметам

    return result;
    
};

function getAverageMark(marks) {        // Считает среднюю оценку по каждому предмету
    if (marks.length === 0) {           // Если в marks передали пустой массив
        return 0;
    }
    let sum = 0;
    for (let i = 0; i < marks.length; i++) {
        sum += marks[i];
    }
    return sum / marks.length;
};


// Задача 3

function getPersonData(secretData) {
    let result = {};  // Создаем пустой объект, который будет выводить результат
    
    let values = Object.values(secretData); // Возвращаем массив элементов: значения в объекте secretData
    
    result.firstName = getDecodedValue(values[0]); // Добавляю в объект result первый ключ 
    result.lastName = getDecodedValue(values[1]);

    return result;
};

function getDecodedValue(secret) {

    return (secret === 0) ? "Родриго" : "Эмильо";
}