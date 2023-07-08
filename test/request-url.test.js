import supertest from "supertest";
import express from "express";

const app = express();

app.get("/hello/world", (req, res) => {
  res.json({
    path: req.path,
    originalUrl: req.originalUrl,
    hostname: req.hostname,
    protocol: req.protocol,
    secure: req.secure,
  });
});

it("should retrieve parts of the url", async () => {
  const response = await supertest(app)
    .get("/hello/world")
    .query({ name: "Wafa" });

  expect(response.body).toEqual({
    path: "/hello/world",
    originalUrl: "/hello/world?name=Wafa",
    hostname: "127.0.0.1",
    protocol: "http",
    secure: false,
  });
});
