# Crypto Price Tracker

Local dashboard that tracks Solana tokens, shows price + market cap + volume, alerts on moves, and can launch an automated buy with stop-loss / take-profit.

## Setup

1. Extract the files.
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and add your private key (only needed if you use the Buy In button).
4. Make sure `bot-app.ts` (from the earlier automated bot) is in the same folder if you want Buy In to work.
5. Start the server:
   ```
   node server.js
   ```
6. Open http://localhost:3000/tracker.html

## Features

- Add tokens by mint address
- Live price, market cap, 24h volume, 24h change
- Filters: ignore coins below minimum market cap or volume
- Browser notifications on big moves
- Buy In button that launches the automated trader

Low-cap / low-volume coins are skipped based on the filters you set at the top.
