import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className="group rounded-xl border hover:shadow-gray-400 shadow-sm hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
        >
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-medium text-stone-900">
              {product.name}
            </CardTitle>
            <p className="text-stone-700 text-base font-medium">
              ₹{product.price}
            </p>
          </CardHeader>

          <div className="overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
            />
          </div>

          <CardFooter className="p-4">
            <Button
              className="w-full"
              onClick={(e) => {
                e.stopPropagation(); // ← prevents modal from opening
                addToCart(product);
              }}
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{product.name}</DialogTitle>
        </DialogHeader>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 rounded-md object-cover mb-4"
        />

        <p className="text-stone-600 mb-4 text-sm leading-relaxed">
          Delicious handmade bakery item. Freshly baked for you.
        </p>

        <Button
          className="w-full"
          onClick={() => {
            addToCart(product);
            toast.success(`${product.name} added to cart`);
          }}
        >
          Add
        </Button>
      </DialogContent>
    </Dialog>
  );
}
