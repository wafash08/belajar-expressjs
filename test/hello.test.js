import supertest from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

it("should respond with Hello World!", async () => {
  const response = await supertest(app).get("/");

  expect(response.text).toBe("Hello World!");
});
