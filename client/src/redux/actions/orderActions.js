import axios from "axios";
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.post("/api/v1/orders/create", order, config);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST });

        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.get(`/api/v1/orders/get/${id}`, config);

        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

export { createOrder, getOrderDetails };