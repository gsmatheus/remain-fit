import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Gym Title",
      description: "Gym Description",
      phone: "Gym Phone",
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
