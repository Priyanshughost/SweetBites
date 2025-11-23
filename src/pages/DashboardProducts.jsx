import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useProducts } from "@/context/ProductContext";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function DashboardProducts() {
    const { products, setProducts, deleteProduct, uploading, setUploading } = useProducts();
    const [editOpen, setEditOpen] = useState(false);
    const [editData, setEditData] = useState({ id: null, name: "", price: "", category: "", image: "" });
    const [newOpen, setNewOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "", image: "", file: null })
    const formdata = new FormData()

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("none");

    const filtered = products
        .filter((p) => p?.name.toLowerCase().includes(search.toLowerCase()))
        .filter((p) => (category === "all" ? true : p?.category === category))
        .sort((a, b) => {
            if (sort === "low") return a.price - b.price;
            if (sort === "high") return b.price - a.price;

            if (sort === "latest") {
                // Only works if you have timestamps in backend
                return new Date(b.createdAt) - new Date(a.createdAt);
            }

            return 0;
        });

    function startEdit(product) {
        setEditData(product);
        setEditOpen(true);
    }

    function handleSubmit() {
  if (!newProduct.name || !newProduct.price || !newProduct.category || !newProduct.file) {
    toast.error("All fields are required");
    return;
  }

  const form = new FormData();
  form.append("name", newProduct.name);
  form.append("price", newProduct.price);
  form.append("category", newProduct.category);
  form.append("file", newProduct.file);

  setUploading(true);

  axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/admin/upload`,
    form,
    { withCredentials: true }
  )
    .then(res => {
      toast.success(res.data.message);
      setProducts(prev => [...prev, res.data.product]);
      setNewProduct({ name: "", price: "", category: "", image: "", file: null });
      setNewOpen(false);
    })
    .catch(e => {
      toast.error(e.response?.data?.message || "Upload Failed");
    })
    .finally(() => setUploading(false));
}


    function editProduct() {
  if (!editData._id) return;

  const form = new FormData();
  form.append("name", editData.name);
  form.append("price", editData.price);
  form.append("category", editData.category);

  if (editData._file) {
    form.append("file", editData._file);
  }

  setUploading(true);

  axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/admin/updateProduct/${editData._id}`,
    form,
    { withCredentials: true }
  )
    .then(res => {
      setProducts(prev =>
        prev.map(p => (p._id === editData._id ? res.data?.prod : p))
      );
      toast.success(res.data?.message);
      setEditOpen(false);
    })
    .catch(e => {
      toast.error(e.response?.data?.message || "Update failed");
    })
    .finally(() => setUploading(false));
}



    function getAllProducts() {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getAllProducts`)
            .then(res => {
                // console.log(res.data.products)
                setProducts(res.data.products)
            })
            .catch(e => {
                toast.error(e.response.data.message)
            })
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <div className="min-w-full mx-auto px-2 sm:px-6 py-6">
            {uploading ?
                <Spinner className="mx-auto" />
                :
                <>

                    <div className="w-full flex flex-row flex-wrap justify-between items-center mb-8 gap-6">
                        <h1 className="text-3xl font-semibold">Manage Products</h1>

                        <Dialog open={newOpen} onOpenChange={setNewOpen}>
                            <DialogTrigger asChild>
                                <Button>Add Product</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle>Add New Product</DialogTitle>
                                    <DialogDescription />
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
                                    {/* Image Upload */}
                                    <div className="space-y-2">
                                        <div className="grid w-full max-w-sm items-center gap-3">
                                            <Label htmlFor="picture">Product Image</Label>

                                            <Input
                                                id="picture"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    const previewUrl = URL.createObjectURL(file);

                                                    setNewProduct({
                                                        ...newProduct,
                                                        image: previewUrl,  // this is ONLY for preview
                                                        file: file         // store actual file separately
                                                    });
                                                }}
                                            />
                                        </div>

                                        {/* Preview */}
                                        {newProduct.image && (
                                            <img
                                                src={newProduct.image}
                                                alt="Preview"
                                                className="w-full h-40 object-cover rounded-md border"
                                            />
                                        )}
                                    </div>

                                    <Button className="w-full" onClick={() => {
                                        formdata.append("name", newProduct.name)
                                        formdata.append("price", newProduct.price)
                                        formdata.append("category", newProduct.category)
                                        formdata.append("file", newProduct.file)

                                        handleSubmit()
                                    }}>
                                        Save Product
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {products.length ?
                        <>
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                <Input
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="sm:w-1/3"
                                />

                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger className="sm:w-1/3">
                                        <SelectValue placeholder="Filter by category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        {Array.from(new Set(products.map((p) => p?.category || "uncategorized"))).map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select value={sort} onValueChange={setSort}>
                                    <SelectTrigger className="sm:w-1/3">
                                        <SelectValue placeholder="Sort by price" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">Default</SelectItem>
                                        <SelectItem value="low">Price: Low → High</SelectItem>
                                        <SelectItem value="high">Price: High → Low</SelectItem>
                                        <SelectItem value="latest">Latest Products</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filtered.map((product) => (
                                    <Card key={product._id} className="rounded-xl border shadow-sm overflow-hidden">
                                        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />

                                        <div className="p-4 space-y-1">
                                            <h3 className="text-lg font-semibold">{product.name}</h3>
                                            <p className="text-sm text-stone-500">{product.category}</p>
                                            <p className="text-base font-medium mt-2">₹{product.price}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 p-4 pt-0">
                                            <Button variant="secondary" size="sm" onClick={() => startEdit(product)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => deleteProduct(product._id)}>
                                                Delete
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </>
                        :
                        <p className="text-center text-stone-500">No items posted yet.</p>
                    }

                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Edit Product</DialogTitle>
                                <DialogDescription />
                            </DialogHeader>
                            <div className="space-y-4">
                                <Input
                                    placeholder="Product Name"
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                />
                                <Input
                                    placeholder="Price"
                                    type="number"
                                    value={editData.price}
                                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                />
                                <Input
                                    placeholder="Category"
                                    value={editData.category}
                                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                                />
                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (!file) return;

                                            const preview = URL.createObjectURL(file);

                                            setEditData({
                                                ...editData,
                                                image: preview,
                                                _file: file
                                            });
                                        }}
                                        className="border rounded-md p-2 w-full"
                                    />

                                    {/* Preview */}
                                    {editData.image && (
                                        <img
                                            src={editData.image}
                                            alt="Preview"
                                            className="w-full h-40 object-cover rounded-md border"
                                        />
                                    )}
                                </div>

                                <Button className="w-full" onClick={editProduct}>
                                    Save Changes
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </>}
        </div>
    );
}

