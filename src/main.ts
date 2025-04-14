import { ApiExpress } from "./api/express/api.express";
import dotenv from "dotenv";
import { ProductRepositoryPrisma } from "./repositories/product/prisma/product.repository.prisma";
import { prisma } from "./util/prisma.util";
import { ProductController } from "./api/express/controllers/product /product.controller";
import { Request, Response } from "express";

async function main() {
  dotenv.config();
  const api = ApiExpress.build();
  const PORT = process.env.PORT || 3000;
  api.start(Number(PORT));

  const productRepository = await ProductRepositoryPrisma.build(prisma);
  const productController = ProductController.build(productRepository);

  api.addGetRoute("/products", async (req: Request, res: Response) => {
    await productController.list(req, res);
  });

  api.addPostRoute("/products", async (req: Request, res: Response) => {
    await productController.create(req, res);
  });

  api.addPatchRoute(
    "/products/:id/buy",
    async (req: Request, res: Response) => {
      await productController.buy(req, res);
    }
  );

  api.addPatchRoute(
    "/products/:id/sell",
    async (req: Request, res: Response) => {
      console.log(req.body);
      await productController.sell(req, res);
    }
  );

  api.addDeleteRoute("/products/:id", async (req: Request, res: Response) => {
    await productController.delete(req, res);
  });
}
main();
