const config = require("../../config.json");
const HttpWrapper = require("../http-wrapper");

const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
let cache = {};
let cacheTimestamp = 0;

async function fetchRates() {
  try { console.log('fetchRates url', config.api.exchange_rates)
    const response = await HttpWrapper.get(config.api.exchange_rates); console.log('fetchRates response', response)
    return response.rates;
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
