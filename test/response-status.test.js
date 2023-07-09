import supertest from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  if (req.query.name) {
    res.status(200);
    res.send("Hello " + req.query.name + "!");
  } else {
    res.status(400);
    res.end();
  }
});

describe("Response Status", () => {
  it("should sends response text with status 200 if there is a query", async () => {
    const response = await supertest(app).get("/").query({ name: "Wafa" });
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello Wafa!");
  });

  it("should responds with status 400 if there is no query", async () => {
    const response = await supertest(app).get("/");

    expect(response.status).toBe(400);
  });
});
