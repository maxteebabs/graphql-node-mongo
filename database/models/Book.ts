import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const bookSchema = new Schema({
  id: ObjectId,
  title: String,
  description: String,
  isActive: Boolean,
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  createdAt: { type: Date, default: Date.now }
})

export const Book = mongoose.model('Book', bookSchema);