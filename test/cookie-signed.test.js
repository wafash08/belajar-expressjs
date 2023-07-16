import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser("RAHASIABANGET"));
app.use(express.json());

app.get("/", (req, res) => {
  // const name = req.cookies.name;
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});

describe("Cookie", () => {
  it("should be able to read cookie", async () => {
    const response = await request(app)
      .get("/")
      .set(
        "Cookie",
        "Login=s%3AEko.ufbcTkKl77wT%2BDNgwvPbT%2FxGJQj%2Bj6c2iBHz7Ocu0KY; Path=/"
      );

    expect(response.text).toBe("Hello Eko");
  });

  it("should be able to write cookie", async () => {
    const response = await request(app).post("/login").send({ name: "Eko" });

    console.info(response.get("Set-Cookie"));
    expect(response.get("Set-Cookie").toString()).toContain("Eko");
    expect(response.text).toBe("Hello Eko");
  });
});
