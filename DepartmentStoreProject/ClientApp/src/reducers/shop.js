import { CREATE_SHOP_SUCCESS, DELETE_SHOP_SUCCESS, EDIT_SHOP_SUCCESS, GET_SHOPS } from "../constants/shop";

const initialState = {
    name: "",
    address: "",
    shops: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SHOPS:
            return {
                name: payload.name,
                address: payload.address,
                shops: payload.shops
            }
        case CREATE_SHOP_SUCCESS:
            return {
                ...state,
                shops: [...state.shops, payload.shop]
            }
        case DELETE_SHOP_SUCCESS:
            return {
                ...state,
                shops: state.shops.filter(x => x.shopId !== payload.id)
            }
        case EDIT_SHOP_SUCCESS:
            return {
                ...state,
                shops: state.shops.map(item => {
                    if (item.shopId === payload.shopId)
                        return {
                            ...item,
                            name: payload.name,
                            floor: payload.floor,
                            type: payload.type
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}