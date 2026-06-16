import { useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useData } from "../../context/data/DataContext";
import CompanyEditor from "../../components/popup/companyPopup/CompanyEditor";
import styles from "./Company.module.css";
import AddIcon from "@mui/icons-material/Add";
import CreateCompany from "../../components/popup/companyPopup/CreateCompany";

export default function Company() {
  const { companies } = useData();

  const [search, setSearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const handleOpen = (company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCompany(null);
  };

  const rows = useMemo(() => {
    return companies
      .filter((c) => {
        const value = search.toLowerCase();

        return (
          c.name?.toLowerCase().includes(value) ||
          c.legalNumber?.toLowerCase().includes(value) ||
          c.incorporationCountry?.toLowerCase().includes(value)
        );
      })
      .map((c) => ({
        id: c.id,
        name: c.name,
        legalNumber: c.legalNumber,
        country: c.incorporationCountry,
        website: c.website,
        raw: c,
      }));
  }, [companies, search]);

  const columns = [
    {
      field: "name",
      headerName: "Company Name",
      flex: 1,
      sortable: true,
    },
    {
      field: "legalNumber",
      headerName: "Legal Number",
      flex: 1,
      sortable: true,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      sortable: true,
    },
    {
      field: "website",
      headerName: "Website",
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noreferrer">
          {params.value}
        </a>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <button
          className={styles.editBtn}
          onClick={() => handleOpen(params.row.raw)}
        >
          Edit
        </button>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Companies</h1>

      <div className={styles.toolbar}>
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
        <button className={styles.addBtn} onClick={() => setCreateOpen(true)}>
          <AddIcon fontSize="small" />
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

      {open && selectedCompany && (
        <CompanyEditor
          open={open}
          company={selectedCompany}
          onClose={handleClose}
        />
      )}
      <CreateCompany open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
