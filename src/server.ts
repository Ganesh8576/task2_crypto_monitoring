import express from 'express';
import { fetchPrices, getCachedPrices } from '../src/priceService';
import { setAlert, checkAlerts } from '../src/aleartService';

const app = express();
app.use(express.json());

app.post('/set-alert', async (req, res) => {
  const { userId, cryptocurrency, threshold } = req.body;
  await setAlert(userId, cryptocurrency, threshold);
  res.send('Alert set successfully');
});

app.get('/prices', async (req, res) => {
  const prices = await getCachedPrices();
  res.json(prices);
});

// Periodically fetch and update prices
setInterval(async () => {
  try {
    const prices = await fetchPrices();
    await checkAlerts(prices);
  } catch (error) {
    console.error('Error during periodic price update:', error);
  }
}, 60000); // Update every minute

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
