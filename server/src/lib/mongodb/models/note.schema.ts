import { Schema } from "mongoose";

type noteSchema = Note;

const noteSchema = new Schema(
  {
    noteid: String,
    title: { type: String, default: "" },
    author: { type: String, default: "" },
    category: [String],
    body: { type: Object, default: {} },
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

export default noteSchema;
