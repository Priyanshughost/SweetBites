import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { useOrders } from "@/context/OrderContext";

export default function DashboardOrders() {
    const { orders, getAllOrders, markFulfilled, deleteOrder, loading } = useOrders();

    useEffect(() => {
        getAllOrders();
    }, []);

    return (
        <div className="w-full max-w-full mx-auto px-0 sm:px-6 py-6">
            <h1 className="text-2xl sm:text-3xl font-semibold mb-8">Orders</h1>

            {loading && <p className="text-center text-stone-500">Loading orders...</p>}

            {!loading && orders.length === 0 && (
                <p className="text-stone-500 text-center mt-10">No orders yet.</p>
            )}

            <div className="grid gap-6">
                {orders.map(order => (
                    <Card key={order._id} className="rounded-xl border hover:shadow-lg shadow-gray-400 p-5 transition-shadow ease-linear">
                        
                        {/* USER DETAILS */}
                        <div className="flex justify-between items-start flex-wrap gap-2">
                            <div>
                                <p className="text-base font-semibold">
                                    {order.user?.name || "Unnamed User"}
                                </p>
                                <p className="text-sm text-stone-500">
                                    {order.user?.phone || "No Phone"}
                                </p>
                                <p className="text-xs text-stone-400">
                                    {new Date(order.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <Badge
                                variant={order.fulfilled ? "secondary" : "outline"}
                                className="text-xs px-2 py-0.5 rounded-full"
                            >
                                {order.fulfilled ? "Completed" : "Pending"}
                            </Badge>
                        </div>

                        {/* ORDER ITEMS */}
                        <div className="mt-4 space-y-2 text-sm">
                            {order.products.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center">
                                    <span className="text-stone-700">
                                        {item.nameAtPurchase} × {item.quantity}
                                    </span>
                                    <span className="font-medium">
                                        ₹{item.priceAtPurchase * item.quantity}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL */}
                        <div className="border-t mt-4 pt-3 flex justify-between font-semibold">
                            <span>Total</span>
                            <span>₹{order.total}</span>
                        </div>

                        {/* ACTION BUTTONS */}
                        {/* <div className="mt-4 flex gap-2 flex-wrap"> */}
                            {!order.fulfilled && (
                                <Button
                                    size="sm"
                                    onClick={() => markFulfilled(order._id)}
                                >
                                    Mark Completed
                                </Button>
                            )}
{/* 
                            <Button
                                variant="destructive"
                                size="sm"
                                className="flex-1"
                                onClick={() => deleteOrder(order._id)}
                            >
                                Delete
                            </Button> */}
                        {/* </div> */}

                    </Card>
                ))}
            </div>
        </div>
    );
}
