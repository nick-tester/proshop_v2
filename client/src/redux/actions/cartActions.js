import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/api/v1/products/single/${id}`);

        const payload = {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        };

        dispatch({ type: CART_ADD_ITEM, payload });

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    } catch (err) {
        console.error(err.message);
    }
};

const cartRemoveItem = (id) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: id });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

const saveShippingAddress = (formData) => (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: formData });
    localStorage.setItem("shippingAddress", JSON.stringify(formData));
};

export { addToCart, cartRemoveItem, saveShippingAddress };