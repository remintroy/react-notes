// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from "body-parser";
import { Express } from "express";
import logger from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import getConfig from "../../config";

export default function expressConfig(app: Express) {
  const config = getConfig();
  app.use(helmet());
  app.use(logger(config.morgan.logStyle));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.use(cookieParser());
  app.use(cors(config.cors));
}
