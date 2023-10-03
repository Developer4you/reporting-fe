import {AxiosResponse} from "axios";
import $api from "../http";
import {IUserReport} from "../models/IUserReport";

export default class UserService {
    static async fetchUsers():Promise<AxiosResponse<IUserReport[]>>{
        return $api.get<IUserReport[]>('/getUserReports')
    }
}