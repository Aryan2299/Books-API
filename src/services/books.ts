import { Response } from "express";

import { Book } from "../models/books";
import { CreateBookDTO } from "../types/dtos/create-book.dto";
import { FilterBooksDTO } from "../types/dtos/filter-books.dto";
import { GetBooksDTO } from "../types/dtos/get-books.dto";
import { RemoveBookDTO } from "../types/dtos/remove-book.dto";
import { UpdateBooksDTO } from "../types/dtos/update-book.dto";
import { MESSAGES } from "../utils/messages";

export const createBook = async (
  createBookDTO: CreateBookDTO,
  res: Response
) => {
  try {
    const { author, title, publication_year } = createBookDTO;

    const book = await findByTitle(title);
    const doesBookExist = !!book;

    if (doesBookExist) {
      return res.status(400).send({ message: MESSAGES.BOOK_EXISTS_ERR });
    }

    await new Book({ author, title, publication_year }).save();

    return res.status(201).send({ message: MESSAGES.BOOK_CREATED_SUCCESS });
  } catch (err: any) {
    return res
      .status(500)
      .send({ message: MESSAGES.INT_SER_ERR, stack: err.stack });
  }
};

export const removeBook = async (
  removeBookDTO: RemoveBookDTO,
  res: Response
) => {
  try {
    const { _id } = removeBookDTO;

    const book = await findById(_id);
    const doesBookExist = !!book;

    if (!doesBookExist) {
      return res
        .status(404)
        .send({ message: MESSAGES.BOOK_DOES_NOT_EXIST_ERR });
    }

    await Book.findByIdAndDelete(_id);

    return res.status(200).send({ message: MESSAGES.BOOK_REMOVED_SUCCESS });
  } catch (err: any) {
    return res
      .status(500)
      .send({ message: MESSAGES.INT_SER_ERR, stack: err.stack });
  }
};

export const updateBook = async (
  updateBooksDTO: UpdateBooksDTO,
  res: Response
) => {
  try {
    const { _id, update } = updateBooksDTO;
    const { author, title, publication_year } = update;

    const book = await findById(_id);
    const doesBookExist = !!book;

    if (!doesBookExist) {
      return res
        .status(404)
        .send({ message: MESSAGES.BOOK_DOES_NOT_EXIST_ERR });
    }

    if (title) {
      const doesNewTitleExist = !!(await findByTitle(title));

      if (doesNewTitleExist) {
        return res.status(400).send({ message: MESSAGES.BOOK_EXISTS_ERR });
      }
    }

    await Book.updateOne(
      { _id },
      {
        $set: {
          author: author || book.author,
          title: title || book.title,
          publication_year: publication_year || book.publication_year,
        },
      },
      { upsert: false }
    );

    return res.status(200).send({ message: MESSAGES.BOOK_UPDATED_SUCCESS });
  } catch (err: any) {
    return res
      .status(500)
      .send({ message: MESSAGES.INT_SER_ERR, stack: err.stack });
  }
};

export const getAllBooks = async (getBooksDTO: GetBooksDTO, res: Response) => {
  try {
    const { page, limit } = getBooksDTO;

    if (page <= 0 || limit <= 0) {
      return res
        .status(400)
        .send({ message: MESSAGES.INVALID_PAGE_PARAMS_ERR });
    }

    const books = await Book.find()
      .skip((page - 1 || 0) * (limit || 10))
      .limit(limit || 10);

    const total = await Book.countDocuments();

    return res.status(200).send({ data: books, total });
  } catch (err: any) {
    return res
      .status(500)
      .send({ message: MESSAGES.INT_SER_ERR, stack: err.stack });
  }
};

export const filterBooks = async (
  filterBooksDTO: FilterBooksDTO,
  res: Response
) => {
  try {
    const { author, publication_year } = filterBooksDTO;
    const { page, limit } = filterBooksDTO;
    let data;
    let total;

    if (page <= 0 || limit <= 0) {
      return res
        .status(400)
        .send({ message: MESSAGES.INVALID_PAGE_PARAMS_ERR });
    }

    if (author) {
      data = await Book.find({ author })
        .skip((page - 1 || 0) * (limit || 10))
        .limit(limit || 10);

      total = await Book.countDocuments({ author })
        .skip((page - 1 || 0) * (limit || 10))
        .limit(limit || 10);
    } else {
      data = await Book.find({ publication_year })
        .skip((page - 1 || 0) * (limit || 10))
        .limit(limit || 10);

      total = await Book.countDocuments({ publication_year })
        .skip((page - 1 || 0) * (limit || 10))
        .limit(limit || 10);
    }

    return res.status(200).send({ data, total });
  } catch (err: any) {
    return res
      .status(500)
      .send({ message: MESSAGES.INT_SER_ERR, stack: err.stack });
  }
};

const findByTitle = async (title: string) => {
  return Book.findOne({ title });
};

const findById = async (_id: string) => {
  return Book.findById(_id);
};
