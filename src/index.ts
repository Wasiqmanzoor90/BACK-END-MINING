import crypto from 'crypto'
import { Transaction } from './transaction.ts';
import { block } from './block.ts';


// Generate key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
  namedCurve: "secp256k1", // standard curve
  publicKeyEncoding: { type: "spki", format: "der" },
  privateKeyEncoding: { type: "pkcs8", format: "der" }
});

// Encode keys to base64 for use
const publicKeyBase64 = publicKey.toString('base64');
const privateKeyBased64 = privateKey.toString('base64'); 

//Create Transaction
const tx1 = new Transaction(publicKeyBase64, "recipient-address", 50);
tx1.signTransaction(privateKeyBased64);

console.log(" Transaction created and signed:");
console.log(tx1);


//  Create a block with this transaction
const genesisBlock = new block(0, [tx1], "0000000000", publicKeyBase64);

//  Mine the block
genesisBlock.mineBlock(3, 100); // difficulty: 3, reward: 100

//  Validate transactions
console.log("\n🔍 Validating transactions...");
console.log("Block is valid:", genesisBlock.hasValidTransation());

//  Print block info
console.log("\n🧱 Block Info:");
console.log(genesisBlock.getBlockInfo());