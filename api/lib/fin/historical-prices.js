const nodeEnv = process.env.NODE_ENV ? `${process.env.NODE_ENV}-` : "";
const configFilepath = `../../${nodeEnv}config.json`;

const config = require(configFilepath);
const HttpWrapper = require("../http-wrapper");

async function fetchHistoricalData(startDate, endDate) {
  const url = `${config.api.historical_prices}?start=${startDate}&end=${endDate}`;
  const options = {};
  try {
    const response = await HttpWrapper.get(url, options);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function fetchHistoricalBitcoinData(startDate, endDate) {
  const isoStartDate = new Date(startDate).toISOString().slice(0, 16);
  const isoEndDate = new Date(endDate).toISOString().slice(0, 16);
  const url = `${config.api.btc_historical_prices}?start_date=${isoStartDate}&end_date=${isoEndDate}&interval=1d&ohlc=true`;
  const options = {};
  try {
    const response = await HttpWrapper.get(url, options);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = { fetchHistoricalData, fetchHistoricalBitcoinData };
