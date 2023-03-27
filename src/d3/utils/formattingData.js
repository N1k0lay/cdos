export function formattingData(data) {
    let formattedData = [];
    const res = data;
    for (let i = 0; i < res.k.length; i++) {
        formattedData[i] = {k: res.k[i], data: []};
        for (let j = 0; j < res.data.length; j++) {
            formattedData[i].data.push({date: res.data[j].t, value: res.data[j].value[i+1]})
        }
    }
    return formattedData;
}