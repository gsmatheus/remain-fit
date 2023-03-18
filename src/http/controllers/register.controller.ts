import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const userRespository = new PrismaUsersRepository();
    const registerUseCase = new RegisterUseCase(userRespository);

    await registerUseCase.execute({ name, email, password });

    return reply.status(201).send({
      message: "User created successfully",
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      });
    }

    throw err;
  }
}
