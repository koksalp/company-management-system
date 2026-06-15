import api from "../api/axios";

export const getProducts = async () => {
  const res = await api.get("/product");
  return res.data;
};

export const createProduct = async (productData) => {
  const res = await api.post("/product", productData);
  return res.data;
};

export const updateProduct = async (id, productData) => {
  const res = await api.put(`/product/${id}`, productData);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await api.delete(`/product/${id}`);
  return res.data;
};
