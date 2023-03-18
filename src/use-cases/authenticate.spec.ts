import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { expect, describe, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "Teste",
      email: "teste223@example.com",
      password_hash: await hash("123456", 8),
    });

    const { user } = await sut.execute({
      email: "teste223@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with invalid credentials", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    expect(
      sut.execute({
        email: "teste223@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with invalid password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "Teste",
      email: "teste223@example.com",
      password_hash: await hash("123456", 8),
    });

    expect(
      sut.execute({
        email: "teste223@example.com",
        password: "123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
