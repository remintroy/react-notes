import ExpressApp, { Router } from "express";
import NoteController from "../../../adaptor/controller/note";
import NoteRepositoryImpl from "../../mongodb/repositorys/noteRepositoryImpl";
import GetUtils from "../../utils";
import makeExpressCallback from "../middlewares/makeExpressCallback";

export default function UserRouterV1(express: typeof ExpressApp): Router {
  const router = express.Router();

  const noteRepository = new NoteRepositoryImpl();
  const utils = new GetUtils();

  const controller = new NoteController({
    noteRepository,
    utils
  })

  router.route('/search').get(makeExpressCallback(controller.searchNote))
  router.route('/')
    .post(makeExpressCallback(controller.createNote))
    .get(makeExpressCallback(controller.getNotes))
    .put(makeExpressCallback(controller.updateNote))
    .delete(makeExpressCallback(controller.deleteNote));
  router.route('/:id').get(makeExpressCallback(controller.getNote))

  return router;
}
