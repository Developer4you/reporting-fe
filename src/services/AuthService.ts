import {AxiosResponse} from "axios";
import $api from "../http";
import {AuthResponse} from "../models/response/AuthRethponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/login', {email, password})
    }

    static async registration(email: string, password: string, name:string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/registration', {email, password, name})
    }

    static async logout(): Promise<AxiosResponse<AuthResponse>>{
        return $api.post<AuthResponse>('/logout')
    }
}
