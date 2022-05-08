# Node Cryptography Examples

A few very simple instances of cryptography for Node in Typescript. It needs an envrionment variable set for CRYPTO_KEY,
 but has a default value.

Currently, just AES-256-CBC and ChaCha20-Poly1305 are included but since these can both cover 99% of use-cases, I think 
that's fine.

Example usage of the included classes:

```typescript
import ChaChaCrypto from './chacha.js';
import CBCCrypto from './cbc.js';

const textToEncrypt = 'This is some text that will be encrypted';
const chaChaSec = new ChaChaCrypto();
const cbcSec = new CBCCrypto();

const chaChaEncrypted = chaChaSec.encrypt( textToEncrypt );
const cbcSecEncrypted = cbcSec.encrypt( textToEncrypt );

console.log( `ChaChaEncrypted: ${chaChaEncrypted}` );
console.log( `CbcEncrypted: ${cbcSecEncrypted}` );

const chaChaDecrypted = chaChaSec.decrypt( chaChaEncrypted );
const cbcSecDecrypted = cbcSec.decrypt( cbcSecEncrypted );

console.log( `ChaChaDecrypted: ${chaChaDecrypted}` );
console.log( `CbcDecrypted: ${cbcSecDecrypted}` );
```

