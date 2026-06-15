import { useState } from "react";
import BackgroundOverlay from "../background/BackgroundOverlay";
import { createCompany } from "../../../services/companyService";
import { useToast } from "../../../context/toast/ToastContext";
import styles from "./CreateCompany.module.css";

export default function CreateCompany({
  open,
  onClose,
}) {
  const toast = useToast();

  const [company, setCompany] = useState({
    name: "",
    legalNumber: "",
    incorporationCountry: "",
    website: "" 
  });

  if (!open) return null;

  const handleChange = (e) => {
    setCompany((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    try {
      await createCompany(company);

      toast.success("Company created successfully");

      setCompany({
        name: "",
        legalNumber: "",
        incorporationCountry: "",
      });

      onClose?.();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to create company"
      );
    }
  };

  return (
    <BackgroundOverlay
      open={open}
      onClose={onClose}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          Create Company
        </h2>

        <input
          className={styles.input}
          name="name"
          placeholder="Company Name"
          value={company.name}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          name="legalNumber"
          placeholder="Legal Number"
          value={company.legalNumber}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          name="incorporationCountry"
          placeholder="Country"
          value={company.incorporationCountry}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          name="website"
          placeholder="Website"
          value={company.website}
          onChange={handleChange}
        />

        <div className={styles.actions}>
          <button
            className={styles.createBtn}
            onClick={handleCreate}
          >
            Create
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