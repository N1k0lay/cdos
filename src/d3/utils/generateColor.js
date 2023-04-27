export function generateColor() {
    let hexString = "0123456789abcdef";
    let hexCode = "#";

    for (let i = 0; i < 6; i++) {
        hexCode += hexString[Math.floor(Math.random() * hexString.length)];
    }
    return hexCode;
}


