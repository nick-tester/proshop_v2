import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD
} from "../constants/cartConstants";

const cartInitialState = {
    cartItems: [],
    shippingAddress: null
};

const cartReducers = (state = cartInitialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ADD_ITEM:
            const item = payload;
            const existItem = state.cartItems.find(x => x.product === item.product);

            if (existItem) {
                return { ...state, cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x) }
            } else {
                return { ...state, cartItems: [...state.cartItems, item] };
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== payload)
            };

        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: payload
            };

        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: payload
            };

        default:
            return state;
    };
};

export default cartReducers;