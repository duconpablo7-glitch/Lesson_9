const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const indexPath = path.join(__dirname, "index.html");
const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;

  if (req.method !== "GET" || (pathname !== "/" && pathname !== "/index.html")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }

  fs.readFile(indexPath, (error, html) => {
    if (error) {
      res.writeHead(500);
      res.end("Impossible de lire index.html");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  });
}).listen(port, () => {
  console.log(`Serveur disponible sur http://localhost:${port}`);
});