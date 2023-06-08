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


// <-- OLD WAYS -->

// const Main = () => {
//     const cart = useSelector(state => state.cart);
//     const { shippingAddress, paymentMethod } = cart;

//     const userLogin = useSelector(state => state.userLogin);
//     const { userInfo } = userLogin;

//     return <main className="py-3">
//         <Container>
//             <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/product/:id" element={<ProductDetailsPage />} />
//                 <Route path="/cart/:id?" element={<CartPage />} />
//                 <Route path="/user/login" element={<LoginPage />} />
//                 <Route path="/user/register" element={<RegisterPage />} />
//                 {userInfo && (
//                     <>
//                         <Route path="/order/:id" element={<OrderDetailsPage />} />
//                         <Route path="/user/profile" element={<ProfilePage />} />
//                         <Route path="/shipping" element={<ShippingPage />} />
//                         {shippingAddress && <Route path="/payment" element={<PaymentPage />} />}
//                         {(shippingAddress && paymentMethod) && <Route path="/placeorder" element={<PlaceOrderPage />} />}
//                     </>
//                 )}
//                 <Route path="*" element={<PageNotFound />} />
//             </Routes>
//         </Container>
//     </main>
// };

export default App;