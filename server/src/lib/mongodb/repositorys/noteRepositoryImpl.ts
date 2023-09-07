import { PaginateModel } from "mongoose";
import NoteRepository from "../../../adaptor/repository/noteRepository";
import NoteModel from "../models/note";

export default class NoteRepositoryImpl implements NoteRepository {
  add(noteData: Note) {
    return new NoteModel(noteData).save();
  }

  get(noteid: string) {
    return NoteModel.findOne({ noteid, deleted: false });
  }

  getAll(page?: number): any {
    const pageNumber = Number(page) || 1;
    return NoteModel.paginate({ deleted: false }, { page: pageNumber, limit: 10, sort: { updateAt: -1, createdAt: -1 } });
  }

  edit(noteid: string, data: Note) {
    return NoteModel.findOneAndUpdate({ noteid }, { $set: data });
  }

  delete(noteid: string) {
    // Soft delete
    return NoteModel.findOneAndUpdate({ noteid }, { $set: { noteid: `${noteid}_deleted`, deleted: true } });
  }

  async search(searchQuery: string) {
    try {
      const regex = new RegExp(`^${searchQuery}`, 'gi');

      return await NoteModel.find({
        deleted: false,
        $or: [
          { title: regex },
          { category: { $elemMatch: { $regex: regex } } },
        ],
      });
    } catch (error) {
      console.log(error)
    }
  }
}
