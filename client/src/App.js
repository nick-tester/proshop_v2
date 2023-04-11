import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
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
    return <main className="py-3">
        <Container>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/cart/:id?" element={<CartPage />} />
                <Route path="/user/login" element={<LoginPage />} />
                <Route path="/user/register" element={<RegisterPage />} />
                {/* 
                    <Route path=":id" element={<CartPageParams />} />
                <Route path="/profile" element={<ProfilePage />} />
                 */}
            </Routes>
        </Container>
    </main>
};

export default App;