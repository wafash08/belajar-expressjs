import supertest from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.redirect("/to-next-page");
});

describe("Response Redirect", () => {
  it("should redirect to a given url", async () => {
    const response = await supertest(app).get("/");

    expect(response.status).toBe(302);
    expect(response.get("location")).toBe("/to-next-page");
  });
});
