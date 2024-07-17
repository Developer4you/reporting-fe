import {AxiosResponse} from "axios";
import $api from "../http";

export default class GiasService {
    static async getSuppliers(contextTextSearch: string): Promise<AxiosResponse<any>> {
        return $api.get<any[]>('/getSuppliers', {
            params: {
                contextTextSearch: contextTextSearch, // Передаем параметр поиска
            },
        })
    }
}