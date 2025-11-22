import { Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout() {
    const location = useLocation();

    return (
        <div className="flex flex-col w-full">

            <Navbar />

            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 35, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Outlet />
            </motion.div>

            <Footer />

        </div>
    );
}
