const http = require("http");
const https = require("https");

class HttpWrapper {
  static get(url, config = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        ...config,
        method: "GET",
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
        },
      };

      const requestHandler = (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          if (res.statusCode === 200) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`HTTP error! Status code: ${res.statusCode}`));
          }
        });
      };

      const protocol = new URL(url).protocol;

      const req =
        protocol == "http:"
          ? http.request(url, options, requestHandler)
          : protocol == "https:"
          ? https.request(url, options, requestHandler)
          : null;

      req.on("error", (err) => {
        reject(err);
      });

      req.end();
    });
  }
  static post(url, data, config = {}) {
    return new Promise((resolve, reject) => {
      const options = {
        ...config,
        method: "POST",
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
        },
      };

      const requestHandler = (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          if (res.statusCode === 200 || res.statusCode === 201) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`HTTP error! Status code: ${res.statusCode}`));
          }
        });
      };

      const protocol = new URL(url).protocol;

      const req =
        protocol == "http:"
          ? http.request(url, options, requestHandler)
          : protocol == "https:"
          ? https.request(url, options, requestHandler)
          : null;

      req.on("error", (err) => {
        reject(err);
      });

      req.write(JSON.stringify(data));
      req.end();
    });
  }
}

module.exports = HttpWrapper;
