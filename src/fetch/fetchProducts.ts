import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import type { Product } from "../components/product-list/types";
import {
  CATALOG_API_URL_BASE,
  ENV_SECRET,
  ITEM_LIMIT,
  MERCHANT_DIVISION,
  PUBLISHER_KEY,
} from "../env";

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
  return callProductsCatalogApi()
    .then(async (res) => {
      const json: FetchProductsResp = await res.json();

      return json.Catalog.filter(
        (item) => item.Current.BoltID === item.Parent.BoltID
      ).map((item) => {
        return item.Current.Name
          ? item.Current
          : {
              ...item.Current,
              Name: item.Parent.Name,
              Description: item.Parent.Description,
              Multimedia: item.Parent.Multimedia,
            };
      });
    })
    .then((res) => {
      const seenSku: { [sku: string]: true } = {};
      return  res.reduce((acc: Product[], product) => {
        if (seenSku[product.Identifiers.SKU]) {
          return acc;
        }
        seenSku[product.Identifiers.SKU] = true;
        return [
          ...acc,
          {
            price: product.Prices[0].ListPriceInCents / 100,
            name: JSON.parse(product.Name).default,
            id: product.Identifiers.SKU,
            description:
              JSON.parse(product.Description).default.slice(0, 30) + "...",
            imageUrl: product.Multimedia.ImageURLs
              ? product.Multimedia.ImageURLs[0]
              : "",
          } as Product,
        ];
      }, []);
    });
}

function callProductsCatalogApi() {
  const nonce = uuidv4();
  const baseString = `:${nonce}`;

  const signatureBytes = CryptoJS.HmacSHA256(baseString, ENV_SECRET);
  const authSig = CryptoJS.enc.Base64.stringify(signatureBytes);
  const headers = new Headers();
  headers.append("X-Publisher-Key", PUBLISHER_KEY);
  headers.append("X-Nonce", nonce);
  headers.append("X-Authorization-Signature", authSig);

  return fetch(
    `${CATALOG_API_URL_BASE}?merchant_division_id=${MERCHANT_DIVISION}&limit=${ITEM_LIMIT}`,
    { headers }
  );
}
