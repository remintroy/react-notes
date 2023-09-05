import NoteRepository from "../../adaptor/repository/noteRepository";
import GetUtils from "../../lib/utils";

export default async function createNoteid(noteRepository: NoteRepository, utils: GetUtils) {
  let noteid = "";
  do {
    noteid = utils.generateRandomId();
  } while (await noteRepository.get(noteid));
  return noteid;
}
