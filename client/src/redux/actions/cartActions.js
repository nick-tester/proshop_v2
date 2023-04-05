import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

const addToCart = (id, qty) => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(`/products/single/${id}`);

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

export { addToCart };