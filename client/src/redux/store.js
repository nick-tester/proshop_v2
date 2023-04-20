import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer } from "./reducers/productReducers";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from "./reducers/userReducers";
import cartReducers from "./reducers/cartReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
const cartShippingAddressFromLocalStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : null;

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage, shippingAddress: cartShippingAddressFromLocalStorage },
    userLogin: { userInfo: userInfoFromLocalStorage }
};

const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;