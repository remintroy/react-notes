import { Schema } from "mongoose";

type noteSchema = Note;

const noteSchema = new Schema(
  {
    noteid: String,
    title: String,
    author: String,
    category: [String],
    body: {}
  },
  {
    timestamps: true,
  }
);

export default noteSchema;
