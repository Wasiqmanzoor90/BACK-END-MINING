# Simple Blockchain Project

A professional blockchain implementation with P2P networking, wallet system, and REST API built with TypeScript and Express.js.

## Features

- **Complete Blockchain**: Proof-of-work mining, transaction validation, and chain integrity
- **Wallet System**: Secure wallet creation with RSA key pairs and digital signatures
- **P2P Network**: WebSocket-based peer-to-peer networking with automatic synchronization
- **REST API**: Full HTTP API for blockchain interaction
- **Initial Supply**: 10 million coins in genesis wallet
- **Mining Rewards**: 50 coins per successfully mined block
- **Type Safety**: Built with TypeScript for robust development

## 📦 Installation

```bash
# Clone or create the project directory
mkdir blockchain-project && cd blockchain-project

# Install dependencies
npm install express ws cors
npm install -D @types/express @types/node @types/ws @types/cors typescript ts-node

# Build the project
npm run build
```

## 🏃‍♂️ Running the Project

### Single Node
```bash
# Development mode
npm run dev

# Production mode
npm run build && npm start
```

### Multiple Nodes (P2P Network)
```bash
# Terminal 1 - First node
HTTP_PORT=3001 P2P_PORT=6001 npm run dev

# Terminal 2 - Second node
HTTP_PORT=3002 P2P_PORT=6002 PEERS=ws://localhost:6001 npm run dev

# Terminal 3 - Third node
HTTP_PORT=3003 P2P_PORT=6003 PEERS=ws://localhost:6001,ws://localhost:6002 npm run dev
```

## 🌐 API Endpoints

### Blockchain Operations
- `GET /health` - Health check
- `GET /stats` - Blockchain and network statistics
- `GET /blockchain` - Get full blockchain
- `GET /block/:index` - Get specific block
- `GET /validate` - Validate blockchain integrity

### Wallet Operations
- `POST /wallet` - Create new wallet
- `GET /wallet/:address` - Get wallet balance
- `POST /genesis/transfer` - Transfer coins from genesis wallet

### Mining & Transactions
- `POST /mine` - Mine a new block
- `POST /transaction` - Create a transaction
- `GET /transactions/pending` - Get pending transactions

### P2P Network
- `GET /peers` - Get connected peers
- `POST /peers/connect` - Connect to a peer

## 📋 Usage Examples

### 1. Create a Wallet
```bash
curl -X POST http://localhost:3001/wallet
```

### 2. Transfer Coins from Genesis
```bash
curl -X POST http://localhost:3001/genesis/transfer \
  -H "Content-Type: application/json" \
  -d '{
    "to": "your-wallet-address",
    "amount": 1000
  }'
```

### 3. Mine a Block
```bash
curl -X POST http://localhost:3001/mine \
  -H "Content-Type: application/json" \
  -d '{
    "minerAddress": "your-wallet-address"
  }'
```

### 4. Create a Transaction
```bash
curl -X POST http://localhost:3001/transaction \
  -H "Content-Type: application/json" \
  -d '{
    "from": "sender-wallet-address",
    "to": "receiver-wallet-address",
    "amount": 50
  }'
```

### 5. Connect to Peer
```bash
curl -X POST http://localhost:3001/peers/connect \
  -H "Content-Type: application/json" \
  -d '{
    "peer": "ws://localhost:6002"
  }'
```

## 🏗️ Project Structure

```
blockchain-project/
├── src/
│   ├── index.ts           # Express server and API routes
│   ├── blockchain.ts      # Blockchain core logic
│   ├── block.ts           # Block structure and mining
│   ├── wallet.ts          # Wallet and cryptographic functions
│   ├── p2p-network.ts     # P2P networking with WebSockets
│   └── types.ts           # TypeScript interfaces
├── dist/                  # Compiled JavaScript (after build)
├── package.json
├── tsconfig.json
└── README.md
```

## 🔧 Configuration

### Environment Variables
- `HTTP_PORT` - HTTP server port (default: 3001)
- `P2P_PORT` - P2P WebSocket port (default: 6001)
- `PEERS` - Comma-separated list of peer URLs to connect to

### Blockchain Settings
- **Difficulty**: 3 (adjustable in `src/index.ts`)
- **Mining Reward**: 50 coins per block
- **Initial Supply**: 10,000,000 coins

##  Security Features

- **Digital Signatures**: All transactions are signed with RSA private keys
- **Proof of Work**: Mining requires solving computational puzzles
- **Chain Validation**: Automatic validation of blockchain integrity
- **Transaction Verification**: Balance and signature validation

##  P2P Network Features

- **Automatic Discovery**: Nodes automatically sync with peers
- **Blockchain Sync**: Longest valid chain wins
- **Real-time Updates**: New blocks broadcast to all peers
- **Fault Tolerance**: Network continues even if nodes disconnect

##  Testing the System

### Basic Workflow
1. Start multiple nodes
2. Create wallets on different nodes
3. Transfer coins from genesis wallet
4. Mine blocks to earn rewards
5. Send transactions between wallets
6. Observe automatic P2P synchronization

### Monitoring
- Check `/stats` for blockchain statistics
- Check `/peers` for network status
- Check `/validate` for chain integrity

##  Important Notes

- **In-Memory Storage**: No database - everything stored in memory
- **Development Only**: This is for learning purposes, not production use
- **Network Security**: No authentication between peers (add in production)
- **Key Management**: Private keys stored in memory (use secure storage in production)

## 🛠️ Development

### Build Commands
```bash
npm run build      # Compile TypeScript
npm run dev        # Development with hot reload
npm run clean      # Clean build directory
```

### Code Structure
- Clean separation of concerns
- Type-safe with TypeScript
- Professional error handling
- Comprehensive logging
- RESTful API design

---

**Happy Blockchain Building! ⛓️**