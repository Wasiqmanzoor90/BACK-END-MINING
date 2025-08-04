export interface Transaction {
    from: string,
    to: string,
    amount: number,
    timestamp: string;
    signature?: string;
}

export interface BlockData {
    transaction: Transaction[],
    minerAddress: string;
    reward: number;
}

export interface PeerInfo {
    id: string;
    host: string;
    port: number;
    connected: boolean;
}
export interface NetworkMessage {
    type: 'NEW_BLOCK' | 'REQUEST_CHAIN' | 'CHAIN_RESPONSE' | 'NEW_PEER' | 'PING';
    data: any;
    timestamp: string;
    from: string;
}

export interface MiningResult {
    success: boolean;
    block?: any;
    reward?: number;
    timeTaken?: number;
    error?: string;
}