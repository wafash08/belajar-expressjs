import supertest from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello " + req.query.name + "!");
});

it("should retrieve the right request query", async () => {
  const response = await supertest(app).get("/").query({ name: "Wafa" });

  expect(response.text).toBe("Hello Wafa!");
});
