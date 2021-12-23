import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_SHOPITEM_ERROR, CREATE_SHOPITEM_SUCCESS, DELETE_SHOPITEM_ERROR, DELETE_SHOPITEM_SUCCESS, EDIT_SHOPITEM_ERROR, EDIT_SHOPITEM_SUCCESS, GET_SHOPITEMS } from "../constants/shopItem";
import shopItemService from "../services/shopItem.service";

export const getShopItems = (id) => (dispatch) => {
    return shopItemService.getShopItems(id).then(
        (responce) => {
            dispatch({
                type: GET_SHOPITEMS,
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

export const editShopItem = (shopItemId, name, price, amount) => (dispatch) => {
    return shopItemService.editShopItem(shopItemId, name, price, amount).then(
        (responce) => {
            dispatch({
                type: EDIT_SHOPITEM_SUCCESS,
                payload: { shopItemId, name, price, amount }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_SHOPITEM_ERROR
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

export const createShopItem = (name, price, amount, shopId) => (dispatch) => {
    return shopItemService.createShopItem(name, price, amount, shopId).then(
        (responce) => {
            dispatch({
                type: CREATE_SHOPITEM_SUCCESS,
                payload: { shopItem: responce.data }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_SHOPITEM_ERROR
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

export const deleteShopItem = (id) => (dispatch) => {
    return shopItemService.deleteShopItem(id).then(
        (responce) => {
            dispatch({
                type: DELETE_SHOPITEM_SUCCESS,
                payload: { id }
            });

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: DELETE_SHOPITEM_ERROR
            });

            return Promise.reject();
        }
    )
}