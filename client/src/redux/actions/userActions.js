import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_ACTION,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL
} from "../constants/userConstants";

const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post("/api/v1/users/auth", { email, password }, config);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    };
};

const logoutUser = () => (dispatch) => {
    dispatch({ type: USER_LOGOUT_ACTION });
    localStorage.removeItem("userInfo");
};

const registerUser = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const { data } = await axios.post("/api/v1/users/auth/profile", { name, email, password }, config);

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    }
};

const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });

        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`/api/v1/users/auth/${id}`, config);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (err) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    };
};

const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

        const { userInfo } = getState().userLogin;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`/api/v1/users/auth/profile`, user, config);

        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: err.response && err.response.data.message ? err.response.data.message : err.message
        });
    };
};

export { loginUser, logoutUser, registerUser, getUserDetails, updateUserProfile };