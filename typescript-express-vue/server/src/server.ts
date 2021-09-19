import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import mainRouter from "./routes";

export default class Server {
  expressInstance: express.Express;

  constructor() {
    this.expressInstance = express();
    this.middlewareSetup();
    this.routingSetup();
  }

  private middlewareSetup() {
    // Setup requests gZip compression
    this.expressInstance.use(compression());

    // Setup common security protection
    this.expressInstance.use(helmet());

    // Setup Cross Origin access
    this.expressInstance.use(cors());
    this.expressInstance.options("*", cors());
    var allowCrossDomain = (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    };
    this.expressInstance.use(allowCrossDomain);

    // Setup requests format parsing (Only JSON requests will be valid)
    this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
    this.expressInstance.use(bodyParser.json());
  }

  private routingSetup() {
    // Instantiate mainRouter object
    let router = new mainRouter().router;

    // Add to server routes
    this.expressInstance.use("/", router);
  }
}
