import ExpressApp, { Express } from "express";
import notFoundMiddleware from "../middlewares/notFound";
import getConfig from "../../../config";
import path from "path";
import UserRouterV1 from "./note";

export default function expressRoutes(app: Express, express: typeof ExpressApp) {
  const config = getConfig();
  app.use(path.join(`${config.baserUrls.note}`, `/api/v1`), UserRouterV1(express));
  app.use(notFoundMiddleware);
}
