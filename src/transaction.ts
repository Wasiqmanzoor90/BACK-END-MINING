import crypto from 'crypto'

export class Transaction {
    public fromAddress: string | null;
    public toAddress: string;
    public amount: number;
    public signature: string;
    public timestamp: string;


    constructor(fromAddress: string | null, toAddress: string, amount: number, signature: string = '') {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount
        this.signature = signature;
        this.timestamp = new Date().toISOString();

    }
    calculateHash(): string {
        const str = this.fromAddress + this.toAddress + this.amount + this.timestamp;
        return crypto.createHash("sha256").update(str).digest("hex");
    }

    signTransaction(privateKey: string): void {
        if (this.fromAddress === null) {
            throw new Error('Cannot sign transactions for mining rewards');
        }
        const sign = crypto.createSign('SHA256');
        sign.update(this.calculateHash()).end();

        const privateKeyBuffer = Buffer.from(privateKey, "base64");

        this.signature = sign.sign({
            key: privateKeyBuffer,
            format: 'der',
            type: 'pkcs8',
        }, "base64");
    }

    verifyTransaction(publicKey: string): boolean {
        if (this.fromAddress === null) return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error('No signature in this transaction');
        }
        try {

            const verify = crypto.createVerify("SHA256");
            verify.update(this.calculateHash()).end();
            const publicKeyBuffer = Buffer.from(publicKey, 'base64');

            return verify.verify({
                key: publicKeyBuffer,
                format: 'der',
                type: 'spki',
            }, this.signature, 'base64');
        } catch (error) {
            console.error('Transaction verification failed:', error);
            return false
        }
    }

    isValid(): boolean {
        // Mining reward transactions don't need validation
        if (this.fromAddress === null) return true;

        // Check if transaction has signature
        if (!this.signature || this.signature.length === 0) {
            return false;
        }
        // Check if amount is positive
        if (this.amount <= 0) {
            return false;
        }

        return this.verifyTransaction(this.fromAddress);
    }

}