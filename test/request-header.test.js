import supertest from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  const type = req.get("accept");
  console.log(type);
  res.send("Hello " + type + "!");
});

it("should retrieve request header", async () => {
  const response = await supertest(app).get("/").set("Accept", "text/plain");
  expect(response.text).toBe("Hello text/plain!");
});
