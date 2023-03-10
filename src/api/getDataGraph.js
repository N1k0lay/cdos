import axios from "axios";

export async function getDataGraph(link) {
    axios
        .get(`http://localhost:3003/${link}`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch(error => {
            return error
        })
}