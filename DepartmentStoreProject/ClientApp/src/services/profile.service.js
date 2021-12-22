import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Users/";

class ProfileService {

    getUser() {
        return axios.get(API_URL + "one", { headers: authHeader() });
    }

    editUser(userId, lastname, firstname) {
        return axios.put(API_URL + "edit/profile/" + userId, { userId, lastname, firstname }, { headers: authHeader() });
    }
}

export default new ProfileService();