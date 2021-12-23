import { CREATE_HISTORY_SUCCESS, GET_HISTORIES } from "../constants/history";

const initialState = {
    name: "",
    floor: 1,
    type: "",
    histories: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_HISTORIES:
            return {
                name: payload.name,
                floor: payload.floor,
                type: payload.type,
                histories: payload.histories
            }
        case CREATE_HISTORY_SUCCESS:
            return {
                ...state,
                histories: [payload.history, ...state.histories]
            }
        default:
            return state;
    }
}