import axios from "axios";
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
    GET_ORDERS_FAIL,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS
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
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.get(`/api/v1/orders/get/${id}`, config);

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST });

        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.put(`/api/v1/orders/order/${orderId}/pay`, paymentResult, config);

        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

const getMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: GET_ORDERS_REQUEST });

        const { userInfo: { token } } = getState().userLogin;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await axios.get("/api/v1/orders/user", config);

        dispatch({ type: GET_ORDERS_SUCCESS, payload: data });

    } catch (err) {
        dispatch({
            type: GET_ORDERS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

export { createOrder, getOrderDetails, payOrder, getMyOrders };