import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useProducts, useCreateProduct, useUpdateProduct } from "@/hooks/useProducts";
import { useForm } from "react-hook-form";
import type { ProductRequest } from "@/types";
import { Plus, Pencil, X } from "lucide-react";

export const Route = createFileRoute("/_dashboard/products")({
  component: ProductsPage,
});

function ProductsPage() {
  const { data: products, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductRequest>();

  const openCreate = () => {
    setEditId(null);
    reset({});
    setModalOpen(true);
  };

  const openEdit = (product: NonNullable<typeof products>[number]) => {
    setEditId(product.id);
    reset({ name: product.name, sku: product.sku, price: product.price, status: product.status });
    setModalOpen(true);
  };

  const onSubmit = (data: ProductRequest) => {
    if (editId) {
      updateProduct.mutate({ id: editId, data }, { onSuccess: () => setModalOpen(false) });
    } else {
      createProduct.mutate(data, { onSuccess: () => setModalOpen(false) });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Name</th>
              <th className="text-left px-4 py-3 font-medium">SKU</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Price</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-border">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                      </td>
                    ))}
                  </tr>
                ))
              : products?.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{p.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.sku || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.categoryName || "—"}</td>
                    <td className="px-4 py-3">${p.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        p.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => openEdit(p)}
                        className="p-1.5 hover:bg-accent rounded-md text-muted-foreground"
                        aria-label="Edit product"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{editId ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setModalOpen(false)} className="p-1 hover:bg-accent rounded-md">
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">SKU</label>
                <input
                  {...register("sku")}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price *</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("price", { required: "Price is required", valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.price && <p className="text-destructive text-xs mt-1">{errors.price.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2 border border-input rounded-md text-sm hover:bg-accent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createProduct.isPending || updateProduct.isPending}
                  className="flex-1 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 disabled:opacity-50"
                >
                  {editId ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
