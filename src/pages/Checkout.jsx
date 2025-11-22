import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

export default function Checkout() {
  const { cart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState("pickup");
  const [address, setAddress] = useState("");

  const total = cart?.reduce((sum, i) => sum + i.product?.price * i.quantity, 0);

  function submitOrder() {
    if (!name || !phone) return;

    // const itemLines = cart?.map((i) => `${i.product?.name} x${i.quantity} - ₹${i.product?.price * i.quantity}`).join("\n");

  }
  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>

      {cart.length === 0 && (
        <p className="text-stone-600 text-center">Your cart is empty.</p>
      )}

      {cart.length > 0 && (
        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT — FORM */}
          <div className="lg:col-span-2 space-y-6">

            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
            </div>

            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="WhatsApp Number" />
            </div>

            <div className="space-y-3">
              <Label>Order Method</Label>
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 rounded-md text-sm border transition ${method === "pickup" ? "bg-stone-900 text-white" : "bg-stone-100"
                    }`}
                  onClick={() => setMethod("pickup")}
                >
                  Pickup
                </button>
                <button
                  className={`px-4 py-2 rounded-md text-sm border transition ${method === "delivery" ? "bg-stone-900 text-white" : "bg-stone-100"
                    }`}
                  onClick={() => setMethod("delivery")}
                >
                  Delivery
                </button>
              </div>
            </div>

            {method === "delivery" && (
              <div className="space-y-2">
                <Label>Delivery Address</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="House / Street / Area" />
              </div>
            )}

          </div>

          {/* RIGHT — SUMMARY */}
          <Card className="rounded-xl border bg-white shadow-sm w-full max-w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold tracking-tight">Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
              {cart?.length > 0 ? (
                cart?.map((item) => (
                  <div key={item.product?._id} className="flex justify-between">
                    <span className="truncate">{item.product?.name} x{item.quantity}</span>
                    <span className="font-medium">₹{item.product?.price * item.quantity}</span>
                  </div>
                ))
              ) : (
                <p className="text-stone-500 text-sm">Your cart is empty.</p>
              )}

              <Separator className="my-4" />

              <div className="flex justify-between font-medium text-base">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </CardContent>

            <CardFooter className="pt-4">
              <Button className="w-full whitespace-nowrap bg-stone-900 hover:bg-stone-950" size="lg" onClick={submitOrder}>
                Confirm Order
              </Button>
            </CardFooter>
          </Card>

        </div>
      )}
    </div>
  );
}