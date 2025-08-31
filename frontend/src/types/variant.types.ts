import type { Product } from "./product.types";

export type Variant = {
  id: string;
  name: string;
  skuCode: string;
  index: number;
  product?: Product;
};

export type VariantInput = {
  name: string;
  product_id: string;
};
