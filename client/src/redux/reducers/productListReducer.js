import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL
} from "../constants/productConstants";

const initialState = {
    loading: false,
    products: []
};

const productListReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_LIST_SUCCESS:
            return { ...state, products: payload, loading: false }

        case PRODUCT_LIST_FAIL:
            return { ...state, error: payload, loading: false }

        default:
            return { ...initialState }
    }
};

export default productListReducer;