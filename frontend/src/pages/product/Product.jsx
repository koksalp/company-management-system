import { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

import { useData } from "../../context/data/DataContext";
import ProductEditor from "../../components/popup/productPopup/ProductsEditor";
import CreateProduct from "../../components/popup/productPopup/CreateProduct";

import styles from "./Product.module.css";

export default function Product() {
  const { getProducts, companies } = useData();

  const products = useMemo(() => {
    return getProducts();
  }, [companies]);

  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const handleEditOpen = (product) => {
    setSelectedProduct(product);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedProduct(null);
  };

  const rows = useMemo(() => {
    return products
      .filter((p) => {
        const v = search.toLowerCase();

        return (
          p.name?.toLowerCase().includes(v) ||
          p.category?.toLowerCase().includes(v)
        );
      })
      .map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        amount: p.amount,
        amountUnit: p.amountUnit,
        company:
          companies.find((c) => c.id === p.companyId)?.name ||
          "Unknown",
        raw: p,
      }));
  }, [products, search, companies]);

  const columns = [
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
    },
    {
      field: "amountUnit",
      headerName: "Unit",
      flex: 1,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <button
          className={styles.editBtn}
          onClick={() => handleEditOpen(params.row.raw)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Products</h1>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className={styles.addBtn}
          onClick={() => setOpenCreate(true)}
        >
          <AddIcon />
        </button>
      </div>

      <div className={styles.table}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          disableRowSelectionOnClick
        />
      </div>

      {openEdit && (
        <ProductEditor
          open={openEdit}
          product={selectedProduct}
          companies={companies}
          onClose={handleEditClose}
        />
      )}

      {openCreate && (
        <CreateProduct
          open={openCreate}
          companies={companies}
          onClose={() => setOpenCreate(false)}
        />
      )}
    </div>
  );
}