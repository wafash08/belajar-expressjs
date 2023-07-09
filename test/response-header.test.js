import supertest from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.set({
    "X-Powered-By": "Programmer Zaman Now",
    "X-Author": "Wafa",
  });
  res.send("Hello Response");
});

describe("Response Header", () => {
  it("should retrieves response header", async () => {
    const response = await supertest(app).get("/");

    expect(response.text).toBe("Hello Response");
    expect(response.get("X-Powered-By")).toBe("Programmer Zaman Now");
    expect(response.get("X-Author")).toBe("Wafa");
  });
});
