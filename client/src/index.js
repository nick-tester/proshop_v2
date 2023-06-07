import React from "react";
import { createRoot } from "react-dom/client";
// import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
// import "./assets/css/bootstrap.min.css";
import "./assets/css/bootstrap.custom.css";
import "./assets/css/index.css";
import App from "./App";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);