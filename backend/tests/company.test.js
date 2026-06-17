const request = require("supertest");
const app = require("../src/app");

describe("Company Controller", () => {
  const user = {
    username: `company_user_${Date.now()}`,
    password: "Test12345!",
  };

  let cookie;
  let companyId;

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

  test("create company", async () => {
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

  test("get companies", async () => {
    const res = await request(app)
      .get("/company")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });

  test("update company", async () => {
    const res = await request(app)
      .put(`/company/${companyId}`)
      .set("Cookie", cookie)
      .send({
        name: "Updated Company",
      });

    expect(res.statusCode).toBe(200);
  });

  test("delete company", async () => {
    const res = await request(app)
      .delete(`/company/${companyId}`)
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });
});