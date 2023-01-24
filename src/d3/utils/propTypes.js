import { arrayOf, shape, string, date as dateProp, number } from "prop-types";

export const MultiLineDataItemsPropTypes = arrayOf(
    shape({
        date: dateProp,
        value: number,
        marketvalue: number
    })
);

export const MultiLineDataPropTypes = arrayOf(
    shape({
        name: string,
        items: MultiLineDataItemsPropTypes,
        color: string
    })
);

export const LineDataItemsPropTypes = arrayOf(
    shape({
        value: number,
        time: number,
    })
);

export const LineDataPropTypes = arrayOf(
    shape({
        name: string,
        items: MultiLineDataItemsPropTypes,
        color: string,
        offs: number,
    })
);

