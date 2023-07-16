import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

// custom 404 page should placed at the most bottom
app.use((req, res, next) => {
  res.status(404).send(`404 Not Found Euy`);
});

describe("404 not found", () => {
  it("should respond with text and status 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello Response");
  });

  test("should respond with error 404", async () => {
    const response = await request(app).get("/halaman-tidak-ada");
    expect(response.status).toBe(404);
    expect(response.text).toBe("404 Not Found Euy");
  });
});
