import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import UserProtected from "./UserProtected";

import LoadingSkeleton from "@/components/LoadingSkeleton";
import PublicRoute from "./PublicRoute";

// Lazy pages
const Home = lazy(() => import("../pages/Home"));
const Products = lazy(() => import("../pages/Products"));
const Cart = lazy(() => import("../pages/Cart"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const Dashboard = lazy(() => import("../layouts/Dashboard"));
const Checkout = lazy(() => import("../pages/Checkout"));
const DashboardProducts = lazy(() => import("../pages/DashboardProducts"));
const DashboardOrders = lazy(() => import("../pages/DashboardOrders"));
const UserAuth = lazy(() => import("../pages/UserAuth"));

const AppRoutes = () => {
    return (
        <Routes>

            {/* PUBLIC LAYOUT */}
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

                {/* USER PROTECTED ROUTES */}
                <Route
                    path="/cart"
                    element={
                        <UserProtected
                            element={
                                <Suspense fallback={<LoadingSkeleton />}>
                                    <Cart />
                                </Suspense>
                            }
                        />
                    }
                />

                <Route
                    path="/checkout"
                    element={
                        <UserProtected
                            element={
                                <Suspense fallback={<LoadingSkeleton />}>
                                    <Checkout />
                                </Suspense>
                            }
                        />
                    }
                />
            </Route>

            {/* PUBLIC USER AUTH */}
            <Route
                path="/user/auth"
                element={<PublicRoute element={<UserAuth />} />}
            />

            {/* PUBLIC ADMIN LOGIN */}
            <Route
                path="/admin/login"
                element={<PublicRoute element={<AdminLogin />} />}
            />

            {/* ADMIN PROTECTED ROUTES */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        element={<Dashboard />}
                    />
                }
            >
                <Route index element={<Navigate to="products" />} />
                <Route path="products" element={<DashboardProducts />} />
                <Route path="orders" element={<DashboardOrders />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
};

export default AppRoutes;
