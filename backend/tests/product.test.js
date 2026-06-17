const request = require("supertest");
const app = require("../src/app");

describe("Product Controller", () => {
  const user = {
    username: `product_user_${Date.now()}`,
    password: "Test12345!",
  };

  let cookie;
  let companyId;
  let productId;

  // ---------------- AUTH ----------------
  test("register user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(user);

    expect(res.statusCode).toBe(201);
  });

  test("login user and get cookie", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(user);

    expect(res.statusCode).toBe(200);

    cookie = res.headers["set-cookie"];
  });

  // ---------------- COMPANY (needed for product) ----------------
  test("create company for product", async () => {
    const res = await request(app)
      .post("/company")
      .set("Cookie", cookie)
      .send({
        name: "Test Company",
        legalNumber: `LC_${Date.now()}`,
        incorporationCountry: "USA",
        website: "https://test.com",
      });

    expect(res.statusCode).toBe(201);

    companyId = res.body.id;
  });

  // ---------------- CREATE ----------------
  test("create product", async () => {
    const res = await request(app)
      .post("/product")
      .set("Cookie", cookie)
      .send({
        name: "Test Product",
        category: "Electronics",
        amount: "10", 
        amountUnit: "pcs",
        companyId: companyId,
      });

    expect(res.statusCode).toBe(201);

    productId = res.body.id;
  });

  // ---------------- GET ----------------
  test("get products", async () => {
    const res = await request(app)
      .get("/product")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });

  // ---------------- UPDATE ----------------
  test("update product", async () => {
    const res = await request(app)
      .put(`/product/${productId}`)
      .set("Cookie", cookie)
      .send({
        name: "Updated Product",
      });

    expect(res.statusCode).toBe(200);
  });

  // ---------------- DELETE ----------------
  test("delete product", async () => {
    const res = await request(app)
      .delete(`/product/${productId}`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });
});