import { Product } from "../../entities/product";

export interface ProductRepository {
  save(product: Product): Promise<string>;
  list(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<string>;
}
