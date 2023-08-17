import React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./assets/css/bootstrap.custom.css";
import "./assets/css/index.css";
import App from "./App";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} />
    )
);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store} >
        <RouterProvider router={router} />
    </Provider>
);