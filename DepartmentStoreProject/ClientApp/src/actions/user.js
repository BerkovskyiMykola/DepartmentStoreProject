import EventBus from "../common/EventBus";
import { CREATE_USER_ERROR, CREATE_USER_SUCCESS, DELETE_USER_ERROR, DELETE_USER_SUCCESS, EDIT_USER_SUCCESS, EDIT_USER_ERROR, GET_USERS } from "../constants/user";
import { SET_MESSAGE } from "../constants/message";
import userService from "../services/user.service"

export const getUsers = () => (dispatch) => {
    return userService.getUsers().then(
        (responce) => {
            dispatch({
                type: GET_USERS,
                payload: { users: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            return Promise.reject();
        }
    )
}

export const editUser = (userId, lastname, firstname, role) => (dispatch) => {
    return userService.editUser(userId, lastname, firstname, role).then(
        (responce) => {
            dispatch({
                type: EDIT_USER_SUCCESS,
                payload: { userId, lastname, firstname, role }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_USER_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const createUser = (lastname, firstname, role, email, password) => (dispatch) => {
    return userService.createUser(lastname, firstname, role, email, password).then(
        (responce) => {
            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: { user: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_USER_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const deleteUser = (id) => (dispatch) => {
    return userService.deleteUser(id).then(
        (responce) => {
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: { userId: id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_USER_ERROR
            });

            return Promise.reject();
        }
    )
}