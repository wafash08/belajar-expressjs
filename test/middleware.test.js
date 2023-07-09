import supertest from "supertest";
import express from "express";

function logger(req, res, next) {
  console.info(
    `Received request, method: ${req.method} originalUrl: ${req.originalUrl}`
  );
  next();
}

function addPoweredHeader(req, res, next) {
  res.set("X-Powered-By", "Programmer Zaman Now");
  next();
}

function apiKeyMiddleware(req, res, next) {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401);
    res.send("Unauthorized");
  }
}

function requestTimeMiddleware(req, res, next) {
  req.requestTime = Date.now();
  next();
}

const app = express();
app.use(logger);
app.use(addPoweredHeader);
app.use(apiKeyMiddleware);
app.use(requestTimeMiddleware);

app.get("/", (req, res) => {
  res.send("Hello Middleware");
});

app.get("/time", (req, res) => {
  res.send(`Hello , Today Is ${req.requestTime}`);
});

describe("Middleware", () => {
  it("should get x-powered-by http header", async () => {
    const response = await supertest(app).get("/").query({ apiKey: "123" });
    expect(response.get("X-Powered-By")).toBe("Programmer Zaman Now");
    expect(response.text).toBe("Hello Middleware");
  });

  it("should reject with status 401 if there is no query", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(401);
    expect(response.text).toBe("Unauthorized");
  });

  it("should get new requestTime request object property", async () => {
    const response = await supertest(app).get("/time").query({ apiKey: "123" });
    expect(response.get("X-Powered-By")).toBe("Programmer Zaman Now");
    expect(response.text).toContain("Hello , Today Is");
  });
});
