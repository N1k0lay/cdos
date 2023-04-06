import axios from "axios";

export async function getDataGraph(link) {
    return axios
        .get(`http://localhost:3003/${link}`)
        .then(res => res.data)
        .catch(error => error)
}