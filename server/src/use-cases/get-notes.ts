import NoteRepository from "../adaptor/repository/noteRepository";
import GetUtils from "../lib/utils";

export default async function getNotes(noteRepository: NoteRepository, utils: GetUtils,) {
    const notes = await noteRepository.getAll().catch(utils.throwInternalError("Failed fetch notes data"));
    const output = {};
    notes.forEach(note => {
        let { noteid, author, body, category, title, createdAt, updatedAt } = note;
        output[note.noteid] = { noteid, author, body, category, title, createdAt, updatedAt }
    });
    return output;
}