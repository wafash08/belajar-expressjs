import supertest from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello " + req.query.firstName + " " + req.query.lastName + "!");
});

it("should retrieve the request query parameter", async () => {
  const response = await supertest(app)
    .get("/")
    .query({ firstName: "Wafa", lastName: "Saefulhaq" });

  expect(response.text).toBe("Hello Wafa Saefulhaq!");
});
