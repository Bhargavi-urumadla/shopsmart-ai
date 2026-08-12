import API from "../api/api";

export interface Product {
  _id: string;
  name: string;
  description: string;
  category: string;
  productType: string;
  brand: string;
  price: number;
  image: string;
  stock: number;
  rating: number;

  battery?: string;
  camera?: string;
  display?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  color?: string;
  weight?: string;

  tags?: string[];

  isFeatured: boolean;
  isActive: boolean;
}

export interface ProductResponse {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const getProducts = async (
  page = 1,
  search = "",
  category = ""
): Promise<ProductResponse> => {
  const { data } = await API.get("/products", {
    params: {
      page,
      search,
      category,
    },
  });

  return {
    products: data.data,
    pagination: data.pagination,
  };
};

export const addProduct = async (product: any) => {
  const { data } = await API.post(
    "/products",
    product
  );

  return data;
};

export const updateProduct = async (
  id: string,
  product: any
) => {
  const { data } = await API.put(
    `/products/${id}`,
    product
  );

  return data;
};

export const deleteProduct = async (
  id: string
) => {
  const { data } = await API.delete(
    `/products/${id}`
  );

  return data;
};