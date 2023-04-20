import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PageNotFound from "./pages/NotFoundPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const App = () => {
    return (
        <Router>
            <Header />
            <Main />
            <Footer />
        </Router>
    )
};

const Main = () => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress, paymentMethod } = cart;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    return <main className="py-3">
        <Container>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart/:id?" element={<CartPage />} />
                <Route path="/user/login" element={<LoginPage />} />
                <Route path="/user/register" element={<RegisterPage />} />
                {userInfo && (
                    <>
                        <Route path="/user/profile" element={<ProfilePage />} />
                        <Route path="/shipping" element={<ShippingPage />} />
                        {shippingAddress && <Route path="/payment" element={<PaymentPage />} />}
                        {(shippingAddress && paymentMethod) && <Route path="/placeorder" element={<PlaceOrderPage />} />}
                    </>
                )}
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </Container>
    </main>
};

export default App;