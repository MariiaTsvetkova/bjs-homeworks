
class PrintEditionItem {
    #state

    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    fix() {
        this.state = this.#state *= 1.5;
    }

    set state(value) {
        if (!this.#isNumber(value)) {
            throw new Error("State should be a number");
        }

        if (value < 0) {
            this.#state = 0;
            return;
        }

        if (value > 100) {
            this.#state = 100;
            return;
        }

        this.#state = value;
    }

    get state() {
        return this.#state;
    }

    #isNumber(value) {
        return typeof(value) === 'number' && !isNaN(value);
    }
}

class Magazine extends PrintEditionItem{
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem{
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "book";
    }
}

class NovelBook  extends Book{
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "novel";
    }
}class FantasticBook  extends Book{
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "fantastic";
    }
}class DetectiveBook  extends Book{
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = "detective";
    }
}


class Library {
    constructor(name) {
        this.name = name;
        this.books = new Array();
    }

    addBook(book) {
        this.#validateBook(book);

        if (book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(type, value) {   
        for (let book of this.books)
        {
            if (this.#isBookAppropriate(book, type, value)) {
                return book;
            }
        }
        return null;
    }

    giveBookByName(bookName) {
        const type = 'name'
        const booksAmount = 1;
        let book = this.findBookBy(type, bookName);

        if (book === null) {
            return null;
        }

        let index = this.books.indexOf(book);

        return this.books.splice(index, booksAmount)[0];
    }


    #isBookAppropriate(book, type, value) {
        return this.#readProperty(book, type) === value;
    }

    #readProperty(object, property) {
        return object[property];
    }

    #validateBook(book) {
        if (!book instanceof PrintEditionItem) {
            throw new Error("Invalid argument: book should be instance of  PrintEditionItem");
        }
    }
}

class StudentLog {
    #name;
    #subjects;

    constructor(name) {
        this.#name = name;
        this.#subjects = new Array();
    }

    getName() {
        return this.#name
    }

    addGrade(grade, subject) {
        let concreteSubject = this.#getSubjectOrDefault(subject);

        try{
            if (concreteSubject === null) {
                return this.#addNewSubject(subject, grade);
            }

            concreteSubject.addGrade(grade);
            return concreteSubject.getCountOfGrades();
        }
        catch (error) {
            return `Вы пытались поставить оценку "${grade}" по предмету "${subject}". 
            Допускаются только числа от 1 до 5.`;
        }
    }

    getAverageBySubject(subject) {
        let concreteSubject = this.#getSubjectOrDefault(subject);

        if (concreteSubject === null) {
            return 0;
        }

        return concreteSubject.getAverage();
    }

    getTotalAverage() {
        const length = this.#subjects.length;
        if (length === 0) {
            return 0;
        }

        let summaryAverages = 0;
        this.#subjects.forEach(subject => {
           summaryAverages += subject.getAverage();
        });

        return summaryAverages / length;
    }

    #getSubjectOrDefault(subjectName) {
        for (let subject of this.#subjects) {
            if (subject.name === subjectName) {
                return subject;
            }
        }

        return null;
    }

    #addNewSubject(subjectName, grade) {
        const subject = new Subject(subjectName);
        this.#subjects.push(subject);
        subject.addGrade(grade);

        return subject.getCountOfGrades();
    }
}

class Subject {
    #name;
    #grades;

    constructor(name) {
        this.name = name;
        this.#grades = new Array();
    }

    get name() {
        return this.#name;
    }

    set name(name) {
        this.#name = name;
    }

    addGrade(grade) {
        if (this.#validateGrade(grade)) {
            this.#grades.push(grade);
        }
    }

    getCountOfGrades() {
        return this.#grades.length;
    }

    getAverage() {
        const length = this.#grades.length;

        return length === 0 ?
            0 : this.#getSumOfGrades() / length;
    }

    #getSumOfGrades() {
        let result = 0;
        this.#grades.forEach(grade => {
            result += grade;
        });
        return result;
    }

    #validateGrade(grade) {
        const isValid = typeof(grade) === 'number' && grade >=1 && grade <= 5;

        if (isValid) {
            return true;
        }

        throw new Error('Grade should be a number between 1 and 5');
    }
}
