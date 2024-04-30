import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/users";
import { RegisterUserDTO } from "../types/dtos/register-user.dto";
import { MESSAGES } from "../utils/messages";
import { LoginUserDTO } from "../types/dtos/login-user.dto";
import { Response } from "express";

export const register = async (
  registerUserDTO: RegisterUserDTO,
  res: Response
) => {
  try {
    const { email, password } = registerUserDTO;

    const hashedPassword = await bcrypt.hash(password, 10);

    await new User({
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({ message: MESSAGES.REGISTER_SUCCESS });
  } catch (err: any) {
    res.status(500).send({ message: MESSAGES.INT_SER_ERR, stack: err.stack });
  }
};

export const login = async (loginUserDTO: LoginUserDTO, res: Response) => {
  try {
    const { email, password } = loginUserDTO;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: MESSAGES.USER_NOT_FOUND_ERR });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ message: MESSAGES.PASS_MATCH_ERR });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).send({ data: token });
  } catch (err: any) {
    res.status(500).send({ message: MESSAGES.INT_SER_ERR, stack: err.stack });
  }
};
