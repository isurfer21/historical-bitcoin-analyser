const nodeEnv = process.env.NODE_ENV ? `${process.env.NODE_ENV}-` : "";
const configFilepath = `../../${nodeEnv}config.json`;

const config = require(configFilepath);
const HttpWrapper = require("../http-wrapper");

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
let cache = {};
let cacheTimestamp = 0;

async function fetchRates() {
  try {
    const response = await HttpWrapper.get(config.api.exchange_rates);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

async function getRate(currencyIso) {
  if (!cacheTimestamp || Date.now() - cacheTimestamp > CACHE_TTL) {
    cache = await fetchRates();
    cacheTimestamp = Date.now();
  }
  return cache[currencyIso].rate;
}

module.exports = { getRate, fetchRates };
