import { CREATE_USER_SUCCESS, DELETE_USER_SUCCESS, GET_USERS, EDIT_USER_SUCCESS } from "../constants/user";

const initialState = {
    users: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS:
            return {
                users: payload.users
            }
        case CREATE_USER_SUCCESS:
            return {
                users: [...state.users, payload.user]
            }
        case DELETE_USER_SUCCESS:
            return {
                users: state.users.filter(x => x.userId !== payload.userId)
            }
        case EDIT_USER_SUCCESS:
            return {
                users: state.users.map(user => {
                    if (user.userId === payload.userId)
                        return {
                            ...user,
                            lastname: payload.lastname,
                            firstname: payload.firstname,
                            role: payload.role,
                        }
                    return user;
                })
            }
        default:
            return state;
    }
}