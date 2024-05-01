const querystring = require("querystring");
const CliParser = require("./lib/cli-parser");
const RestApi = require("./lib/rest-api");
const hbpFetcher = require("./lib/biz/hbp-extractor");
const currenciesList = require("./lib/fin/currencies-list");

const cliArgs = CliParser.parse(process.argv);

if (cliArgs.h || cliArgs.help) {
  console.log(`
Options:
 -h --help         display help menu
 -a --addr=HOST    provide server host address [default: 127.0.0.1]
 -p --port=PORT    provide server port [default: 8080]
 
Examples:
 $ node api.js --help
 $ node api.js --addr=127.0.0.1 --port=8081
    `);
} else {
  const host = cliArgs.addr || cliArgs.a || "127.0.0.1";
  const port = cliArgs.port || cliArgs.p || 8080;

  const app = new RestApi();

  app.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };

  app.get("/", (req, res) => {
    console.log(new Date().toISOString(), req.method, req.url);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "API service is active!" }));
  });

  app.get("/supported-currencies", async (req, res) => {
    console.log(new Date().toISOString(), req.method, req.url);
    try {
      const currencies = await currenciesList.getSupportedCurrencies();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(currencies));
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error.message }));
    }
  });

  app.get("/historical-prices", async (req, res) => {
    console.log(new Date().toISOString(), req.method, req.url);
    if (req.url.indexOf("?") !== -1) {
      const queryParams = querystring.parse(req.url.split("?")[1]);
      const { startDate, endDate, targetCurrency } = queryParams;

      if (!startDate || !endDate || !targetCurrency) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Missing required parameters" }));
      } else {
        try {
          const prices = await hbpFetcher.getHistoricalBitcoinPrice(startDate, endDate, targetCurrency);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ prices }));
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: error.message }));
        }
      }
    } else {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "No parameters found" }));
    }
  });

  app.listen(port, host, () => {
    console.log(`API server running at http://${host}:${port}/`);
  });
}
