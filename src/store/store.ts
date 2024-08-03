import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthRethponse";
import {API_URL} from "../http";
import ReportService from "../services/ReportService";
import {AllReportsDateType, IUserReport, RowType} from "../models/IUserReport";
import { Buffer } from 'buffer';

type RequestStatusType = 'empty'| 'success'| 'waiting'| 'error'
type PositionType = {position: string, position_name: string, okrb: string}

type company = {
    name:string
    emails:string
}
export default class Store {
    user = {} as IUser;
    report = {} as IUserReport
    reports = [] as IUserReport[]
    isAuth = false;
    isCheckAuth = false;
    isLoading = false;
    allReportsData = {} as AllReportsDateType
    isPending = false
    requestStatus:RequestStatusType = 'empty'
    emails = ''
    planPositions = [] as PositionType[]
    letters = [] as any

    constructor() {
        makeAutoObservable(this)
    }

    setLetters(letters:any[]){
        const decodedLetters:any[] = letters.map(item => {
            const base64Content = item.text.split('\r\n\r\n')
            const index = base64Content.findIndex((e:string)=>e.includes('text/plain'))
            const decodedContent = Buffer.from(base64Content[index+1], 'base64').toString('utf-8');
            return {
                ...item,
                text: decodedContent
            };
        });
        this.letters = decodedLetters;
    }

    setEmails(str:string){
        this.emails = str
    }

    setPlanPositions(array:PositionType[]){
        this.planPositions = [...array]
    }

    setAuth(bool: boolean) {
        this.isAuth = bool
    }

    setIsCheckAuth(bool: boolean) {
        this.isCheckAuth = bool
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool
    }
    setReports(reports:IUserReport[]) {
        this.reports = reports;
    }
    setAllReportsData(reports:AllReportsDateType) {
        this.allReportsData = reports;
    }
    setIsPending(bool:boolean){
        this.isPending = bool;
    }
    setRequestStatus(val:RequestStatusType){
        this.requestStatus = val;
    }
    async login(email: string, password: string) {
        this.setLoading(true)
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

    async registration(email: string, password: string, name: string) {
        try {
            const response = await AuthService.registration(email, password, name);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        this.setLoading(true)
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

    async getLetters() {
        try {
            this.setRequestStatus("waiting");
            this.setIsPending(true)
            const response = await ReportService.getLetters();
            this.setLetters(response.data.resData)
            this.setRequestStatus("success");
        } catch (e: any) {
            console.log(e.response?.data?.message)
            this.setRequestStatus("error");
        }
        finally {
            this.setIsPending(false)
        }
    }

    async getEmails(okrb:string) {
        try {
            this.setRequestStatus("waiting");
            this.setIsPending(true)
            const response = await ReportService.getEmails(okrb);
            console.log(response);
            this.setEmails(response.data)
            this.setRequestStatus("success");
        } catch (e: any) {
            console.log(e.response?.data?.message)
            this.setRequestStatus("error");
        }
        finally {
            this.setIsPending(false)
        }
    }

    async sendEmail(emails:string[]) {
        try {
            this.setRequestStatus("waiting");
            this.setIsPending(true)
            const response = await ReportService.sendEmails(emails);
            console.log(response);
            this.setPlanPositions(response.data)
            this.setRequestStatus("success");
        } catch (e: any) {
            console.log(e.response?.data?.message)
            this.setRequestStatus("error");
        }
        finally {
            this.setIsPending(false)
        }
    }

    async getPlanPositions(productName:string) {
        try {
            this.setRequestStatus("waiting");
            this.setIsPending(true)
            const response = await ReportService.getPlanPosition(productName);
            console.log(response);
            this.setPlanPositions(response.data)
            this.setRequestStatus("success");
        } catch (e: any) {
            console.log(e.response?.data?.message)
            this.setRequestStatus("error");
        }
        finally {
            this.setIsPending(false)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
            this.setIsCheckAuth(true)
        }
    }

    async getUserReports(){
        try {
            const response = await ReportService.getUserReports();
            const reports = [...response.data.resData]
            this.setReports(reports)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }

    async sendReport(diesel: number, dieselInTank: number, petrol80: number, petrol80InTank: number, petrol95: number, petrol95InTank: number) {
        try {
            this.setRequestStatus("waiting");
            this.setIsPending(true)
            const response = await ReportService.sendReport(diesel, dieselInTank, petrol80, petrol80InTank, petrol95, petrol95InTank);
            console.log(response);
            this.setRequestStatus("success");
        } catch (e: any) {
            console.log(e.response?.data?.message)
            this.setRequestStatus("error");
        }
        finally {
            this.setIsPending(false)
        }
    }

    async getAllReports(){
        try {
            const response = await ReportService.getAllReports();
            const reports = response.data.resData
            this.setAllReportsData(reports)
        } catch (e: any) {
            console.log(e.response?.data?.message)
        }
    }
}