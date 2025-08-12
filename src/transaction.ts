
import crypto from "crypto";

export class Transaction {
    public fromAddress: string
    public toAddress: string
    public amount: number
    public timeStamp: string
    public signature: string

    constructor(fromAddress: string, toAddress: string, amount: number) {
        this.fromAddress = fromAddress
        this.toAddress = toAddress
        this.amount = amount
        this.timeStamp = new Date().toISOString()
        this.signature = ""
    }


    //createHash
    calculateHash(): string {
        const str = this.fromAddress + this.toAddress + this.amount
        return crypto.createHash("sha256").update(str).digest("hex");
    }


    //sign with private key
    signTransaction(privateKey: string) {
        const sign = crypto.createSign("SHA256");

        sign.update(this.calculateHash()).end();

        const privateBuffer = Buffer.from(privateKey, "base64")

        this.signature = sign.sign({
            key: privateBuffer,
            format: 'der',
            type: 'pkcs8',
        }, "base64")
    }


// Others verify with public key 
    verifyTransaction(): Boolean {
        return true
    }
}
