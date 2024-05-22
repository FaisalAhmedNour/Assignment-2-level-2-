export type ProductType = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Array<variantType>;
  inventory: inventoryType;
};

export type variantType = {
  type: string;
  value: string;
};

export type inventoryType = {
  quantity: number;
  inStock: boolean;
};
