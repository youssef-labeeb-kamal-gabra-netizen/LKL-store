import { Category } from "@/types/product";
import { CATEGORIES } from "@/data/catalog";

declare global {
  var __lkl_categories_store: Category[] | undefined;
}

export function getCategoriesStore(): Category[] {
  if (!global.__lkl_categories_store) {
    global.__lkl_categories_store = [...CATEGORIES];
  }
  return global.__lkl_categories_store;
}

export function addCategory(data: Omit<Category, "id">): Category {
  const store = getCategoriesStore();
  const newCat: Category = {
    ...data,
    id: `cat-${Date.now()}`,
  };
  store.push(newCat);
  return newCat;
}

export function updateCategory(id: string, updates: Partial<Omit<Category, "id">>): Category | null {
  const store = getCategoriesStore();
  const index = store.findIndex((c) => c.id === id);
  if (index === -1) return null;
  store[index] = { ...store[index], ...updates };
  return store[index];
}

export function deleteCategory(id: string): boolean {
  const store = getCategoriesStore();
  const index = store.findIndex((c) => c.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
