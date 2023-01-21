function sin(data) {
    //sin от kt
    //Создание объекта. к - коэффициенты, data - рассчитанные данные
    data.trigonometry.sin = {
        k: [], data: [],
    }
    //Генерация и запись коэффициентов в объект k
    for (let k = 1; k <= 3; k++) {
        data.trigonometry.sin.k = [...data.trigonometry.sin.k, k];
    }
    //получение коэффициентов из объекта
    let odds = data.trigonometry.sin.k;
    //Расчет и запись данных
    for (let i = 0; i < 20; i++) {
        //Создание структуры
        data.trigonometry.sin.data[i] = {
            t: '', value: {}
        }
        //Указание временной точки
        data.trigonometry.sin.data[i].t = i;

        //Заполнение рассчитанными данными
        //используем спред оператор, чтобы не перезаписывать старые данные, а дополнять их
        for (let k = 0; k < odds.length; k++) {
            data.trigonometry.sin.data[i].value = {
                ...data.trigonometry.sin.data[i].value,
                [odds[k]]: Math.sin(odds[k] * i)
            }
        }

    }
    return data.trigonometry.sin
}

function cos() {
    //cos от kt
    //Создание объекта. к - коэффициенты, data - рассчитанные данные
    cos = {
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
        menu: [], trigonometry: {
            sin: [], cos: [], sinh: [], cosh: []
        }
    }

    //Тригонометрия
    data.trigonometry.sin = sin(data);
    data.trigonometry.cos = cos();

    return data
}