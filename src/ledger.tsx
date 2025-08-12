import { Transaction } from "./transaction";
import { Wallet } from "./wallet";

export class Ledger {
    public balanceSheet: Map<string, number> = new Map(); // Tracks each wallet's balance
    public initialWallet: Wallet; // The wallet that gets the Genesis block's coins
    public TOTAL_SUPPLY: number = 10000000.00; // Total coins in the system (developer decision)
    public GenesisTx: Transaction; // The very first transaction in the blockchain

    constructor() {
        // Create the very first wallet (developer/miner/owner)
        this.initialWallet = new Wallet();
        console.log(this.initialWallet);

        // Genesis transaction: sending the TOTAL_SUPPLY to the initial wallet itself
        this.GenesisTx = new Transaction(
            this.initialWallet.publicKey, // Sender = Genesis wallet
            this.initialWallet.publicKey, // Receiver = same wallet
            this.TOTAL_SUPPLY
        );

        // Sign Genesis transaction with its private key to prove authenticity
        this.GenesisTx.signTransaction(this.initialWallet.privateKey);

        // Record the initial balance for the Genesis wallet in the ledger
        this.balanceSheet.set(this.initialWallet.publicKey, this.GenesisTx.amount);
    }

    // Creates a new wallet with 0 starting balance
    createWallet(): Wallet {
        const wallet = new Wallet();
        this.balanceSheet.set(wallet.publicKey, 0);
        return wallet;
    }

    // Returns all balances in the ledger
    getAllBalance(): Map<string, number> {
        return this.balanceSheet;
    }

    // Returns the balance for a specific wallet
    getBalance(publicKey: string): number {
        return this.balanceSheet.get(publicKey) || 0;
    }

    // TODO: Handle sending tokens between wallets (will update balances)
    sendTokens(transaction: Transaction) {
        // Logic to check balance, validate signature, and update balanceSheet
    }
}
