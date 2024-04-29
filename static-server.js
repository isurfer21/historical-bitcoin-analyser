const http = require("http");
const fs = require("fs");
const path = require("path");
const mime = require("./mime-types.json");

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
 -h --help            display help menu
 -a --addr=HOST       provide server host address [default: 127.0.0.1]
 -p --port=PORT       provide server port [default: 8080]
 -d --dir=DIR_PATH    provide serving directory path
 
Examples:
 $ node static-server.js --help
 $ node static-server.js --addr=127.0.0.1 --port=8081 --dir=./mock
    `);
} else {
  const host = cliArgs.addr || cliArgs.a || "127.0.0.1";
  const port = cliArgs.port || cliArgs.p || 8080;
  const staticDir = path.join(__dirname, cliArgs.dir || cliArgs.d);

  const server = http.createServer((req, res) => {
    const hasQueryAt = req.url.indexOf("?");
    const reqUrl = hasQueryAt < 0 ? req.url : req.url.substring(0, hasQueryAt);
    const filePath = path.join(staticDir, reqUrl) + (reqUrl.endsWith("/") ? "index.html" : "");
    console.log(new Date().toISOString(), req.method, reqUrl);
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("File not found");
      } else {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal server error");
          } else {
            const ext = path.extname(filePath).slice(1);
            const contentType = mime.types[ext] || mime.types.txt;
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
          }
        });
      }
    });
  });

  server.listen(port, host, () => {
    console.log(`Static server running at http://${host}:${port}/`);
  });
}
