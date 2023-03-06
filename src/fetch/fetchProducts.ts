import CryptoJs from "crypto-js";


function generateGuid() {
  let result, i, j;
  result = '';
  for(j=0; j<32; j++) {
    if( j === 8 || j === 12 || j === 16 || j === 20)
      result = result + '-';
    i = Math.floor(Math.random()*16).toString(16).toUpperCase();
    result = result + i;
  }
  return result;
}



export async function fetchProducts() {
  const nonce = generateGuid().toLowerCase();
  const baseString = ":" + nonce;
  const stagingSecret = "cer6gnol0kor-DWIS"

  const signatureBytes = CryptoJs.HmacSHA512(baseString, stagingSecret);
  const authSig = CryptoJs.enc.Base64.stringify(signatureBytes);
  console.log(authSig);
  const headers = new Headers();
  headers.append("X-Publisher-Key", "238a244f214c5635a99bf848dc510191");
  headers.append("X-Nonce", nonce);
  headers.append("X-Authorization-Signature", authSig);


  return fetch("https://api-sandbox.bolt.com/v1/products/catalog?merchant_division_id=LkYmU2HuLkws&limit=5", {headers})
}