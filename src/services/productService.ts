
import { supabase } from "@/integrations/supabase/client";
import { Product, ProductCategory } from "@/lib/types";

export const fetchProductCategories = async (): Promise<ProductCategory[]> => {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*');
  
  if (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
  
  return data.map(category => ({
    id: category.id,
    name: category.name,
    icon: category.icon
  }));
};

export const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  
  return data.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    categoryId: product.category_id,
    image: product.image
  }));
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId);
  
  if (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
  
  return data.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    categoryId: product.category_id,
    image: product.image
  }));
};
