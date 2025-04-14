import { Request, Response } from "express";
import { ControllerInteface } from "../controller.interface";
import { ProductRepositoryPrisma } from "../../../../repositories/product/prisma/product.repository.prisma";
import { ProductServiceImplementation } from "../../../../service/product/implementation/product.service.implementation";

export class ProductController implements ControllerInteface {
  constructor(private readonly productRepository: ProductRepositoryPrisma) {}

  public static build(
    productRepository: ProductRepositoryPrisma
  ): ProductController {
    return new ProductController(productRepository);
  }

  async create(req: Request, res: Response) {
    const { name, price } = await req.body;

    const service = ProductServiceImplementation.build(this.productRepository);

    const output = await service.create(name, price);

    if (!output) {
      res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(201).json({ ...output });
  }

  async list(req: Request, res: Response) {
    const service = ProductServiceImplementation.build(this.productRepository);
    const output = await service.list();

    if (!output) {
      res.status(404).json({
        message: "No products found",
      });
    }

    res.status(200).json({
      ...output,
    });
  }

  async buy(req: Request, res: Response) {
    const { id } = req.params;
    const { amount } = req.body;

    const service = ProductServiceImplementation.build(this.productRepository);
    const output = await service.buy(id, amount);

    if (!output) {
      res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      ...output,
    });
  }

  async sell(req: Request, res: Response) {
    const { id } = req.params;
    const { amount } = req.body;

    const service = ProductServiceImplementation.build(this.productRepository);
    const output = await service.sell(id, amount);

    if (!output) {
      res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      ...output,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const service = ProductServiceImplementation.build(this.productRepository);
    const output = await service.delete(id);

    if (!output) {
      res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      output,
    });
  }
}
