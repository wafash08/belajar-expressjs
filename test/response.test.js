import supertest from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello Response");
});

it("should send the text response", async () => {
  const response = await supertest(app).get("/");
  expect(response.text).toBe("Hello Response");
});
