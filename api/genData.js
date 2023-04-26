function sinGen() {
    //sin от kt
    //Создание объекта. к - коэффициенты, data - рассчитанные данные
    const sin = {
        id: 'sin',
        name: 'Синус',
        k: [], data: [],
    }
    //Генерация и запись коэффициентов в объект k
    for (let k = 1; k <= 3; k++) {
        sin.k = [...sin.k, k];
    }
    //получение коэффициентов из объекта
    let odds = sin.k;
    //Расчет и запись данных
    for (let i = 0; i < 1500; i++) {
        //Создание структуры
        sin.data[i] = {
            t: '', value: {}
        }
        //Указание временной точки
        sin.data[i].t = i;

        //Заполнение рассчитанными данными
        //используем спред оператор, чтобы не перезаписывать старые данные, а дополнять их
        for (let k = 0; k < odds.length; k++) {
            sin.data[i].value = {
                ...sin.data[i].value,
                [odds[k]]: Math.sin(odds[k] * i * 0.01)
            }
        }

    }
    return sin
}

function sinGen5k() {
    //sin от kt
    //Создание объекта. к - коэффициенты, data - рассчитанные данные
    const sin = {
        id: 'sin5k',
        name: 'Синус5',
        k: [], data: [],
    }
    //Генерация и запись коэффициентов в объект k
    for (let k = 1; k <= 1; k++) {
        sin.k = [...sin.k, k];
    }
    //получение коэффициентов из объекта
    let odds = sin.k;
    //Расчет и запись данных
    for (let i = 0; i < 4500; i++) {
        //Создание структуры
        sin.data[i] = {
            t: '', value: {}
        }
        //Указание временной точки
        sin.data[i].t = i;

        //Заполнение рассчитанными данными
        //используем спред оператор, чтобы не перезаписывать старые данные, а дополнять их
        for (let k = 0; k < odds.length; k++) {
            sin.data[i].value = {
                ...sin.data[i].value,
                [odds[k]]: Math.sin(odds[k] * i * 0.01)
            }
        }

    }
    return sin
}

function cosGen() {
    //cos от kt
    //Создание объекта. к - коэффициенты, data - рассчитанные данные
    const cos = {
        id: 'cos',
        name: 'Косинус',
        k: [], data: [],
    }
    //Генерация и запись коэффициентов в объект k
    for (let k = 1; k <= 3; k++) {
        cos.k = [...cos.k, k];
    }
    //получение коэффициентов из объекта
    let odds = cos.k;
    //Расчет и запись данных
    for (let i = 0; i < 70; i++) {
        //Создание структуры
        cos.data[i] = {
            t: '', value: {}
        }
        //Указание временной точки
        cos.data[i].t = i;

        //Заполнение рассчитанными данными
        //используем спред оператор, чтобы не перезаписывать старые данные, а дополнять их
        for (let k = 0; k < odds.length; k++) {
            cos.data[i].value = {
                ...cos.data[i].value,
                [odds[k]]: Math.cos(odds[k] * i * 0.1)
            }
        }

    }
    return cos
}

function cosGen5k() {
    //cos от kt
    //Создание объекта. к - коэффициенты, data - рассчитанные данные
    const cos = {
        id: 'cos5k',
        name: 'Косинус5k',
        k: [], data: [],
    }
    //Генерация и запись коэффициентов в объект k
    for (let k = 1; k <= 3; k++) {
        cos.k = [...cos.k, k];
    }
    //получение коэффициентов из объекта
    let odds = cos.k;
    //Расчет и запись данных
    for (let i = 0; i < 5000; i++) {
        //Создание структуры
        cos.data[i] = {
            t: '', value: {}
        }
        //Указание временной точки
        cos.data[i].t = i;

        //Заполнение рассчитанными данными
        //используем спред оператор, чтобы не перезаписывать старые данные, а дополнять их
        for (let k = 0; k < odds.length; k++) {
            cos.data[i].value = {
                ...cos.data[i].value,
                [odds[k]]: Math.cos(odds[k] * i * 0.1)
            }
        }

    }
    return cos
}


module.exports = () => {
    const data = {
        menu: [{
            name: 'Тригонометрия',
            submenu: [
                {name: 'Синус', id: 1, link: 'trigonometry/sin'},
                {name: 'Косинус', id: 2, link: 'trigonometry/cos'},
            ]
        }, {
            name: 'Производительность',
            submenu: [
                {name: 'Синус5k', id: 3, link: 'trigonometry/sin5k'},
                {name: 'Косинус5k', id: 4, link: 'trigonometry/cos5k'},
            ]
        }
        ],trigonometry: []
    }

    //Тригонометрия
    data.trigonometry.push(sinGen());
    data.trigonometry.push(cosGen());
    data.trigonometry.push(sinGen5k());
    data.trigonometry.push(cosGen5k());

    return data
}

