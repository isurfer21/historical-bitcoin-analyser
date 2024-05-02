const getHistoricalPrices = async (startDate, endDate, targetCurrency) => {
  const historicalPriceUrl =
    !startDate || !endDate || !targetCurrency
      ? null
      : `/api/historical-prices?startDate=${startDate}&endDate=${endDate}&targetCurrency=${targetCurrency}`;

  if (!!historicalPriceUrl) {
    try {
      const response = await fetch(historicalPriceUrl);
      if (!response.ok) {
        throw new Error(
          `Error: The service '/api/historical-prices' status is ${response.status} (${response.statusText})`
        );
      }
      let data = await response.json();
      return data.prices;
    } catch (err) {
      throw new Error(err.message);
    }
  } else {
    throw new Error("Error: Missing required fields");
  }
};

const getSupportedCurrencies = async () => {
  try {
    const response = await fetch("/api/supported-currencies");
    if (!response.ok) {
      throw new Error(
        `Error: The service '/api/supported-currencies' status is ${response.status} (${response.statusText})`
      );
    }
    let data = await response.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getHistoricalPrices,
  getSupportedCurrencies
}