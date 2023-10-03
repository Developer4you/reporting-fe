import {AxiosResponse} from "axios";
import $api from "../http";


export default class ReportService {
    static async sendReport(diesel: number, dieselInTank: number, petrol80: number, petrol80InTank: number, petrol95: number, petrol95InTank: number): Promise<AxiosResponse<any>>{
        return $api.post<any>('/report', {diesel, dieselInTank, petrol80, petrol80InTank, petrol95, petrol95InTank})
    }
    static async getUserReports(): Promise<AxiosResponse<any>>{
        return $api.get<any>('/getUserReports')
    }
    static async getAllReports(): Promise<AxiosResponse<any>>{
        return $api.get<any>('/getAllReports')
    }
}
