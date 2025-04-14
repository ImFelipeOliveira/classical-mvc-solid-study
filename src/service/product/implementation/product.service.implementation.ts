import { Product } from "../../../entities/product";
import { ProductRepository } from "../../../repositories/product/product.repository";
import {
  BuyOutputDTO,
  CreateOutputDTO,
  ListOutputDTO,
  ProductService,
  SellOutputDTO,
} from "../product.service";

export class ProductServiceImplementation implements ProductService {
  private constructor(readonly repository: ProductRepository) {}

  public build(repository: ProductRepository) {
    return new ProductServiceImplementation(repository);
  }

  async sell(id: string, amount: number): Promise<SellOutputDTO> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    product.sell(amount);

    await this.repository.update(product);

    const output: SellOutputDTO = {
      id: product.id,
      balance: product.price,
    };
    return output;
  }

  async buy(id: string, amount: number): Promise<BuyOutputDTO> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    product.increaseStock(amount);

    await this.repository.update(product);

    const output: BuyOutputDTO = {
      id: product.id,
      balance: product.price,
    };

    return output;
  }

  async list(): Promise<ListOutputDTO> {
    const products = await this.repository.list();

    const output: ListOutputDTO = {
      products: products.map((p) => {
        return {
          id: p.id,
          name: p.name,
          price: p.price,
          balance: p.quantity,
        };
      }),
    };

    return output;
  }

  async create(name: string, price: number): Promise<CreateOutputDTO> {
    const product = Product.create(name, price);

    await this.repository.save(product);

    const output: CreateOutputDTO = {
      id: product.id,
      name: product.name,
      price: product.price,
      balance: product.price,
    };

    return output;
  }
}
