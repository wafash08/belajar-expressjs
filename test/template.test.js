import express from "express";
import request from "supertest";
import path from "node:path";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("hello.ejs", {
    title: "Hello World",
    greeting: "Hello EJS",
  });
});

describe("Template", () => {
  it("should render tempalte with title and greeting sent by server", async () => {
    const response = await request(app).get("/");
    console.info(response.text);
    expect(response.text).toContain("Hello World");
    expect(response.text).toContain("Hello EJS");
  });
});
