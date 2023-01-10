module.exports = () => {
    const data = {
        users: [],
        trigonometry: {
            sin: [],
            cos: [],
            sinh: [],
            cosh: []
        }
    }

    //Тригонометрия

    //sin от kt
    for (let k = 1; k <= 3; k++) {
        data.trigonometry.sin[k - 1] = {
            k: k,
            data: []
        };
        for (let i = -20; i < 20; i++) {
            data.trigonometry.sin[k - 1].data.push({t: i, value: Math.sin(k * i)})
        }
    }

    //cos от kt
    for (let k = 1; k <= 3; k++) {
        data.trigonometry.cos[k - 1] = {
            k: k,
            data: []
        };
        for (let i = -20; i < 20; i++) {
            data.trigonometry.cos[k - 1].data.push({t: i, value: Math.cos(k * i)})
        }
    }
    //гиперболический синус sin от kt
    for (let k = 1; k <= 3; k++) {
        data.trigonometry.cos[k - 1] = {
            k: k,
            data: []
        };
        for (let i = -20; i < 20; i++) {
            data.trigonometry.cos[k - 1].data.push({t: i, value: Math.sinh(k * i)})
        }
    }
    //гиперболический косинус sin от kt
    for (let k = 1; k <= 3; k++) {
        data.trigonometry.sinh[k - 1] = {
            k: k,
            data: []
        };
        for (let i = -20; i < 20; i++) {
            data.trigonometry.sinh[k - 1].data.push({t: i, value: Math.sinh(k * i)})
        }
    }

    //гиперболический косинус cos от kt
    for (let k = 1; k <= 3; k++) {
        data.trigonometry.cosh[k - 1] = {
            k: k,
            data: []
        };
        for (let i = -20; i < 20; i++) {
            data.trigonometry.cosh[k - 1].data.push({t: i, value: Math.cosh(k * i)})
        }
    }

    return data
}