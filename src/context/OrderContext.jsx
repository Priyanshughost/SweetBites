import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const OrderContext = createContext();

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    function getAllOrders() {
        setLoading(true);

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getAllOrders`, {}, { withCredentials: true })
            .then(res => {
                setOrders(res.data.orders || []);
            })
            .catch(e => {
                toast.error(e.response?.data?.message || "Failed to fetch orders");
            })
            .finally(() => { setLoading(false) })
    }


    function markFulfilled(orderId) {
        axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/admin/completed/${orderId}`,
                {},
                { withCredentials: true }
            )
            .then(res => {
                toast.success(res.data?.message);
                setOrders(res.data?.orders);
            })
            .catch(err => {
                toast.error(err.response?.data?.message || "Error updating order");
            });
    }


    // async function deleteOrder(orderId) {
    //     try {
    //         await axios.delete(
    //             `${import.meta.env.VITE_BACKEND_URL}/admin/deleteOrder/${orderId}`,
    //             { withCredentials: true }
    //         );

    //         toast.success("Order deleted");

    //         setOrders((prev) => prev.filter((o) => o._id !== orderId));
    //     } catch (err) {
    //         toast.error(err.response?.data?.message || "Failed to delete order");
    //     }
    // }

    return (
        <OrderContext.Provider
            value={{
                orders,
                loading,
                getAllOrders,
                markFulfilled,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    return useContext(OrderContext);
}
