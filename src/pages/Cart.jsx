import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function Cart() {
    const { cart, setCart, getCart, updateCartItem, removeFromCart } = useCart();
    const user = JSON.parse(localStorage.getItem("user"));

    function handlePlaceOrder() {
        const payload = {
            userId: user?._id,
            items: cart?.map(item => ({
                productId: item.product?._id,
                quantity: item.quantity
            }))
        }

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/order`, payload, { withCredentials: true })
            .then(res => {
                toast.success(res.data?.message)
                setCart([])
            })
            .catch(e => {
                toast.error(e.response.data?.message)
            })

    }


    useEffect(() => {
        if (!cart?.length) {
            getCart()
        }
    }, [])
    const total = cart?.reduce((sum, item) => sum + item.product?.price * item.quantity, 0);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

            <h1 className="text-3xl font-semibold mb-10">Your Cart</h1>

            {cart.length === 0 && (
                <p className="text-stone-600 text-center">Your cart is empty.</p>
            )}

            {cart?.length > 0 && (
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* LEFT: Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.product?._id} className="flex flex-wrap gap-4 items-center border-b pb-6">
                                <img
                                    src={item.product?.imageUrl}
                                    alt={item.product?.name}
                                    className="w-24 h-24 object-cover rounded-md"
                                />

                                <div className="flex-1">
                                    <h2 className="text-lg font-medium text-stone-900">{item.product?.name}</h2>
                                    <p className="text-stone-600 text-sm">₹{item.product?.price}</p>

                                    <div className="flex items-center gap-3 mt-3">
                                        <Button size="sm" variant="outline" onClick={() => updateCartItem(item.product?._id, -1)}>-</Button>
                                        <span>{item.quantity}</span>
                                        <Button size="sm" variant="outline" onClick={() => updateCartItem(item.product?._id, 1)}>+</Button>
                                    </div>
                                </div>

                                <Button className="drop-shadow-xl drop-shadow-gray-500 hover:drop-shadow-sm" variant="destructive" size="sm" onClick={() => removeFromCart(item.product)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Summary */}
                    <Card className="rounded-xl shadow-gray-400 shadow-xl border bg-white w-full max-w-full">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-semibold tracking-tight">Order Summary</CardTitle>
                        </CardHeader>

                        <CardContent className="text-sm space-y-4">
                            <div className="flex justify-between text-stone-700">
                                <span>Subtotal</span>
                                <span className="font-medium">₹{total}</span>
                            </div>

                            <Separator />

                            <div className="flex justify-between text-stone-500 text-xs">
                                <span>Taxes & Charges</span>
                                <span>Included</span>
                            </div>
                        </CardContent>

                        <CardFooter className="pt-4">
                            <Button
                                size="sm"
                                className="w-full bg-stone-900 hover:bg-stone-950"
                                onClick={handlePlaceOrder}
                            >
                                Place Order
                            </Button>
                        </CardFooter>
                    </Card>

                </div>
            )}

        </div>
    );
}

