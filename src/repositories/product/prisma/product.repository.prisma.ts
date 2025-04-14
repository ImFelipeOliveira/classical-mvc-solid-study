import { PrismaClient } from "@prisma/client";
import { Product } from "../../../entities/product";
import { ProductRepository } from "../product.repository";

export class ProductRepositoryPrisma implements ProductRepository {
  private constructor(private readonly prisma: PrismaClient) {}

  public static build(prisma: PrismaClient) {
    return new ProductRepositoryPrisma(prisma);
  }

  public async save(product: Product): Promise<Product> {
    const created = await this.prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    });

    return created as Product;
  }
  public async list(): Promise<Product[]> {
    const data = await this.prisma.product.findMany();

    if (!data) {
      return [];
    }

    const products: Product[] = data.map((p) => {
      return Product.with({
        id: p.id,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      });
    });

    return products;
  }
  public async findById(id: string): Promise<Product | null> {
    const data = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    if (!data) {
      return null;
    }

    const product: Product = Product.with({
      ...data,
    });

    return product;
  }
  public async update(product: Product): Promise<Product> {
    const { id, name, price, quantity } = product;

    const data = await this.prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        price: price,
        quantity: quantity,
      },
    });

    const updatedProduct: Product = Product.with({ ...data });

    return updatedProduct;
  }
  public async delete(id: string): Promise<string | null> {
    const deleted = await this.prisma.product.delete({
      where: {
        id: id,
      },
    });

    if (!deleted) {
      return null;
    }

    return deleted.id;
  }
}
