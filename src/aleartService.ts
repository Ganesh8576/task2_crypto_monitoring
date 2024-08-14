import { connectDB } from '../src/mongodbClient';

interface Alert {
  userId: string;
  cryptocurrency: string;
  threshold: number;
}

async function setAlert(userId: string, cryptocurrency: string, threshold: number) {
  const db = await connectDB();
  const alerts = db.collection('alerts');

  await alerts.insertOne({ userId, cryptocurrency, threshold });
}

async function checkAlerts(prices: any) {
  const db = await connectDB();
  const alerts = db.collection('alerts');

  const alertsToTrigger = await alerts.find().toArray();

  alertsToTrigger.forEach((alert: Alert)=> {
    const currentPrice = prices[alert.cryptocurrency]?.usd;
    if (currentPrice && currentPrice >= alert.threshold) {
      console.log(`Alert for user ${alert.userId}: ${alert.cryptocurrency} price is ${currentPrice}`);
      // Send alert to the user
    }
  });
}

export { setAlert, checkAlerts };
