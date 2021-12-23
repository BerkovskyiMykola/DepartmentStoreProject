import { CREATE_SHOPITEM_SUCCESS, DELETE_SHOPITEM_SUCCESS, EDIT_SHOPITEM_SUCCESS, GET_SHOPITEMS } from "../constants/shopItem";

const initialState = {
    name: "",
    floor: 1,
    type: "",
    shopItems: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_SHOPITEMS:
            return {
                name: payload.name,
                floor: payload.floor,
                type: payload.type,
                shopItems: payload.shopItems
            }
        case CREATE_SHOPITEM_SUCCESS:
            return {
                ...state,
                shopItems: [...state.shopItems, payload.shopItem]
            }
        case DELETE_SHOPITEM_SUCCESS:
            return {
                ...state,
                shopItems: state.shopItems.filter(x => x.shopItemId !== payload.id)
            }
        case EDIT_SHOPITEM_SUCCESS:
            return {
                ...state,
                shopItems: state.shopItems.map(item => {
                    if (item.shopItemId === payload.shopItemId)
                        return {
                            ...item,
                            name: payload.name,
                            price: payload.price,
                            amount: payload.amount
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}