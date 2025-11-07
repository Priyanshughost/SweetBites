import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function Cart() {
    const { cart, addToCart, removeFromCart, decreaseQuantity } = useCart();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

            <h1 className="text-3xl font-semibold mb-10">Your Cart</h1>

            {cart.length === 0 && (
                <p className="text-stone-600 text-center">Your cart is empty.</p>
            )}

            {cart.length > 0 && (
                <div className="grid lg:grid-cols-3 gap-12">

                    {/* LEFT: Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-wrap gap-4 items-center border-b pb-6">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-24 h-24 object-cover rounded-md"
                                />

                                <div className="flex-1">
                                    <h2 className="text-lg font-medium text-stone-900">{item.name}</h2>
                                    <p className="text-stone-600 text-sm">₹{item.price}</p>

                                    <div className="flex items-center gap-3 mt-3">
                                        <Button size="sm" variant="outline" onClick={() => decreaseQuantity(item.id)}>-</Button>
                                        <span>{item.quantity}</span>
                                        <Button size="sm" variant="outline" onClick={() => addToCart(item)}>+</Button>
                                    </div>
                                </div>

                                <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Summary */}
                    <Card className="rounded-xl border bg-white shadow-sm w-full max-w-full">
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
                            <Button asChild size="sm" className="w-full whitespace-nowrap bg-stone-900 hover:bg-stone-950">
                                <Link to="/checkout">Proceed to Checkout</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                </div>
            )}

        </div>
    );
}
