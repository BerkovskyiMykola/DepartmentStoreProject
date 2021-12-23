import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import profile from "./profile";
import departmentStore from "./departmentStore";
import shop from "./shop";
import shopItem from "./shopItem";
import history from "./history";

export default combineReducers({
    auth,
    message,
    user,
    profile,
    departmentStore,
    shop,
    shopItem,
    history
});