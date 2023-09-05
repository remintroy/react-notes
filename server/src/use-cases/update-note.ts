import NoteRepository from "../adaptor/repository/noteRepository";
import GetUtils from "../lib/utils";

export default async function updateNote(noteRepository: NoteRepository, utils: GetUtils, noteData: Note) {
    if (!noteData?.noteid) utils.createError(400, "noteid is requred to update a note");
    await noteRepository.edit(noteData?.noteid, noteData).catch(utils.throwInternalError("Failed to update note"));
    return { updated: true };
}