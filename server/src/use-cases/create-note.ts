import NoteRepository from "../adaptor/repository/noteRepository";
import GetUtils from "../lib/utils";
import createNoteid from "./internal/create-noteid";

export default async function createNote(noteRepository: NoteRepository, utils: GetUtils) {
    // user & validation here
    const noteid = await createNoteid(noteRepository, utils);
    await noteRepository.add({ noteid });
    return { noteid };
}