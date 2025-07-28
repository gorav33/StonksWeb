// routes/marketRoutes.js
const express = require('express');
const router = express.Router();
const MarketDataFetcher = require('../services/markit'); // ✅ Correct path

const fetcher = new MarketDataFetcher({
  alphaVantage: process.env.ALPHA_VANTAGE_KEY,
  finnhub: process.env.FINNHUB_KEY,
  polygon: process.env.POLYGON_KEY
});

router.get('/vix', async (req, res) => {
  try {
    const data = await fetcher.getVixDataYahoo();
    res.json(data);
  } catch (err) {
    console.error('VIX error:', err);
    res.status(500).json({ error: 'Failed to fetch VIX data' });
  }
});

router.get('/fear-greed', async (req, res) => {
  try {
    const data = await fetcher.getFearGreedIndex();
    res.json(data);
  } catch (err) {
    console.error('FG error:', err);
    res.status(500).json({ error: 'Failed to fetch Fear & Greed Index' });
  }
});

router.get('/overview', async (req, res) => {
  try {
    const data = await fetcher.getMarketOverview();
    res.json(data);
  } catch (err) {
    console.error('Overview error:', err);
    res.status(500).json({ error: 'Failed to fetch Market Overview' });
  }
});

module.exports = router;
