const http = require("http");
const url = require("url");

class RestAPI {
  get(path, handler) {
    this.routes["GET"][path] = handler;
  }

  post(path, handler) {
    this.routes["POST"][path] = handler;
  }

  put(path, handler) {
    this.routes["PUT"][path] = handler;
  }

  delete(path, handler) {
    this.routes["DELETE"][path] = handler;
  }

  listen(port, host, callback) {
    this.server = http.createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true);
      const path = parsedUrl.pathname;
      const query = parsedUrl.query;
      const method = req.method;

      if (this.routes[method] && this.routes[method][path]) {
        this.routes[method][path](req, res);
      } else {
        res.writeHead(404);
        res.end("Not found");
      }
    });

    this.server.listen(port, host, callback);
  }

  close() {
    this.server.close();
  }
}

module.exports = RestAPI;
