const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// ---------- CLI VALIDATION ----------
function parsePositiveInt(value, name) {
  const num = Number(value);

  if (!Number.isInteger(num)) {
    throw new Error(`${name} must be an integer`);
  }

  if (num <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }

  return num;
}

const companyCount = parsePositiveInt(process.argv[2], "companyCount");
const maxProducts = parsePositiveInt(process.argv[3], "maxProducts");

// ---------- helpers ----------
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------- data pools ----------
const companyNames = [
  "TechNova",
  "SoftWorks",
  "CloudSphere",
  "DataForge",
  "NextGen Labs",
  "CyberPulse",
  "BlueOcean Systems",
  "QuantumEdge",
  "NetWise",
  "CoreVision",
];

const countries = [
  "USA",
  "Germany",
  "UK",
  "Canada",
  "France",
  "Japan",
  "Turkey",
  "Netherlands",
];

const productNames = [
  "Analytics Platform",
  "CRM System",
  "Cloud Storage",
  "AI Engine",
  "E-commerce Suite",
  "Billing System",
  "Monitoring Tool",
  "DevOps Platform",
  "Data Warehouse",
  "Security Suite",
];

const categories = [
  "Software",
  "Infrastructure",
  "Business",
  "AI",
  "Security",
  "Analytics",
];

// ---------- main ----------
async function main() {
  await prisma.product.deleteMany();
  await prisma.company.deleteMany();

  const usedCompanyNames = new Set();
  const usedProductNames = new Set();

  for (let i = 0; i < companyCount; i++) {
    // unique company name
    let companyName;
    do {
      companyName = `${pick(companyNames)} ${rand(1, 999)}`;
    } while (usedCompanyNames.has(companyName));

    usedCompanyNames.add(companyName);

    const productCount = rand(1, maxProducts);

    const products = [];

    for (let j = 0; j < productCount; j++) {
      // unique product name
      let productName;
      do {
        productName = `${pick(productNames)} ${rand(100, 999)}`;
      } while (usedProductNames.has(productName));

      usedProductNames.add(productName);

      products.push({
        name: productName,
        category: pick(categories),
        amount: rand(5000, 50000),
        amountUnit: "USD",
      });
    }

    await prisma.company.create({
      data: {
        name: companyName,
        legalNumber: `LN-${rand(1000, 9999)}-${i}`,
        incorporationCountry: pick(countries),
        website: `https://${companyName.replace(/\s/g, "").toLowerCase()}.com`,
        products: {
          create: products,
        },
      },
    });
  }

  console.log(
    `Seed complete: ${companyCount} companies, max ${maxProducts} products each`,
  );
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
