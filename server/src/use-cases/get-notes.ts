import NoteRepository from "../adaptor/repository/noteRepository";
import GetUtils from "../lib/utils";

export default async function getNotes(noteRepository: NoteRepository, utils: GetUtils, { page }: { page: number }) {
    const notes = await noteRepository.getAll(page).catch(utils.throwInternalError("Failed fetch notes data"));
    return notes;
}