const express = require("express");
const fs = require("fs");
const { spawn } = require("child_process");
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/price", async (req, res) => {
  const mint = req.query.mint;
  try {
    const r = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${mint}`);
    const data = await r.json();
    const pair = data.pairs?.[0];
    if (!pair) return res.json({ price: null });

    res.json({
      price: Number(pair.priceUsd) || null,
      marketCap: pair.fdv || pair.marketCap || null,
      volume24h: pair.volume?.h24 || null,
      change24h: pair.priceChange?.h24 || 0
    });
  } catch {
    res.json({ price: null });
  }
});

app.post("/api/buy", (req, res) => {
  const { mint, usd, stopLoss, takeProfit } = req.body;
  const config = { targetMint: mint, tradeUsd: usd, takeProfit, stopLoss, pollMs: 8000 };
  fs.writeFileSync("config.json", JSON.stringify(config, null, 2));
  const proc = spawn("npx", ["tsx", "bot-app.ts"], { shell: true, detached: true, stdio: "ignore" });
  proc.unref();
  res.json({ ok: true });
});

app.listen(3000, () => console.log("Tracker → http://localhost:3000/tracker.html"));
