import express, { Request, Response } from "express";

import { verifyToken } from "../middlewares/auth";
import {
  createBook,
  filterBooks,
  getAllBooks,
  removeBook,
  updateBook,
} from "../services/books";

export const booksRouter = express.Router();

/**
 * @openapi
 * '/api/books':
 *  post:
 *     tags:
 *     - Books Controller
 *     summary: Creates a book
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          required: true
 *          default: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJjZTQyMDhmYjliNzllNjE1OGRjYTQiLCJpYXQiOjE3MTQyMTg5NDYsImV4cCI6MTcxNDIyMjU0Nn0.SLa3VaiQqUZ6yx-f153lmC06oMcCj-RsE9kqEeRS8bA
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - author
 *              - title
 *              - publication_year
 *            properties:
 *              author:
 *                type: string
 *                default: Cixin Liu
 *              title:
 *                type: string
 *                default: The Three Body Problem
 *              publication_year:
 *                type: number
 *                default: 2015
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
booksRouter.post("/", verifyToken, (req: Request, res: Response) =>
  createBook(req.body, res)
);

/**
 * @openapi
 * '/api/books':
 *  get:
 *     tags:
 *     - Books Controller
 *     summary: Fetches all books
 *     parameters:
 *      - in: header
 *        name: page
 *        schema:
 *          type: number
 *          required: true
 *          default: 1
 *      - in: header
 *        name: limit
 *        schema:
 *          type: number
 *          required: true
 *          default: 10
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          required: true
 *          default: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJjZTQyMDhmYjliNzllNjE1OGRjYTQiLCJpYXQiOjE3MTQyMTg5NDYsImV4cCI6MTcxNDIyMjU0Nn0.SLa3VaiQqUZ6yx-f153lmC06oMcCj-RsE9kqEeRS8bA
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
booksRouter.get("/", verifyToken, (req: Request, res: Response) =>
  //@ts-ignore
  getAllBooks({ page: +req.query.page, limit: +req.query.limit }, res)
);

/**
 * @openapi
 * '/api/books':
 *  delete:
 *     tags:
 *     - Books Controller
 *     summary: Deletes a book
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          required: true
 *          default: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJjZTQyMDhmYjliNzllNjE1OGRjYTQiLCJpYXQiOjE3MTQyMTg5NDYsImV4cCI6MTcxNDIyMjU0Nn0.SLa3VaiQqUZ6yx-f153lmC06oMcCj-RsE9kqEeRS8bA
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - _id
 *            properties:
 *              _id:
 *                type: string
 *                default: 6630add270b1286cb81bc893
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
booksRouter.delete("/", verifyToken, (req: Request, res: Response) =>
  removeBook(req.body, res)
);

/**
 * @openapi
 * '/api/books':
 *  patch:
 *     tags:
 *     - Books Controller
 *     summary: Updates a book
 *     parameters:
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          required: true
 *          default: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJjZTQyMDhmYjliNzllNjE1OGRjYTQiLCJpYXQiOjE3MTQyMTg5NDYsImV4cCI6MTcxNDIyMjU0Nn0.SLa3VaiQqUZ6yx-f153lmC06oMcCj-RsE9kqEeRS8bA
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - _id
 *              - update
 *            properties:
 *              _id:
 *                type: string
 *                default: 6630add270b1286cb81bc893
 *              update:
 *                type: object
 *                default: {title ?: "example", author ?: "example", publication_year ?: 2000}
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
booksRouter.patch("/", verifyToken, (req: Request, res: Response) =>
  updateBook(req.body, res)
);

/**
 * @openapi
 * '/api/books/filter':
 *  post:
 *     tags:
 *     - Books Controller
 *     summary: Filters books (by either author or publication year; default - filter by author)
 *     parameters:
 *      - in: header
 *        name: page
 *        schema:
 *          type: number
 *          required: true
 *          default: 1
 *      - in: header
 *        name: limit
 *        schema:
 *          type: number
 *          required: true
 *          default: 10
 *      - in: header
 *        name: Authorization
 *        schema:
 *          type: string
 *          required: true
 *          default: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjJjZTQyMDhmYjliNzllNjE1OGRjYTQiLCJpYXQiOjE3MTQyMTg5NDYsImV4cCI6MTcxNDIyMjU0Nn0.SLa3VaiQqUZ6yx-f153lmC06oMcCj-RsE9kqEeRS8bA
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - author
 *              - publication_year
 *            properties:
 *              author:
 *                type: string
 *                required: false
 *              publication_year:
 *                type: number
 *                required: false
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      401:
 *        description: Unauthorized
 *      500:
 *        description: Server Error
 */
booksRouter.post("/filter", verifyToken, (req: Request, res: Response) =>
  filterBooks(
    { ...req.body, page: req.query.page, limit: req.query.limit },
    res
  )
);
