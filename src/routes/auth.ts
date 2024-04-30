import express, { Request, Response } from "express";

import { login, register } from "../services/auth";

export const authRouter = express.Router();

/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              username:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      500:
 *        description: Server Error
 */
authRouter.post("/login", (req: Request, res: Response) =>
  login(req.body, res)
);

/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Login as a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
authRouter.post("/register", (req: Request, res: Response) =>
  register(req.body, res)
);
