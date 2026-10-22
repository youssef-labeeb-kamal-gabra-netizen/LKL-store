import { Product } from "@/types/product";
import { INITIAL_PRODUCTS } from "@/data/catalog";

declare global {
  var __lkl_products_store: Product[] | undefined;
}

export function getProductsStore(): Product[] {
  if (!global.__lkl_products_store) {
    global.__lkl_products_store = [...INITIAL_PRODUCTS];
  }
  return global.__lkl_products_store;
}

export function addProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Product {
  const store = getProductsStore();
  const newProduct: Product = {
    ...productData,
    id: `prod-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  store.unshift(newProduct);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Omit<Product, "id" | "createdAt">>): Product | null {
  const store = getProductsStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return null;

  store[index] = {
    ...store[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  return store[index];
}

export function deleteProduct(id: string): boolean {
  const store = getProductsStore();
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}

export function toggleProductPublished(id: string): Product | null {
  const store = getProductsStore();
  const product = store.find((p) => p.id === id);
  if (!product) return null;
  product.published = !product.published;
  product.updatedAt = new Date().toISOString();
  return product;
}
