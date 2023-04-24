import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from "../constants/orderConstants";

const createInitialState = {
    loading: false,
    order: null,
    error: null
};

const orderCreateReducer = (state = createInitialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ORDER_CREATE_REQUEST:
            return { ...state, loading: true };

        case ORDER_CREATE_SUCCESS:
            return { ...state, loading: false, order: payload };

        case ORDER_CREATE_FAIL:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};

const orderDetailsInitialState = {
    loading: false,
    order: {
        isPaid: "",
        paidAt: "",
        isDelivered: "",
        deliveredAt: "",
        user: {},
        paymentMethod: "",
        shippingAddress: {},
        orderItems: [],
        itemsPrice: 0,
        taxPrice: 0,
        shippingPrice: 0,
        totalPrice: 0
    },
    error: null
};

const orderDetailsReducer = (state = orderDetailsInitialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };

        case ORDER_DETAILS_SUCCESS:
            return { ...state, loading: false, order: payload };

        case ORDER_DETAILS_FAIL:
            return { ...state, loading: false, error: payload };

        default:
            return state;
    }
};



export { orderCreateReducer, orderDetailsReducer };