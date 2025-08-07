import crypto from 'crypto'
import { Transaction } from './transaction.ts'; 


export class block {
    public index: number;
    public timestamp: string;
    public transactions: Transaction[];
    public previousHash: string;
    public nonce: number;
    public hash: string;
    public miner: string;
    constructor(
        index: number,
        transactions: Transaction[],
        previousHash: string = "",
        miner: string = ""
    ) {
        this.index = index;
        this.timestamp = new Date().toISOString();
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.miner = miner;
        this.hash = this.calculateHash()
    }

    calculateHash(): string {
        const str = this.index + this.timestamp + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce + this.miner;
        return crypto.createHash("sha256").update(str).digest("hex");
    }


    mineBlock(difficulty: number = 2, miningReward: number = 100): void {
        const targetPrefix = Array(difficulty + 1).join("0");
        const startTime = Date.now();
        let attempts = 0;
        console.log(`🔨 Starting to mine block ${this.index}...`);

        while (!this.hash.startsWith(targetPrefix)) {
            this.nonce++;
            attempts++;
            this.hash = this.calculateHash();
            if (attempts % 10000 === 0) {
                console.log(`⛏️  Mining... Attempts: ${attempts}, Nonce: ${this.nonce}`);
            }
        }
        const endTime = Date.now();
        const timeTaken = endTime - startTime;

        console.log(`✅ Block ${this.index} mined successfully!`);
        console.log(`   Hash: ${this.hash}`);
        console.log(`   Nonce: ${this.nonce}`);
        console.log(`   Time: ${timeTaken} ms`);
        console.log(`   Attempts: ${attempts}`);

        // Add mining reward transaction if miner is specified
        // Replace null with a clear, descriptive string
        if (this.miner) {
             const rewardTransaction = new Transaction(null, this.miner, miningReward);
            this.transactions.push(rewardTransaction);
        }
    }


    hasValidTransation(): boolean {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                console.error('Invalid transaction found in block');
                return false;
            }
        }
        return true;
    }

      getTotalTransactionAmount(): number {
    return this.transactions.reduce((total, tx) => {
      if (tx.fromAddress !== null) { // Don't count mining rewards
        return total + tx.amount;
      }
      return total;
    }, 0);
  }

  getTransactionCount(): number {
    return this.transactions.length;
}
  getBlockInfo(): {
    index: number;
    hash: string;
    previousHash: string;
    timestamp: string;
    transactionCount: number;
    totalAmount: number;
    miner: string;
  } {
    return {
      index: this.index,
      hash: this.hash,
      previousHash: this.previousHash,
      timestamp: this.timestamp,
      transactionCount: this.getTransactionCount(),
      totalAmount: this.getTotalTransactionAmount(),
      miner: this.miner ? this.miner.substring(0, 10) + '...' : 'Unknown'
    };
  }
}