import ExpressApp, { Router } from "express";

export default function UserRouterV1(express: typeof ExpressApp): Router {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.send("hai")
  })

  return router;
}
