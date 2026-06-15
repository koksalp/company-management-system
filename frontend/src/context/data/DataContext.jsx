import { createContext, useContext, useEffect, useState } from "react";
import { getCompanies } from "../../services/companyService";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  
  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data);
    } catch (err) {
      console.error("Failed to load companies", err);
    }
  };

  useEffect(() => {
    fetchCompanies();

    const interval = setInterval(() => {
      fetchCompanies();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // We don't store products the same way we store companies repeatedly due to performance reasons.
  function getProducts() {
    const products = [];

    for (const company of companies) {
      if (!company.products || company.products.length === 0) continue;

      for (const product of company.products) {
        products.push({
          ...product,
        });
      }
    }

    return products;
  }
  return (
    <DataContext.Provider
      value={{
        companies,
        getProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
