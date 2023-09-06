import NoteRepository from "../adaptor/repository/noteRepository";
import GetUtils from "../lib/utils";

export default async function searchNote(noteRepository: NoteRepository, utils: GetUtils, searchQuery: string) {
    return noteRepository.search(searchQuery).catch(utils.throwInternalError("Failed to get notes data"))
}