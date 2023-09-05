import NoteRepository from "../adaptor/repository/noteRepository";
import GetUtils from "../lib/utils";

export default async function getNote(noteRepository: NoteRepository, utils: GetUtils, { noteid }: Note) {
    if (!noteid) throw utils.createError(400, "noteid is requred to get a note")
    return await noteRepository.get(noteid).catch(utils.throwInternalError("Failed fetch notes data"));
}