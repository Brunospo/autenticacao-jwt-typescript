import { Request, Response } from "express";
import { BadRequestError } from "../helpers/api-erros";
import { userRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await userRepository.findOneBy({ email })

    if (!user) {
      throw new BadRequestError("E-mail ou senha invalidos.")
    }

    const isCorrectPass = await bcrypt.compare(password, user.password)

    if (!isCorrectPass) {
      throw new BadRequestError("E-mail ou senha invalidos.")
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECURY ?? "")

    const { password: _, ...userLogin } = user

    return res.json({
      user: userLogin,
      token
    })
  }

  async getProfile(req: Request, res: Response) {
    return res.json(req.user)
  }
}