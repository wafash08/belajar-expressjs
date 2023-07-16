import express from "express";
import supertest from "supertest";

const app = express();

function errorMiddleware(err, req, res, next) {
  res.status(500).send(`Terjadi Error: ${err.message}`);
}

app.get("/", (req, res) => {
  throw new Error("Ups");
});

app.use(errorMiddleware);

describe("Error Handling", () => {
  it("should throw error", async () => {
    const response = await supertest(app).get("/");

    expect(response.status).toBe(500);
    expect(response.text).toBe("Terjadi Error: Ups");
  });
});
