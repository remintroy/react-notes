import { model } from "mongoose";
import noteSchema from "./note.schema";

const NoteModel = model<noteSchema>("notes", noteSchema);

export default NoteModel;
