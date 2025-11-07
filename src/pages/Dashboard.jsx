import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Dashboard() {
  const { products, setProducts, deleteProduct } = useProducts();
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", image: "" });

  function addProduct() {
    if (!newProduct.name || !newProduct.price) return;
    setProducts(prev => [...prev, { id: Date.now(), ...newProduct, price: Number(newProduct.price), quantity: 1 }]);
    setNewProduct({ name: "", price: "", category: "", image: "" });
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-stone-900">Dashboard</h1>

        {/* Add Product Modal */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                placeholder="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
              <Input
                placeholder="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                value={newProduct.image}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />

              <Button className="w-full" onClick={addProduct}>
                Save Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Product List */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.category || "-"}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell className="text-right">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this product?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. The item will be removed permanently.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteProduct(p.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {products.length === 0 && (
        <p className="text-center text-stone-500 mt-10">No products yet.</p>
      )}
    </div>
  );
}
