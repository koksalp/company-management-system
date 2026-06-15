import { useState } from "react";
import BackgroundOverlay from "../background/BackgroundOverlay";
import { createProduct } from "../../../services/productService";
import { useToast } from "../../../context/toast/ToastContext";
import styles from "./CreateProduct.module.css";

export default function CreateProduct({ open, onClose, companies }) {
  const toast = useToast();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    amount: "",
    amountUnit: "",
    companyId: "",
  });

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    try {
      await createProduct(product);

      toast.success("Product created successfully");

      setProduct({
        name: "",
        category: "",
        amount: "",
        amountUnit: "",
        companyId: "",
      });

      onClose?.();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create product"
      );
    }
  };
if (!open) return null; 
  return (
    <BackgroundOverlay open={open} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Create Product</h2>

        <input
          className={styles.input}
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          name="amount"
          placeholder="Amount"
          type="number"
          value={product.amount}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          name="amountUnit"
          placeholder="Amount Unit"
          value={product.amountUnit}
          onChange={handleChange}
        />

        <select
          className={styles.input}
          name="companyId"
          value={product.companyId}
          onChange={handleChange}
        >
          <option value="">Select Company</option>
          {companies?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className={styles.actions}>
          <button className={styles.createBtn} onClick={handleCreate}>
            Create
          </button>

          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </BackgroundOverlay>
  );
} 
