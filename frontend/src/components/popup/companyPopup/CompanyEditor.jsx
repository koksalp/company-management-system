import { useState } from "react";
import BackgroundOverlay from "../background/BackgroundOverlay";
import { updateCompany, deleteCompany } from "../../../services/companyService";
import styles from "./CompanyEditor.module.css";
import { useToast } from "../../../context/toast/ToastContext";

export default function CompanyEditor({ open, company, onClose }) {
  const toast = useToast();

  const [updatedCompany, setUpdatedCompany] = useState(
    company
      ? {
          id: company.id,
          name: company.name || "",
          legalNumber: company.legalNumber || "",
          incorporationCountry: company.incorporationCountry || "",
          website: company.website || "" 
        }
      : null,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdatedCompany((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateCompany(company.id, updatedCompany);

      toast.success("Company updated successfully");

      onClose?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update company");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCompany(company.id);

      toast.success("Company deleted successfully");

      onClose?.();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete company");
    }
  };

  if (!open || !company || !updatedCompany) return null;
  
  return (
    <BackgroundOverlay open={open} onClose={onClose}>
      <div className={styles.container}>
        <h2 className={styles.title}>Company Editor</h2>

        {Object.keys(updatedCompany)
          .filter((key) => key !== "id")
          .map((key) => (
            <input
              key={key}
              className={styles.input}
              name={key}
              value={updatedCompany[key] ?? ""}
              onChange={handleChange}
              placeholder={key}
            />
          ))}

        <div className={styles.actions}>
          <button className={styles.updateBtn} onClick={handleUpdate}>
            Update
          </button>

          <button className={styles.deleteBtn} onClick={handleDelete}>
            Delete
          </button>

          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </BackgroundOverlay>
  );
}
