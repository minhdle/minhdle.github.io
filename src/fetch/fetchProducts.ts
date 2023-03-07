import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import type { Product } from "../components/product-list/types";

export interface ProductResp {
  BoltID: string;
  Name: string;
  Description: string;
  AvailabilityCount: number;
  Prices: {
    UnitPriceInCents: number;
    Currency: string;
    ListPriceInCents: number;
  }[];
  Multimedia: {
    ImageURLs?: string[];
  };
  Identifiers: {
    MerchantProductID: string;
    SKU: string;
  };
  Properties?: {
    Name: string;
    NameID?: number;
    Value: string;
    ValueID?: number;
  }[];
}

export type Catalog = Array<{
  Current: ProductResp;
  Parent: ProductResp;
  Variants: ProductResp[];
}>;

export interface FetchProductsResp {
  Catalog: Catalog;
}

export async function fetchProducts(): Promise<Product[]> {
  const nonce = uuidv4();
  const baseString = `:${nonce}`;
  const stagingSecret = "test_staging";

  const signatureBytes = CryptoJS.HmacSHA256(baseString, stagingSecret);
  const authSig = CryptoJS.enc.Base64.stringify(signatureBytes);
  const headers = new Headers();
  headers.append("X-Publisher-Key", "b61b9342d84f5a7c9aeea9b09574d16c");
  headers.append("X-Nonce", nonce);
  headers.append("X-Authorization-Signature", authSig);

  return fetch(
    "https://api-staging.bolt.com/v1/products/catalog?merchant_division_id=LkyzotSFu0PH&limit=20",
    { headers }
  )
    .then(async (res) => {
      const json: FetchProductsResp = await res.json();

      return json.Catalog.map((item) => {
        return item.Current.Name ? item.Current : {
          ...item.Current,
          Name: item.Parent.Name,
          Description: item.Parent.Description,
          Multimedia: item.Parent.Multimedia
        };
      });
    })
    .then((res) => {
      const parsedProducts = res.map((product) => {
        return {
          price: product.Prices[0].ListPriceInCents / 100,
          name: JSON.parse(product.Name).default,
          id: product.BoltID,
          description: JSON.parse(product.Description).default.slice(0, 30) + "...",
          imageUrl: product.Multimedia.ImageURLs ? product.Multimedia.ImageURLs[0] : "",
        } as Product;
      });
      return parsedProducts;
    });
}
