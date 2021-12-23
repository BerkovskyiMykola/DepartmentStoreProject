import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Histories/";

class HistoryService {
    getHistories(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createHistory(shopId) {
        return axios.post(API_URL + "createRandom/" + shopId, { }, { headers: authHeader() });
    }
}

export default new HistoryService();