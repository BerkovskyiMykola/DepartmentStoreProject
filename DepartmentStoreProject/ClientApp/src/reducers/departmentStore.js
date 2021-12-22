import { CREATE_DEPARTMENT_STORE_SUCCESS, DELETE_DEPARTMENT_STORE_SUCCESS, EDIT_DEPARTMENT_STORE_SUCCESS, GET_DEPARTMENT_STORES } from "../constants/departmentStore";

const initialState = {
    departmentStores: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_DEPARTMENT_STORES:
            return {
                departmentStores: payload.departmentStores
            }
        case CREATE_DEPARTMENT_STORE_SUCCESS:
            return {
                departmentStores: [...state.departmentStores, payload.departmentStore]
            }
        case DELETE_DEPARTMENT_STORE_SUCCESS:
            return {
                departmentStores: state.departmentStores.filter(x => x.departmentStoreId !== payload.departmentStoreId)
            }
        case EDIT_DEPARTMENT_STORE_SUCCESS:
            return {
                departmentStores: state.departmentStores.map(departmentStore => {
                    if (departmentStore.departmentStoreId === payload.departmentStoreId)
                        return {
                            ...departmentStore,
                            name: payload.name,
                            address: payload.address
                        }
                    return departmentStore;
                })
            }
        default:
            return state;
    }
}