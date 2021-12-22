import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";
const API_URL = CURRENT_DOMAIN + "/Users/";

class DatabaseService {

    backup() {
        return axios.get(API_URL + "backup", { headers: authHeader() });
    }

    restore() {
        return axios.get(API_URL + "restore", { headers: authHeader() });
    }
}

export default new DatabaseService();
