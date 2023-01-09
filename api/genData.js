module.exports = () => {
    const data = {
        users: [],
        trigonometry: {
            sin: []
        }
    }

    //Тригонометрия

    //sin от kt
    for (let k = 1; k <= 3; k++) {
        data.trigonometry.sin[k-1] = {
            k: k,
            data: []
        };
        for (let i = 0; i < 3; i++) {
            data.trigonometry.sin[k-1].data.push({t: i, value: Math.sin(k*i)})
        }
    }


    return data
}