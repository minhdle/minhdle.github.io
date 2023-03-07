import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

export interface Product {
  BoltID: string;
  Name: string;
  Description: string;
  AvailabilityCount: number;
  Prices: { UnitPriceInCents: number; Currency: string }[];
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
  Current: Product;
  Parent: Product;
  Variants: Product;
}>;

export interface FetchProductsResp {
  Catalog: Catalog
}

export async function fetchProducts(): Promise<Product[]> {
  const nonce = uuidv4();
  const baseString = `:${nonce}`;
  const stagingSecret = "test_sandbox";

  const signatureBytes = CryptoJS.HmacSHA256(baseString, stagingSecret);
  console.log(signatureBytes);
  const authSig = CryptoJS.enc.Base64.stringify(signatureBytes);
  const headers = new Headers();
  headers.append("X-Publisher-Key", "fbf27e893e8f512fb39cd752b664af3d");
  headers.append("X-Nonce", nonce);
  headers.append("X-Authorization-Signature", authSig);

  return fetch(
    "https://api-sandbox.bolt.com/v1/products/catalog?merchant_division_id=LkYmU2HuLkws&limit=5",
    { headers }
  ).then(async (res) => {
    const json: FetchProductsResp = await res.json();

    return json.Catalog.map(item => item.Current);
  });
}
