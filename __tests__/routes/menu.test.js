const request = require("supertest");
const app = require("../../src/app");
require("dotenv").config();

describe("All menus", () => {
  it("should return 401 for unauthorized access", async () => {
    await request(app).get("/api/menus").expect(401);
  });
});
