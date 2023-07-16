import supertest from "supertest";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.set({
    "Content-Type": "text/html",
  });
  res.send("<html><body>Hello World</body></html>");
});

app.get("/contoh", (req, res) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/contoh.txt");
});

describe("Response Body", () => {
  it("should retrieves response body in html", async () => {
    const response = await supertest(app).get("/");

    expect(response.get("Content-Type")).toContain("text/html");
    expect(response.text).toBe("<html><body>Hello World</body></html>");
  });

  it("should send contoh.txt file", async () => {
    const response = await supertest(app).get("/contoh");

    expect(response.text).toBe("contoh");
  });
});
