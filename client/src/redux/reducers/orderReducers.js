import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL
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

const myOrdersInitialStates = {
    loading: false,
    myOrders: [],
    error: null
};

const myOrderListReducer = (state = myOrdersInitialStates, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ORDERS_REQUEST:
            return { ...state, loading: true };

        case GET_ORDERS_SUCCESS:
            return { ...state, loading: false, myOrders: payload };

        case GET_ORDERS_FAIL:
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

const orderPayInitialStates = {
    loading: false,
    success: false,
    error: null
}

const orderPayReducer = (state = orderPayInitialStates, action) => {
    const { type, payload } = action;

    switch (type) {
        case ORDER_PAY_REQUEST:
            return { loading: true };

        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true, error: null };

        case ORDER_PAY_FAIL:
            return { loading: false, success: false, error: payload };

        case ORDER_PAY_RESET:
            return {};

        default:
            return state;
    }
};

export { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer };