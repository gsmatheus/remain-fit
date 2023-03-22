import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "Gym Title",
      description: "Gym Description 1",
      phone: "Gym Phone",
      latitude: 0,
      longitude: 0,
    });
    await gymsRepository.create({
      title: "Title 2",
      description: "Gym Description 2",
      phone: "Gym Phone",
      latitude: 0,
      longitude: 0,
    });

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 1,
    });

    console.log(gyms);

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Gym Title" }),
      expect.objectContaining({ description: "Gym Description 2" }),
    ]);
  });

  it("should be able to fetch paginated gyms history", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Gym Title ${i}`,
        description: "Gym Description 2",
        phone: "Gym Phone",
        latitude: 0,
        longitude: 0,
      });
    }

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Gym Title 21" }),
      expect.objectContaining({ title: "Gym Title 22" }),
    ]);
  });
});
