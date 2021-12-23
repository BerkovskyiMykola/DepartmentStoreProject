import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_SHOP_ERROR, CREATE_SHOP_SUCCESS, DELETE_SHOP_ERROR, DELETE_SHOP_SUCCESS, EDIT_SHOP_ERROR, EDIT_SHOP_SUCCESS, GET_SHOPS } from "../constants/shop";
import shopService from "../services/shop.service";

export const getShops = (id) => (dispatch) => {
    return shopService.getShops(id).then(
        (responce) => {
            dispatch({
                type: GET_SHOPS,
                payload: responce.data
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

export const editShop = (shopId, name, floor, type) => (dispatch) => {
    return shopService.editShop(shopId, name, floor, type).then(
        (responce) => {
            dispatch({
                type: EDIT_SHOP_SUCCESS,
                payload: { shopId, name, floor, type }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_SHOP_ERROR
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

export const createShop = (name, floor, type, departmentStoreId) => (dispatch) => {
    return shopService.createShop(name, floor, type, departmentStoreId).then(
        (responce) => {
            dispatch({
                type: CREATE_SHOP_SUCCESS,
                payload: { shop: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_SHOP_ERROR
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

export const deleteShop = (id) => (dispatch) => {
    return shopService.deleteShop(id).then(
        (responce) => {
            dispatch({
                type: DELETE_SHOP_SUCCESS,
                payload: { id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_SHOP_ERROR
            });

            return Promise.reject();
        }
    )
}