import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import user from "./user";
import profile from "./profile";

export default combineReducers({
    auth,
    message,
    user,
    profile
});