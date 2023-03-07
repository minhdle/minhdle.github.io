import {CHECKOUT_URL_BASE, MERCHANT_DIVISION, PUBLISHER_KEY} from "../env";

export function composeCheckoutUrl(quantitiesConfig: {
  [id: string]: number;
}): string {
  const entries: [string, number][] = Object.entries(quantitiesConfig).filter(pair => !pair[1]);
  const skus = entries.map(pair => pair[0]).join(',');
  const quantities = entries.map(pair => pair[1]).join(',');
  return `${CHECKOUT_URL_BASE}?merchant_division_id=${MERCHANT_DIVISION}&publisher_key=${PUBLISHER_KEY}&sku=${skus}&quantity=${quantities}`;
}
