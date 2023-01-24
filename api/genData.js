function sin() {
    //sin от kt
    //Создание объекта. к - коэффициенты, data - рассчитанные данные
    sin = {
        name: 'Синус',
        k: [],
        data: [],
    }
    //Генерация и запись коэффициентов в объект k
    for (let k = 1; k <= 3; k++) {
        sin.k = [...sin.k, k*2];
    }
    //получение коэффициентов из объекта
    let odds = sin.k;
    //Расчет и запись данных
    for (let i = 0; i < 20; i++) {
        //Создание структуры
        sin.data.push({
            t: '', value: []
        })
        //Указание временной точки
        sin.data[i].t = i;

        //Заполнение рассчитанными данными
        //используем спред оператор, чтобы не перезаписывать старые данные, а дополнять их
        for (let k = 0; k < odds.length; k++) {
            sin.data[i].value.push(Math.sin(odds[k] * i))
        }

    }
    return sin
}

function cos() {
    //cos от kt
    //Создание объекта. к - коэффициенты, data - рассчитанные данные
    cos = {
        name: 'Консинус',
        k: [], data: [],
    }
    //Генерация и запись коэффициентов в объект k
    for (let k = 1; k <= 3; k++) {
        cos.k = [...cos.k, k];
    }
    //получение коэффициентов из объекта
    let odds = cos.k;
    //Расчет и запись данных
    for (let i = 0; i < 20; i++) {
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
                [odds[k]]: Math.cos(odds[k] * i)
            }
        }

    }
    return cos
}


module.exports = () => {
    const data = {
        menu: [], trigonometry: []
    }

    //Тригонометрия
    data.trigonometry.push(sin());
    data.trigonometry.push(cos());

    return data
}