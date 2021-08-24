import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import adaptRequest from "./helpers/adapt-request";
import {
  purchaseEndpointHandler,
  breakageEndpointHandler,
  companyEndpointHandler,
  merchantEndpointHandler,
  stockEndpointHandler,
  returnEndpointHandler,
  invoiceEndpointHandler,
} from "./controller";
(() => {
  const server = express();
  const port = 8080;

  server.use(cors());
  server.use(bodyParser.json());

  server.all("/purchase", purchaseController);
  server.get("/purchase/:id", purchaseController);

  server.all("/breakage", breakageController);
  server.get("/breakage/:id", breakageController);

  server.all("/company", companyController);
  server.get("/company/:id", companyController);

  server.all("/merchant", merchantController);
  server.get("/merchant/:id", merchantController);

  server.all("/stock", stockController);
  server.get("/stock/:id", stockController);

  server.all("/return", returnController);
  server.get("/return/:id", returnController);

  server.all("/invoice", invoiceController);
  server.get("/invoice/:id", invoiceController);

  server.get("/", (req, res) => {
    res.send("Hello World!");
  });

  function purchaseController(req, res) {
    const httpRequest = adaptRequest(req);
    console.log(httpRequest);
    purchaseEndpointHandler(httpRequest)
      .then(({ headers, statusCode, data }) =>
        res.set(headers).status(statusCode).send(data)
      )
      .catch((e) => res.status(500).end());
  }

  function breakageController(req, res) {
    const httpRequest = adaptRequest(req);
    breakageEndpointHandler(httpRequest)
      .then(({ headers, statusCode, data }) =>
        res.set(headers).status(statusCode).send(data)
      )
      .catch((e) => res.status(500).end());
  }

  function companyController(req, res) {
    const httpRequest = adaptRequest(req);
    companyEndpointHandler(httpRequest)
      .then(({ headers, statusCode, data }) =>
        res.set(headers).status(statusCode).send(data)
      )
      .catch((e) => res.status(500).end());
  }

  function merchantController(req, res) {
    const httpRequest = adaptRequest(req);
    merchantEndpointHandler(httpRequest)
      .then(({ headers, statusCode, data }) =>
        res.set(headers).status(statusCode).send(data)
      )
      .catch((e) => res.status(500).end());
  }

  function stockController(req, res) {
    const httpRequest = adaptRequest(req);
    stockEndpointHandler(httpRequest)
      .then(({ headers, statusCode, data }) =>
        res.set(headers).status(statusCode).send(data)
      )
      .catch((e) => res.status(500).end());
  }

  function returnController(req, res) {
    const httpRequest = adaptRequest(req);
    returnEndpointHandler(httpRequest)
      .then(({ headers, statusCode, data }) =>
        res.set(headers).status(statusCode).send(data)
      )
      .catch((e) => res.status(500).end());
  }

  function invoiceController(req, res) {
    const httpRequest = adaptRequest(req);
    invoiceEndpointHandler(httpRequest)
      .then(({ headers, statusCode, data }) =>
        res.set(headers).status(statusCode).send(data)
      )
      .catch((e) => res.status(500).end());
  }

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();
