import { faker } from "@faker-js/faker";
import { Product } from "../components/product-list/types";

export function createRandomProduct(): Product {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    imageUrl: faker.image.food(200, 200),
  };
}

const products: Product[] = [];
const itemsLength = 10;
let idx = 0;
while (idx < itemsLength) {
  products.push(createRandomProduct());
  idx++;
}

export default products;
