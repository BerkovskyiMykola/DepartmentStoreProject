import EventBus from "../common/EventBus";
import { CREATE_DEPARTMENT_STORE_ERROR, CREATE_DEPARTMENT_STORE_SUCCESS, DELETE_DEPARTMENT_STORE_ERROR, DELETE_DEPARTMENT_STORE_SUCCESS, EDIT_DEPARTMENT_STORE_ERROR, EDIT_DEPARTMENT_STORE_SUCCESS, GET_DEPARTMENT_STORES } from "../constants/departmentStore";
import { SET_MESSAGE } from "../constants/message";
import departmentStoreService from "../services/departmentStore.service";

export const getDepartmentStores = () => (dispatch) => {
    return departmentStoreService.getDepartmentStores().then(
        (responce) => {
            dispatch({
                type: GET_DEPARTMENT_STORES,
                payload: { departmentStores: responce.data }
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

export const editDepartmentStore = (departmentStoreId, name, address) => (dispatch) => {
    return departmentStoreService.editDepartmentStore(departmentStoreId, name, address).then(
        (responce) => {
            dispatch({
                type: EDIT_DEPARTMENT_STORE_SUCCESS,
                payload: { departmentStoreId, name, address }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_DEPARTMENT_STORE_ERROR
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

export const createDepartmentStore = (name, address) => (dispatch) => {
    return departmentStoreService.createDepartmentStore(name, address).then(
        (responce) => {
            dispatch({
                type: CREATE_DEPARTMENT_STORE_SUCCESS,
                payload: { departmentStore: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_DEPARTMENT_STORE_ERROR
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

export const deleteDepartmentStore = (id) => (dispatch) => {
    return departmentStoreService.deleteDepartmentStore(id).then(
        (responce) => {
            dispatch({
                type: DELETE_DEPARTMENT_STORE_SUCCESS,
                payload: { departmentStoreId: id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_DEPARTMENT_STORE_ERROR
            });

            return Promise.reject();
        }
    )
}