import NoteRepository from "../adaptor/repository/noteRepository";
import GetUtils from "../lib/utils";

export default async function deleteNote(noteRepository: NoteRepository, utils: GetUtils, noteData: Note) {
    if (!noteData?.noteid) utils.createError(400, "noteid is required to delete a note");
    await noteRepository.delete(noteData?.noteid).catch(utils.throwInternalError("Failed to delete note"));
    return { deleted: true };
}