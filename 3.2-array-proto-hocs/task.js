const weapons = [new Knife(), new Staff(), new Axe(), new StormStaff(), new LongBow(), new Bow()];

function getNames() {
    return weapons.map(p => p.name);
}

function getCountReliableWeapons(value) {
    return weapons.filter(p => p.durability > value).length;
}

function hasReliableWeapons(value) {
    return weapons.some(p => p.durability > value);
}

function getReliableWeaponsNames(value) {
    return weapons.filter(p => p.durability > value).map(p => p.name);
}

function getTotalDamage() {
    return weapons.reduce((accumulator, item) => {
        return accumulator + item.attack;
    }, 0);
}

function getValuestCountToSumValues(array, value) {
    let count = 0;
    let accumulator = 0;

    array.every((num) => {
        count++;
        accumulator += num;

        if (accumulator >= value) {
            return false;
        }

        return true;
    });

    return count;
}


function sleep(milliseconds)
{
    let e = new Date().getTime() + milliseconds;
    while (new Date().getTime() <= e) {}
}

function sum(...args) {
    sleep(100);
    return args.reduce((sum, arg) => {
        return sum += +arg;
    }, 0);
}

function compareArrays(arr1, arr2) {
    if (!Array.isArray(arr1) || !Array.isArray(arr2))
        return false;

    if (arr1.length !== arr2.length)
        return false;

    let index = 0;

    return arr1.every((value) => {
        if (arr2[index] !== value)
            return false;
        index++;
        return true;
    });
}

function memorize(fn, limit) {
    const memory = [];
    return (...args) => {
        let current = memory.find(p => compareArrays(p.args, args));
        if(typeof current !== 'undefined') {
            console.log(`Значение взято из памяти`);
            return current.result;
        }

        const item = {
            args: args,
            result: fn(...args)
        };

        if(memory.length === limit) {
            console.log(`Количество объектов в памяти максимальное: ${limit}`);
            memory.pop();
        }

        memory.unshift(item);

        console.log(`Функция вызвана не из памяти`);
        return item.result;
    };
}
