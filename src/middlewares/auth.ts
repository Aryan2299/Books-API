import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { MESSAGES } from "../utils/messages";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //@ts-ignore
  const token = req.headers["authorization"]
    ?.split("Bearer ")
    .join("") as string;

  if (!token) return res.status(401).json({ error: MESSAGES.UNAUTH_ERR });

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

  try {
    //@ts-ignore
    req.userId = decoded.userId;

    next();
  } catch (error) {
    res.status(401).json({ error: MESSAGES.TOKEN_ERR });
  }
};
