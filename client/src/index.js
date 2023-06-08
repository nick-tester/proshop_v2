import React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./assets/css/bootstrap.custom.css";
import "./assets/css/index.css";
import {
    ProductDetailsPage,
    CartPage,
    HomePage,
    LoginPage,
    RegisterPage,
} from "./pages";
import App from "./App";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route index={true} path="/" element={<HomePage />} />
            <Route path="product/:id" element={<ProductDetailsPage />} />
            <Route path="cart/:id?" element={<CartPage />} />
            <Route path="user/login" element={<LoginPage />} />
            <Route path="user/register" element={<RegisterPage />} />
        </Route>
    )
);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);