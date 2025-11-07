import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function AddProductModal({ open, onOpenChange, setProducts }) {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")

  function handleSubmit() {
    const newProduct = {
      id: Date.now(),
      name,
      price,
      category,
      image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500'
    };

    setProducts((prev) => [...prev, newProduct]);
    onOpenChange(false);
    setName('')
    setPrice('')
    setCategory('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">Add Product</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button className="w-full" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
