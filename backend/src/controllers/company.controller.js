const prisma = require('../config/prisma');

// ---------- helper ----------
const isInvalidString = (v) => typeof v !== 'string' || !v.trim();

const createCompany = async (req, res) => {
  try {
    const { name, legalNumber, incorporationCountry, website } = req.body;

    if (
      isInvalidString(name) ||
      isInvalidString(legalNumber) ||
      isInvalidString(incorporationCountry)
    ) {
      return res.status(400).json({
        message: 'invalid input data'
      });
    }

    const existing = await prisma.company.findUnique({
      where: { legalNumber: legalNumber.trim() }
    });

    if (existing) {
      return res.status(400).json({
        message: 'Company already exists'
      });
    }

    const company = await prisma.company.create({
      data: {
        name: name.trim(),
        legalNumber: legalNumber.trim(),
        incorporationCountry: incorporationCountry.trim(),
        website:
          typeof website === 'string' && website.trim()
            ? website.trim()
            : null
      }
    });

    return res.status(201).json(company);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await prisma.company.findMany({
      include: { products: true }
    });

    return res.json(companies);
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};
const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, incorporationCountry, website } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "invalid company id" });
    }

    const existingCompany = await prisma.company.findUnique({
      where: { id },
    });

    if (!existingCompany) {
      return res.status(404).json({
        message: "company not found",
      });
    }

    const data = {};

    if (!isInvalidString(name)) data.name = name.trim();

    if (!isInvalidString(incorporationCountry)) {
      data.incorporationCountry = incorporationCountry.trim();
    }

    if (website !== undefined) {
      data.website = website?.trim() || null;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "no valid fields provided",
      });
    }

    const company = await prisma.company.update({
      where: { id },
      data,
    });

    return res.json(company);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ message: 'invalid company id' });
    }

    const exists = await prisma.company.findUnique({
      where: { id }
    });

    if (!exists) {
      return res.status(404).json({
        message: 'Company not found'
      });
    }

    await prisma.company.delete({
      where: { id }
    });

    return res.json({ message: 'Company deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany
}; 

