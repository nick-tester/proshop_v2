import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const App = () => {
    return (
        <>
            <Header />
            <Main />
            <Footer />
        </>
    )
};

const Main = () => {
    return <main className="py-3">
        <Container>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                {/* 
                <Route path="/cart" element={<CartPage />}>
                    <Route path=":id" element={<CartPageParams />} />
                </Route>
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                 */}
            </Routes>
        </Container>
    </main>
};

export default App;