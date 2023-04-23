import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
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

export { orderCreateReducer };