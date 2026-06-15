import { useState } from "react";
import BackgroundOverlay from "../background/BackgroundOverlay";
import {
  updateProduct,
  deleteProduct,
} from "../../../services/productService";
import styles from "./ProductEditor.module.css";
import { useToast } from "../../../context/toast/ToastContext";

export default function ProductEditor({
  open,
  product,
  companies,
  onClose,
}) {
  const toast = useToast();

  const [updatedProduct, setUpdatedProduct] = useState(
    product
      ? {
          id: product.id,
          name: product.name || "",
          category: product.category || "",
          amount: product.amount || "",
          amountUnit: product.amountUnit || "",
          companyId: product.companyId || "",
        }
      : null
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateProduct(product.id, updatedProduct);

      toast.success("Product updated successfully");

      onClose?.();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update product"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);

      toast.success("Product deleted successfully");

      onClose?.();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to delete product"
      );
    }
  };

  if (!open || !product || !updatedProduct) return null;

  return (
    <BackgroundOverlay open={open} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Product Editor
        </h2>

        {Object.keys(updatedProduct)
          .filter((key) => key !== "id" && key !== "companyId") 
          .map((key) => (
            <input
              key={key}
              className={styles.input}
              name={key}
              value={updatedProduct[key] ?? ""}
              onChange={handleChange}
              placeholder={key}
            />
          ))}

        <div className={styles.actions}>
          <button
            className={styles.updateBtn}
            onClick={handleUpdate}
          >
            Update
          </button>

          <button
            className={styles.deleteBtn}
            onClick={handleDelete}
          >
            Delete
          </button>

          <button
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </BackgroundOverlay>
  );
} 
