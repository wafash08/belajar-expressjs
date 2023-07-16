import express from "express";
import supertest from "supertest";

const app = express();

// app.use(express.static(__dirname + "/contohstatic"));
app.use("/static", express.static(__dirname + "/contohstatic"));

app.get("/", (req, res) => {
  res.send("Hello Response");
});

app.get("/static.txt", (req, res) => {
  res.send("Hello Response");
});

describe("Static File", () => {
  it("should return hello response when accessing static.txt route", async () => {
    const response = await supertest(app).get("/static.txt");

    expect(response.text).toBe("Hello Response");
  });

  it("should be able to access contohstatic file", async () => {
    const response = await supertest(app).get("/static/contohstatic.txt");

    expect(response.text).toBe("contoh static");
  });
});
