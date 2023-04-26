import {generateColor} from "./generateColor";

export function formattingData(data) {
    let formattedData = [];
    const res = data;
    for (let i = 0; i < res.k.length; i++) {
        formattedData[i] = {
            k: res.k[i],
            name: `${res.name}, k=${res.k[i]}`,
            items: [],
            color: generateColor(),
        };
        for (let j = 0; j < res.data.length; j++) {
            formattedData[i].items.push({date: res.data[j].t, value: res.data[j].value[i + 1]})
        }
    }
    return formattedData;
}