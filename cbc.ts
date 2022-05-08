import * as crypto from 'crypto';

function splitEncryptedText( encryptedText: string ) {
    return {
        ivString: encryptedText.slice( 0, 32 ),
        encryptedDataString: encryptedText.slice( 32 ),
    }
}

export default class CBCCrypto {
    encoding: BufferEncoding = 'hex';

    // process.env.CRYPTO_KEY should be a 32 BYTE key
    key: string = process.env.CRYPTO_KEY || '9d1934c3d217a308b1b201a1f1fe11e8bf23fccf06df111b613e1e5e44da705dc31b0c36d03132e0ecd576d562ad56d4c1f17a09243a7ed71ed809442ea9d3ce'.slice( 0, 32 );

    encrypt( plaintext: string ) {
        try {
            const iv = crypto.randomBytes( 16 );
            const cipher = crypto.createCipheriv( 'aes-256-cbc', this.key, iv );

            const encrypted = Buffer.concat( [
                cipher.update(
                    plaintext, 'utf-8'
                ),
                cipher.final(),
            ] );

            return iv.toString( this.encoding ) + encrypted.toString( this.encoding );

        } catch (e) {
            console.error( e );
        }
    };

    decrypt( cipherText: string ) {
        const {
            encryptedDataString,
            ivString,
        } = splitEncryptedText( cipherText );

        try {
            const iv = Buffer.from( ivString, this.encoding );
            const encryptedText = Buffer.from( encryptedDataString, this.encoding );

            const decipher = crypto.createDecipheriv( 'aes-256-cbc', this.key, iv );

            const decrypted = decipher.update( encryptedText );
            return Buffer.concat( [ decrypted, decipher.final() ] ).toString();
        } catch (e) {
            console.error( e );
        }
    }
}
