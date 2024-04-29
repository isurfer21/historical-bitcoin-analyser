const config = require("../../config.json");
const HttpWrapper = require("../http-wrapper");

async function getSupportedCurrencies() {
  const url = config.api.supported_currencies;
  const options = {};
  try {
    const response = await HttpWrapper.get(url, options);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

module.exports = { getSupportedCurrencies };
