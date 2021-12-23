import EventBus from "../common/EventBus";
import { CREATE_HISTORY_ERROR, CREATE_HISTORY_SUCCESS, GET_HISTORIES } from "../constants/history";
import historyService from "../services/history.service";

export const getHistories = (id) => (dispatch) => {
    return historyService.getHistories(id).then(
        (responce) => {
            dispatch({
                type: GET_HISTORIES,
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

export const createHistory = (id) => (dispatch) => {
    return historyService.createHistory(id).then(
        (responce) => {
            dispatch({
                type: CREATE_HISTORY_SUCCESS,
                payload: { history: responce.data }
            });


            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_HISTORY_ERROR
            });

            return Promise.reject();
        }
    )
}
