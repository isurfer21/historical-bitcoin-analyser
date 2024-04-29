import React, { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { reportStartDate, reportEndDate, reportTargetCurrency } from "../redux/slices/report-slice";
import { getHistoricalPrices } from "../services/api-service";

const formatDate = (inputDate) => {
  const [year, month, day] = inputDate.split("-");
  return `${day}-${month}-${year}`;
};

function ReportBPI() {
  const steer = useNavigate();

  const startDate = useSelector(reportStartDate);
  const endDate = useSelector(reportEndDate);
  const targetCurrency = useSelector(reportTargetCurrency);

  const [historicalPrices, setHistoricalPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleReturn = () => {
    steer("/");
  };

  useEffect(() => {
    const fetchHistoricalPrices = async () => {
      if (!!startDate && !!endDate && !!targetCurrency) {
        try {
          let data = await getHistoricalPrices(startDate, endDate, targetCurrency);
          setHistoricalPrices(data);
          setError(null);
        } catch (err) {
          setError(err.message);
          setHistoricalPrices([]);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError("Error: Missing required fields");
      }
    };
    fetchHistoricalPrices();
  }, [startDate, endDate, targetCurrency]);

  return (
    <div className="card">
      <header>
        <h4>Bitcoin Price Index Report</h4>
      </header>
      <div>
        {!error && (
          <table className="striped">
            <caption>Date vs. Price</caption>
            <thead>
              <tr>
                <th>
                  <span className="block">Date</span>
                  <span className="block small">
                    ({formatDate(startDate)} &minus; {formatDate(endDate)})
                  </span>
                </th>
                <th>
                  <span className="block">Price</span>
                  <span className="block small">({targetCurrency})</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {historicalPrices.map((historicalPrice) => (
                <tr key={crypto.randomUUID()}>
                  <td>{formatDate(historicalPrice.date)}</td>
                  <td>
                    {historicalPrice.price} {historicalPrice.high ? `(high)` : historicalPrice.low ? `(low)` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {loading && <span className="info block small">Loading ...</span>}
        {error && <span className="error block small">{error}</span>}
      </div>
      <footer className="is-left">
        <button type="button" className="button secondary" onClick={handleReturn}>
          Return
        </button>
      </footer>
    </div>
  );
}

export default memo(ReportBPI);
