import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:productId", (req, res) => {
  const idProduct = req.params.productId;
  res.send(`Product: ${idProduct}`);
});

app.get("/categories/:categoryId(\\d+)", (req, res) => {
  const idCategory = req.params.categoryId;
  res.send(`Category: ${idCategory}`);
});

describe("Route Path", () => {
  it("should get the route parameter", async () => {
    let response = await request(app).get("/products/eko");
    expect(response.text).toBe("Product: eko");

    response = await request(app).get("/products/salah");
    expect(response.text).toBe("Product: salah");

    response = await request(app).get("/categories/1234");
    expect(response.text).toBe("Category: 1234");

    response = await request(app).get("/categories/salah");
    expect(response.status).toBe(404);
  });
});
