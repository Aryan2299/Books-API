import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  author: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  publication_year: { type: Number, required: true },
});

export const Book = mongoose.model("Book", bookSchema);
