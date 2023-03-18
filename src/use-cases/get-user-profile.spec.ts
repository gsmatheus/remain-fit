import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    const createdUser = await usersRepository.create({
      name: "Teste",
      email: "teste223@example.com",
      password_hash: await hash("123456", 8),
    });

    const { user } = await sut.execute({
      userId: createdUser.id,
    });

    expect(user.name).toEqual("Teste");
  });

  it("should not be able to get user profile if user does not exists", async () => {
    await expect(
      sut.execute({
        userId: "user-1",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
