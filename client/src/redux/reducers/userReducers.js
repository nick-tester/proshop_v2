import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT_ACTION
} from "../constants/userConstants";

const userLoginInitialState = {
    loading: false,
    userInfo: {},
    error: null
};

const userLoginReducer = (state = userLoginInitialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case USER_LOGIN_REQUEST:
            return { ...state, loading: true };

        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: payload
            };

        case USER_LOGIN_FAIL:
            return {
                loading: false,
                error: payload
            };

        case USER_LOGOUT_ACTION:
            return {};

        default:
            return state;
    };

};

export { userLoginReducer };