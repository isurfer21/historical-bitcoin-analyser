import React, { useState } from "react";
import SelectCurrency from "./select-currency";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import {
  setStartDate as putStartDate,
  setEndDate as putEndDate,
  setTargetCurrency as putTargetCurrency,
} from "../redux/slices/report-slice";

const DEFAULT_CURRENCY = 'USD';

function FormBPI() {
  const steer = useNavigate();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState("2024-04-01");
  const [endDate, setEndDate] = useState("2024-04-29");
  const [targetCurrency, setTargetCurrency] = useState(DEFAULT_CURRENCY);

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setTargetCurrency(DEFAULT_CURRENCY);

    dispatch(putStartDate(""));
    dispatch(putEndDate(""));
    dispatch(putTargetCurrency(DEFAULT_CURRENCY));
  };

  const handleSubmit = () => {
    dispatch(putStartDate(startDate));
    dispatch(putEndDate(endDate));
    dispatch(putTargetCurrency(targetCurrency));

    steer('/report');
  };

  return (
    <div className="card">
      <header>
        <h4>Bitcoin Price Index Form</h4>
      </header>
      <form>
        <p>
          <label>Start date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </p>
        <p>
          <label>End date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </p>
        <p>
          <label>Output Currency</label>
          <SelectCurrency value={targetCurrency} onChange={(currency) => setTargetCurrency(currency)} />
        </p>
        <footer className="is-left">
          <button type="button" className="button primary" onClick={handleSubmit}>
            Submit
          </button>
          <button type="button" className="button secondary" onClick={handleReset}>
            Clear
          </button>
        </footer>
      </form>
    </div>
  );
}

export default FormBPI;
