import type { Variant } from "./variant.types";

export type Product = {
  id: string;
  name: string;
  index: number;
  variants?: Variant[];
};

export type ProductInput = {
  name: string;
};
export type ProductUpdate = {
  id: string;
  name: string;
};

export type PrismaWhere = {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | Date
    | string[]
    | PrismaWhere
    | PrismaWhere[];
};
