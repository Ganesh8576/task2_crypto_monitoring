// src/priceService.ts
import axios from 'axios';
import redis from './redisClient';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd';

async function fetchPrices() {
  try {
    const response = await axios.get(COINGECKO_API_URL);
    const prices = response.data;

    // Cache the prices in Redis for 1 minute
    await redis.set('crypto_prices', JSON.stringify(prices), 'EX', 60);

    return prices;
  } catch (error) {
    console.error('Error fetching prices:', error);
    throw error;
  }
}

async function getCachedPrices() {
  const cachedPrices = await redis.get('crypto_prices');
  if (cachedPrices) {
    return JSON.parse(cachedPrices);
  }

  return await fetchPrices();
}

export { fetchPrices, getCachedPrices };
