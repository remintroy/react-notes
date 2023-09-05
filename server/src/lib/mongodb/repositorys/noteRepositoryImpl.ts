import NoteRepository from "../../../adaptor/repository/noteRepository";
import NoteModel from "../models/note";

export default class NoteRepositoryImpl implements NoteRepository {
  add(noteData: Note) {
    return new NoteModel(noteData).save();
  }

  get(noteid: string) {
    return NoteModel.findOne({ noteid, deleted: false });
  }

  edit(noteid: string, data: Note) {
    return NoteModel.findOneAndUpdate({ noteid }, { $set: data });
  }

  delete(noteid: string) {
    // Soft delete
    return NoteModel.findOneAndUpdate({ noteid }, { $set: { noteid: `${noteid}_deleted`, deleted: true } });
  }

}
