import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";

export default function MainLayout() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <motion.div
        key={location.pathname}        // <--- this is the important part
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Outlet />
      </motion.div>
      <Footer />
    </>
  );
}

