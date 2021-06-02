function parseCount(number) {
    const result = Number.parseInt(number);

    if (isNaN(result)) {
        throw new Error('Невалидное значение');
    }
    return result;
}

function validateCount(number) {
    try {
        return parseCount(number);
    }
    catch (error) {
        return error;
    }
}


class Triangle {
    constructor(a, b , c) {
        if (!this.#validateParameters(a, b, c)) {
            throw new Error('Треугольник с такими сторонами не существует');
        }

        this.a = a;
        this.b = b;
        this.c = c;
    }

    getPerimeter() {
        return this.a + this.b + this.c;
    }

    getArea() {
        const p = this.getPerimeter() / 2;
        const valueUnderSqrt = p * (p - this.a) * (p - this.b) * (p - this.c);
        const area = Math.sqrt(valueUnderSqrt);
        const result = this.#round(area, 3);

        return result;
    }

    #round(value, precision) {
        const multiplier = 10 ** precision;
        return Math.round(value * multiplier) / multiplier;
    }

    #validateNumber(value) {
        return typeof value === 'number' &&
            !isNaN(value) &&
            isFinite(value);
    }

    #validateNumbers(a, b ,c) {
        return this.#validateNumber(a) &&
        this.#validateNumber(b) &&
        this.#validateNumber(c);
    }

    #validateEdges(a, b ,c) {
        return a < b + c &&
            b < a + c &&
            c < a + b;
    }

    #validateParameters(a, b, c) {
        return this.#validateNumbers(a, b, c) &&
            this.#validateEdges(a, b ,c);
    }
}

function getTriangle(a, b, c) {
    try {
        return new Triangle(a, b, c);
    }
    catch (error) {
        const msg = 'Ошибка! Треугольник не существует';
        return {
            getArea() {
                return msg;
            },

            getPerimeter() {
                return msg;
            }
        }
    }
}
