import { EDIT_PROFILE_SUCCESS, GET_PROFILE_INFO_SUCCESS } from "../constants/profile";

const initialState = {
    profile: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE_INFO_SUCCESS:
            return {
                profile: payload
            }
        case EDIT_PROFILE_SUCCESS:
            return {
                profile: {
                    ...state.profile,
                    lastname: payload.lastname,
                    firstname: payload.firstname
                }
            }
        default:
            return state;
    }
}