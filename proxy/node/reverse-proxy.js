const http = require("http");
const { URL } = require("url");
const path = require("path");

const cliArgs = { _: [] };
process.argv.forEach((str, index) => {
  if (index >= 2) {
    if (/^[\-\-]{1,2}.+[\=\:].*$/.test(str)) {
      const argParts = str.split(/[\=\:]/),
        argName = argParts[0].substring(argParts[0].lastIndexOf("-") + 1);

      if (argParts[0].lastIndexOf("-") < 2) {
        cliArgs[argName] = argParts[1];
      }
    } else if (/^[\-\-]{1,2}.+$/.test(str)) {
      const argName = str.substring(str.lastIndexOf("-") + 1);

      if (str.lastIndexOf("-") < 2) {
        cliArgs[argName] = true;
      }
    } else {
      cliArgs._.push(str);
    }
  }
});

if (cliArgs.h || cliArgs.help) {
  console.log(`
Options:
 -h --help              display help menu
 -a --addr=HOST         provide server host address [default: 127.0.0.1]
 -p --port=PORT         provide server port [default: 8080]
 -c --conf=FILE_PATH    provide proxies configuration file path
 
Examples:
 $ node reverse-proxy.js --help
 $ node reverse-proxy.js --addr=127.0.0.1 --port=8081 --conf=./proxy-config.json
    `);
} else {
  const host = cliArgs.addr || cliArgs.a || "127.0.0.1";
  const port = cliArgs.port || cliArgs.p || 8080;

  const proxyConfig = require(path.join(__dirname, cliArgs.conf || cliArgs.c || "proxy-config.json"));

  const server = http.createServer((req, res) => {
    console.log(new Date().toISOString(), req.method, "Proxying", req.url);

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const proxyPath = parsedUrl.pathname + parsedUrl.search;
    
    let targetUrl;
    
    for (const partialPath in proxyConfig) {
      if (partialPath == "/") {
        targetUrl = proxyConfig[partialPath];
        break;
      } else if (proxyPath.startsWith(partialPath)) {
        const relevantPath = proxyPath.replace(partialPath, "");
        targetUrl = proxyConfig[partialPath] + relevantPath;
        break;
      }
    }

    console.log(new Date().toISOString(), req.method, "Rerouting", targetUrl);

    if (!targetUrl) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }

    const parsedTargetUrl = new URL(targetUrl);
    const options = {
      hostname: parsedTargetUrl.hostname,
      port: parsedTargetUrl.port || 80,
      path: parsedTargetUrl.pathname + parsedTargetUrl.search,
      method: req.method,
      headers: req.headers,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on("error", (err) => {
      console.error("Error proxying request:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal server error");
    });

    req.pipe(proxyReq, { end: true });
    return;
  });

  server.listen(port, host, () => {
    console.log(`Reverse proxy server running at http://${host}:${port}/`);
  });
}
