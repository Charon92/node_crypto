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