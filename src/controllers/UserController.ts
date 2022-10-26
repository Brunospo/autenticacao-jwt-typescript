import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt"

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body

    const existsUser = await userRepository.findOneBy({ email })

    if (existsUser) {
      throw new BadRequestError("E-mail já cadastrado.")
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = userRepository.create({
      name,
      email,
      password: hashPassword
    })

    await userRepository.save(newUser)

    const {password: _, ...user} = newUser

    return res.status(201).json(user)
  }
}