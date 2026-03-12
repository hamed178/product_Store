import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    set(() => ({ loading: true }));
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "please fill in all filds" };
    }
    const res = await fetch(
      "https://product-store-mz79.vercel.app/api/products",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      },
    );
    const data = await res.json();
    set((state) => ({
      products: [...state.products, data.data.data],
      loading: false,
    }));
    return { success: true, message: "Product created " };
  },
  fetchProducts: async () => {
    const res = await fetch(
      "https://product-store-mz79.vercel.app/api/products",
    );
    const data = await res.json();
    set({ products: data.data.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(
      `https://product-store-mz79.vercel.app/api/products/${id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    if (data.success) {
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));
      return { success: true, message: "Product deleted" };
    }
    return { success: false, message: data.status };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(
      `https://product-store-mz79.vercel.app/api/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      },
    );
    const data = await res.json();
    if (data.status === "success") {
      set((state) => ({
        products: state.products.map((p) =>
          p._id === id ? data.data.data : p,
        ),
      }));
      return { success: true, message: "Product updated" };
    } else {
      return { success: false, message: "Can't Updated" };
    }
  },
}));
