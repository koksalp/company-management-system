const prisma = require("../config/prisma");

// ---------- helper ----------
const isInvalidString = (v) => typeof v !== "string" || !v.trim();
//CREATE product
const createProduct = async (req, res) => {
  try {
    const { name, category, amount, amountUnit, companyId } = req.body;

    // NAME
    if (isInvalidString(name)) {
      return res.status(400).json({
        message: "invalid name",
      });
    }

    // CATEGORY
    if (isInvalidString(category)) {
      return res.status(400).json({
        message: "invalid category",
      });
    }

    // amount
    if (isInvalidString(amount)) {
      return res.status(400).json({
        message: "invalid amount (must be a non negative integer)",
      });
    }

    // AMOUNT UNIT
    if (isInvalidString(amountUnit)) {
      return res.status(400).json({
        message: "invalid amountUnit",
      });
    }

    // COMPANY ID
    if (isInvalidString(companyId)) {
      return res.status(400).json({
        message: "invalid companyId",
      });
    }

    // AMOUNT (convert + validate integer)
    const parsedAmount = Number(amount);

    if (
      Number.isNaN(parsedAmount) ||
      !Number.isInteger(parsedAmount) ||
      parsedAmount < 0
    ) {
      return res.status(400).json({
        message: "invalid amount (must be a non negative integer)",
      });
    }

    // check company exists
    const company = await prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      return res.status(400).json({
        message: "invalid companyId",
      });
    }

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        category: category.trim(),
        amount: parsedAmount,
        amountUnit: amountUnit.trim(),
        companyId,
      },
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// GET products
const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        company: true,
      },
    });

    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, amount, amountUnit } = req.body;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "invalid product id",
      });
    }

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    const data = {};

    if (name !== undefined) {
      if (isInvalidString(name)) {
        return res.status(400).json({
          message: "invalid name",
        });
      }
      data.name = name.trim();
    }

    if (category !== undefined) {
      if (isInvalidString(category)) {
        return res.status(400).json({
          message: "invalid category",
        });
      }
      data.category = category.trim();
    }

    if (amount !== undefined) {
      if (isInvalidString(String(amount))) {
        return res.status(400).json({
          message: "invalid amount (must be a non negative integer)",
        });
      }
      const parsedAmount = Number(amount);

      // must be a valid integer
      if (
        Number.isNaN(parsedAmount) ||
        !Number.isInteger(parsedAmount) ||
        parsedAmount < 0
      ) {
        return res.status(400).json({
          message: "invalid amount (must be a non negative integer)",
        });
      }

      data.amount = parsedAmount;
    }

    if (amountUnit !== undefined) {
      if (isInvalidString(amountUnit)) {
        return res.status(400).json({
          message: "invalid amountUnit",
        });
      }
      data.amountUnit = amountUnit.trim();
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        message: "no valid fields provided",
      });
    }

    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// DELETE product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        message: "invalid product id",
      });
    }

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        message: "product not found",
      });
    }

    await prisma.product.delete({
      where: { id },
    });

    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
