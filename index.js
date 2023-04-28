const fs = require("fs");
const http = require("http");
const url = require("url");

const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8")
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8")
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8")

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCT!NAME%}/g, product.productName);
  output = output.replace(/{%PRODUCT!IMAGE%}/g, product.image);
  output = output.replace(/{%PRODUCT!PRICE%}/g, product.price);
  output = output.replace(/{%PRODUCT!LOCATION%}/g, product.from);
  output = output.replace(/{%PRODUCT!NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%PRODUCT!QTY%}/g, product.quantity);
  output = output.replace(/{%PRODUCT!DESCRIPTION%}/g, product.description);
  output = output.replace(/{%PRODUCT!ID%}/g, product.id);

  if (!product.organic) output = output.replace(/{%NOT!ORGANIC%}/g, "not-organic");
  return output;
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el))
    const outputHtml = tempOverview.replace("{%PRODUCT!CARDS%}", cardsHtml);

    res.end(outputHtml);

    // Product Page
  } else if (pathName === '/product') {
    res.writeHead(200, { "Content-type": "text/html" });
    res.end(tempProduct);

    // API
  } else if (pathName === '/api') {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // 404 Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-custom-header": "hello world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000!");
});