import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import { useCart } from "@/context/CartContext";
import LoadingSkeleton from "@/components/LoadingSkeleton";


// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const Cart = lazy(() => import("../pages/Cart"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Checkout = lazy(() => import("../pages/Checkout"))

const AppRoutes = () => {
    const { cart } = useCart()
    return (
        <Routes>

            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={
                        <Suspense fallback={<LoadingSkeleton />}>
                            <Home />
                        </Suspense>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <Suspense fallback={<LoadingSkeleton />}>
                            <Products />
                        </Suspense>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <Suspense fallback={<LoadingSkeleton />}>
                            <Cart />
                        </Suspense>
                    }
                />
                <Route
                    path="/checkout"
                    element={
                        <Suspense fallback={<LoadingSkeleton />}>
                            <Checkout />
                        </Suspense>
                    }
                />
            </Route>

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
                path="/admin/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
            />

            <Route path="*" element={<div>404 Not Found</div>} />

        </Routes>
    );
};

export default AppRoutes;
