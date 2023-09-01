import React from "react";
import { Container } from "react-bootstrap";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
    return (
        <>
            <Header />
            <Container>
                <main className="py-3">
                    <Outlet />
                </main>
            </Container>
            <Footer />
        </>
    )
};

export default App;
