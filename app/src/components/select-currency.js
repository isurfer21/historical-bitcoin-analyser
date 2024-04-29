import React, { memo, useState, useEffect } from "react";
import { getSupportedCurrencies } from "../services/api-service"; 

function SelectCurrency(props) {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        let data = await getSupportedCurrencies();
        setCurrencies(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCurrencies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrencies();
  }, []);

  return (
    <>
      <select name="currency" value={props.value} onChange={(e) => props.onChange(e.target.value)}>
        {currencies.map((item) => (
          <option value={item.currency} key={crypto.randomUUID()}>
            {item.country} ({item.currency})
          </option>
        ))}
      </select>
      {loading && <span className="info block small">Loading ...</span>}
      {error && <span className="error block small">{error}</span>}
    </>
  );
}

export default memo(SelectCurrency);
