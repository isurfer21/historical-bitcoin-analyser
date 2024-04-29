const historicalPrices = require("../fin/historical-prices");
const exchangeRates = require("../fin/exchange-rates");

function findHighLow(data) {
  let highest = null;
  let lowest = null;

  for (const date in data.bpi) {
    const price = data.bpi[date];
    if (!highest || price > highest.price) {
      highest = { date, price };
    }
    if (!lowest || price < lowest.price) {
      lowest = { date, price };
    }
  }

  return { highest, lowest };
}

async function getHistoricalPrice(startDate, endDate, targetCurrency = "USD") {
  try {
    const data = await historicalPrices.fetchHistoricalData(startDate, endDate);
    const { highest, lowest } = findHighLow(data);
    const targetRate = await exchangeRates.getRate(targetCurrency);
    const formattedData = Object.entries(data.bpi).map(([date, price]) => ({
      date,
      price: (price * targetRate).toFixed(4),
      ...(highest && highest.date === date ? { high: true } : {}),
      ...(lowest && lowest.date === date ? { low: true } : {}),
    }));
    return formattedData;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve data");
  }
}

async function getHistoricalBitcoinPrice(startDate, endDate, targetCurrency = "USD") {
  try {
    const response = await historicalPrices.fetchHistoricalBitcoinData(startDate, endDate);
    const entries = response.data.entries;
    const closingPrices = entries.map(([timestamp, open, high, low, closing]) => closing);
    const maxClosingPrice = Math.max(...closingPrices);
    const minClosingPrice = Math.min(...closingPrices);
    const targetRate = await exchangeRates.getRate(targetCurrency);
    const prices = entries.map(([timestamp, open, high, low, closing]) => {
      const isMax = closing === maxClosingPrice;
      const isMin = closing === minClosingPrice;
      return {
        date: new Date(timestamp).toISOString().slice(0, 10),
        price: (closing * targetRate).toFixed(4).toString(),
        high: isMax,
        low: isMin,
      };
    });
    return prices;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve data");
  }
}

module.exports = { getHistoricalPrice, getHistoricalBitcoinPrice };
