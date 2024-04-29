import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import FormBPI from "./components/form-bpi";
import ReportBPI from "./components/report-bpi";

function App() {
  return (
    <div className="row app">
      <div className="col-2"></div>
      <div className="col-8">
        <Header />
        <Routes>
          <Route path="/*" element={<FormBPI />} />
          <Route path="report" element={<ReportBPI />} />
        </Routes>
        <Footer />
      </div>
      <div className="col-2"></div>
    </div>
  );
}

export default App;
