import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-erros";
import { userRepository } from "../repositories/UserRepository";
import jwt from "jsonwebtoken"

interface JwtPayload {
  id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    if(!authorization) {
      throw new UnauthorizedError("Usuário não está logado.")
    }

    const token = authorization.replace("Bearer ", "").trim()

    const { id } = jwt.verify(token, process.env.JWT_SECURY ?? "") as JwtPayload
    
    const user = await userRepository.findOneBy({ id })

    if (!user) {
      throw new UnauthorizedError("Não autorizado.")
    }

    const { password: _, ...loggedUser } = user

    req.user = loggedUser

    next()
  }