import { PaginateModel, model } from "mongoose";
import noteSchema from "./note.schema";
import paginate from 'mongoose-paginate-v2';

noteSchema.plugin(paginate);

const NoteModel = model<Note, PaginateModel<Note>>("notes", noteSchema);

export default NoteModel;
