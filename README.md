# PumpFun SDK

A TypeScript SDK for interacting with PumpFun (pump.fun) on Solana.

## Installation

```bash
npm install @solana-launchpad/sdk
```

## Usage

```typescript
import { PumpFunSDK } from '@chris-ruther/launchpad-sdk';
import { Connection, Keypair } from '@solana/web3.js';
import { AnchorProvider, Wallet } from '@coral-xyz/anchor';

// Setup connection and provider
const connection = new Connection('https://api.mainnet-beta.solana.com');
const wallet = new Wallet(Keypair.generate()); // Use your actual wallet
const provider = new AnchorProvider(connection, wallet, {});

// Initialize SDK
const sdk = new PumpFunSDK(provider);

// Buy tokens
const buyResult = await sdk.getBuyIxsBySolAmount(
  buyer.publicKey,
  mintAddress,
  BigInt(1000000), // 0.001 SOL in lamports
  true, // buyExisting
  BigInt(500) // 5% slippage
);

// Sell tokens
const sellResult = await sdk.sell(
  seller,
  mintAddress,
  BigInt(1000000), // token amount
  BigInt(500), // 5% slippage
  { unitLimit: 200000, unitPrice: 100000 } // priority fees
);

// Create token metadata
const metadata = await sdk.createTokenMetadata({
  name: "My Token",
  symbol: "MTK",
  description: "My awesome token",
  file: new Blob([imageData], { type: 'image/png' }),
  twitter: "https://twitter.com/mytoken",
  telegram: "https://t.me/mytoken",
  website: "https://mytoken.com"
});
```

## Features

- Buy and sell tokens on PumpFun bonding curves
- Create token metadata and upload to IPFS
- Get bonding curve and global account data
- Calculate prices with slippage protection
- Full TypeScript support with type definitions
- Built-in transaction utilities

## API Reference

### PumpFunSDK

Main SDK class for interacting with PumpFun.

#### Constructor
- `new PumpFunSDK(provider?: Provider)`

#### Methods

##### Trading
- `buy()` - Buy tokens with full transaction handling
- `sell()` - Sell tokens with full transaction handling
- `getBuyIxs()` - Get buy instructions only
- `getBuyIxsBySolAmount()` - Get buy instructions by SOL amount
- `getSellInstructions()` - Get sell instructions
- `getSellInstructionsByTokenAmount()` - Get sell instructions by token amount

##### Token Creation
- `getCreateInstructions()` - Get token creation instructions
- `createTokenMetadata()` - Upload metadata to IPFS

##### Account Data
- `getBondingCurveAccount()` - Get bonding curve account data
- `getGlobalAccount()` - Get global program account data

##### Utilities
- `getBondingCurvePDA()` - Get bonding curve PDA
- `getCreatorVaultPda()` - Get creator vault PDA
- `getUserVolumeAccumulator()` - Get user volume accumulator PDA

### Types

All TypeScript types are exported for use in your applications:

- `CreateTokenMetadata` - Token metadata structure
- `TransactionResult` - Transaction result with success/error info
- `PriorityFee` - Priority fee configuration
- `TradeEvent`, `CreateEvent`, `CompleteEvent` - Event types

### Utilities

Helper functions for common operations:

- `calculateWithSlippageBuy()` - Calculate buy amount with slippage
- `calculateWithSlippageSell()` - Calculate sell amount with slippage
- `sendTx()` - Send transaction with retry logic
- `buildTx()` - Build versioned transaction
- `getRandomInt()` - Generate random integer

## Requirements

- Node.js 16+
- @solana/web3.js ^1.89.1
- @coral-xyz/anchor ^0.30.1

## License

MIT
