import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL
} from "../constants/productConstants";

const listInitialState = {
    loading: false,
    products: [],
    error: null
};

const productListReducer = (state = listInitialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_LIST_SUCCESS:
            return { ...state, products: payload, loading: false }

        case PRODUCT_LIST_FAIL:
            return { ...state, error: payload, loading: false }

        default:
            return { ...listInitialState }
    }
};

const detailsInitialState = {
    loading: false,
    product: { reviews: [] },
    error: null
};

const productDetailsReducer = (state = detailsInitialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_DETAILS_SUCCESS:
            return { ...state, product: payload, loading: false }

        case PRODUCT_DETAILS_FAIL:
            return { ...state, error: payload, loading: false }

        default:
            return { ...detailsInitialState }
    }
};

export { productListReducer, productDetailsReducer };