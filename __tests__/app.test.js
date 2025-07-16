const request = require("supertest");
const app = require("../src/app");
require("dotenv").config();

describe("Basic Express Tests", () => {
  it("should return 404 for unknown routes", async () => {
    await request(app).get("/nonexistent-route").expect(404);
  });
});
