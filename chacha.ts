import * as crypto from 'crypto';

function splitEncryptedText( encryptedText: string ) {
    return {
        encryptedDataString: encryptedText.slice( 56, -32 ),
        ivString: encryptedText.slice( 0, 24 ),
        assocDataString: encryptedText.slice( 24, 56 ),
        tagString: encryptedText.slice( -32 ),
    }
}

export default class ChaChaCrypto {
    encoding: BufferEncoding = 'hex';

    // process.env.CRYPTO_KEY should be a 32 BYTE key
    key: string = process.env.CRYPTO_KEY || '9d1934c3d217a308b1b201a1f1fe11e8bf23fccf06df111b613e1e5e44da705dc31b0c36d03132e0ecd576d562ad56d4c1f17a09243a7ed71ed809442ea9d3ce'.slice( 0, 32 );

    encrypt( plaintext: string ) {
        try {
            const iv = crypto.randomBytes( 12 );
            const assocData = crypto.randomBytes( 16 );
            const cipher = crypto.createCipheriv( 'chacha20-poly1305', this.key, iv, {
                authTagLength: 16,
            } );

            cipher.setAAD( assocData, { plaintextLength: Buffer.byteLength( plaintext ) } );

            const encrypted = Buffer.concat( [
                cipher.update(
                    plaintext, 'utf-8'
                ),
                cipher.final(),
            ] );
            const tag = cipher.getAuthTag();

            return iv.toString( this.encoding ) + assocData.toString( this.encoding ) + encrypted.toString( this.encoding ) + tag.toString( this.encoding );

        } catch (e) {
            console.error( e );
        }
    };

    decrypt( cipherText: string ) {
        const {
            encryptedDataString,
            ivString,
            assocDataString,
            tagString,
        } = splitEncryptedText( cipherText );

        try {
            const iv = Buffer.from( ivString, this.encoding );
            const encryptedText = Buffer.from( encryptedDataString, this.encoding );
            const tag = Buffer.from( tagString, this.encoding );

            const decipher = crypto.createDecipheriv( 'chacha20-poly1305', this.key, iv, { authTagLength: 16 } );
            decipher.setAAD( Buffer.from( assocDataString, this.encoding ), { plaintextLength: encryptedDataString.length } );
            decipher.setAuthTag( Buffer.from( tag ) );

            const decrypted = decipher.update( encryptedText );
            return Buffer.concat( [ decrypted, decipher.final() ] ).toString();
        } catch (e) {
            console.error( e );
        }
    }
}
