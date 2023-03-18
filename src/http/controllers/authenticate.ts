import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const userRespository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(userRespository);

    await authenticateUseCase.execute({ email, password });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: err.message,
      });
    }

    throw err;
  }

  return reply.status(200).send({
    message: "User authenticated successfully",
  });
}
