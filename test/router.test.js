import express from "express";
import request from "supertest";

const app = express();

const router = express.Router();
router.use((req, res, next) => {
  console.info(`Receive request : ${req.originalUrl}`);
  next();
});
router.get("/feature/a", (req, res) => {
  res.send("feature a");
});

describe("Router", () => {
  it("should throw 404 when router is not registered yet", async () => {
    const response = await request(app).get("/feature/a");
    expect(response.status).toBe(404);
  });

  it("should be able to access route /feature/a", async () => {
    app.use(router);

    const response = await request(app).get("/feature/a");
    expect(response.status).toBe(200);
    expect(response.text).toBe("feature a");
  });
});
