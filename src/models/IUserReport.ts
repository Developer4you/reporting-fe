import {string} from "yup";

export interface IUserReport {
    _id: string;
    _user: string
    report: {
        diesel: number,
        dieselInTank: number,
        petrol80: number,
        petrol80InTank: number,
        petrol95: number,
        petrol95InTank: number,
    }
    date:string
}

export type AllReportsDateType = {
    [key: string]: number[][];
}

export type RowType = {
    'Дата': string;
    [key: string]: string;
};