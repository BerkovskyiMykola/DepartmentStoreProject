import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Shops/";

class ShopService {
    getShops(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createShop(name, floor, type, departmentStoreId) {
        return axios.post(API_URL + "create", { name, floor, type, departmentStoreId }, { headers: authHeader() });
    }

    deleteShop(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editShop(shopId, name, floor, type) {
        return axios.put(API_URL + "edit/" + shopId, { shopId, name, floor, type }, { headers: authHeader() });
    }
}

export default new ShopService();