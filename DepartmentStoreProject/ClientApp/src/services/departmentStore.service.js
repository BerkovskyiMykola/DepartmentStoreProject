import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/DepartmentStores/";

class DepartmentStoreService {
    getDepartmentStores() {
        return axios.get(API_URL + "all", { headers: authHeader() });
    }

    createDepartmentStore(name, address) {
        return axios.post(API_URL + "create", { name, address }, { headers: authHeader() });
    }

    deleteDepartmentStore(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editDepartmentStore(departmentStoreId, name, address) {
        return axios.put(API_URL + "edit/" + departmentStoreId, { departmentStoreId, name, address }, { headers: authHeader() });
    }
}

export default new DepartmentStoreService();