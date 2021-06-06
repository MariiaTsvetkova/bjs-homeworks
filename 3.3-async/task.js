class AlarmClock {
    constructor() {
        this.alarmCollection = new Array();
        this.timerId = null;
    }

    addClock(time, callback, id) {
        if (!this.#checkId(id)) {
            throw new Error('error text');
        }

        let test = this.#findAlarm(id);

        if (this.#findAlarm(id)) {
            console.error();
            return;
        }

        this.alarmCollection.push({
            id,
            time,
            callback
        });
    }

    removeClock(id) {
        let filtered = this.alarmCollection.filter(p => p.id !== id);

        if (filtered.length === this.alarmCollection.length - 1)
        {
            this.alarmCollection = filtered;
            return true;
        }

        return false;
    }

    getCurrentFormattedTime(id) {
        return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    start() {
        if (this.timerId === null) {
            this.timerId = setInterval(() => {
                this.alarmCollection.forEach((alarm) => {
                    this.#checkClock(alarm);
                });
            });
        }
    }

    stop() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms() {
        const header = `Печать всех будильников в количестве: ${this.alarmCollection.length}`;
        console.log(header);

        this.alarmCollection.forEach((item) => {
            console.log(`Будильник №${item.id} заведен на ${item.time}`);
        });
    }

    clearAlarms() {
        stop();
        const length = this.alarmCollection.length;
        this.alarmCollection.splice(0, length);
    }

    #checkClock(currentClock) {
        const date =  Date.now().toLocaleString([], { hour: '2-digit', minute: '2-digit' });
        if (currentClock.time === date) {
            currentClock.callback();
        }
    }

    #findAlarm(id) {
        return this.alarmCollection.some(p => p.id === id);
    }

    #checkId(value) {
        return typeof value === 'number' && !isNaN(value);
    }
}

function testCase() {
    let phoneAlarm = new AlarmClock();
    phoneAlarm.addClock("09:00", () => console.log(`Пора вставать`), 1);
    phoneAlarm.addClock("09:01", () => {
        console.log(`Давай, вставай уже!`);
        phoneAlarm.removeClock(2)
    }, 2);
    phoneAlarm.addClock("09:01", () => console.log(`Иди умываться!`));

    phoneAlarm.addClock("09:02", () => {
       console.log(`Вставай, а то проспишь!`);
       phoneAlarm.clearAlarms();
       phoneAlarm.printAlarms();
    }, 3);

    phoneAlarm.addClock("09:05", () => console.log("Вставай, а то проспишь!"), 1);

    phoneAlarm.printAlarms();

    phoneAlarm.start();
}
