import axios from "axios";

const API_BASE_URL = "http://localhost:62448/api/products";

export const fetchProducts = async (params) => {
  const response = await axios.get(API_BASE_URL, { params });
  if (response.status !== 200) {
    throw new Error("Failed to fetch products");
  }
  return response.data;
};

export const fetchProductDetails = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/${productId}`);
  if (response.status !== 200) {
    throw new Error("Failed to fetch product details");
  }
  return response.data;
};
