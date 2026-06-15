import { useData } from "../../context/data/DataContext";
import styles from "./Dashboard.module.css";

const numberOfLatestCompanies=3; 

export default function Dashboard() {
  const { companies } = useData();

  const totalCompanies = companies.length;

  const totalProducts = companies.reduce(
    (sum, company) => sum + (company.products?.length || 0),
    0
  );

  const latestCompanies = [...companies]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, numberOfLatestCompanies);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Dashboard</h1>

      <div className={styles.stats}>
        <div className={styles.card}>
          <h3>Total Companies</h3>
          <p>{totalCompanies}</p>
        </div>

        <div className={styles.card}>
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className={styles.card}>
          <h3>Status</h3>
          <p>Live</p>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Latest Companies</h2>

        {latestCompanies.length === 0 ? (
          <p className={styles.empty}>No companies available</p>
        ) : (
          <div className={styles.list}>
            {latestCompanies.map((company) => (
              <div key={company.id} className={styles.item}>
                <div>
                  <h4>{company.name}</h4>
                  <span>{company.incorporationCountry}</span>
                </div>

                <div className={styles.badge}>
                  {company.legalNumber}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 

