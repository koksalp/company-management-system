const request = require("supertest");
const app = require("../src/app");

describe("Auth Controller", () => {
  const uniqueUser = {
    username: `testuser_${Date.now()}`,
    password: "Test12345!",
  };

  let cookie;

  test("register user - success", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send(uniqueUser);

    expect(res.statusCode).toBe(201);
  });

  test("login user - success and get cookie", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send(uniqueUser);

    expect(res.statusCode).toBe(200);

    cookie = res.headers["set-cookie"];
  });

  test("login invalid password - fail", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        username: uniqueUser.username,
        password: "wrongpassword",
      });

    expect(res.statusCode).toBe(400);
  });

  test("logout user - success with cookie", async () => {
    const res = await request(app)
      .post("/auth/logout")
      .set("Cookie", cookie);

    expect(res.statusCode).toBe(200);
  });
}); 