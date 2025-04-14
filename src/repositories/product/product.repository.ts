import { Product } from "../../entities/product";

export interface ProductRepository {
  save(product: Product): Promise<Product>;
  list(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  delete(id: string): Promise<string | null>;
}
