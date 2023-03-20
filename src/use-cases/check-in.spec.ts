import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { CheckInUseCase } from "./check-in";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins-error";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    vi.useFakeTimers();

    await gymsRepository.create({
      id: "gym-id",
      title: "Gym Name",
      description: "Gym Description",
      phone: "123456789",
      latitude: -22.2045374,
      longitude: -49.9743474,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-id",
      gymId: "gym-id",
      userLatitude: -22.2045374,
      userLongitude: -49.9743474,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date("2021-01-01 12:00:00"));

    await sut.execute({
      userId: "user-id",
      gymId: "gym-id",
      userLatitude: -22.2045374,
      userLongitude: -49.9743474,
    });

    await expect(() =>
      sut.execute({
        userId: "user-id",
        gymId: "gym-id",
        userLatitude: -22.2045374,
        userLongitude: -49.9743474,
      })
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date("2021-01-01 12:00:00"));

    await sut.execute({
      userId: "user-id",
      gymId: "gym-id",
      userLatitude: -22.2045374,
      userLongitude: -49.9743474,
    });

    vi.setSystemTime(new Date("2021-01-21 12:00:00"));

    const { checkIn } = await sut.execute({
      userId: "user-id",
      gymId: "gym-id",
      userLatitude: -22.2045374,
      userLongitude: -49.9743474,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    const gym = await gymsRepository.create({
      title: "Gym Name",
      description: "Gym Description",
      phone: "123456789",
      latitude: new Decimal(-22.0770169),
      longitude: new Decimal(-49.9523747),
    });

    await expect(() =>
      sut.execute({
        userId: "user-id",
        gymId: gym.id,
        userLatitude: -22.2045374,
        userLongitude: -49.9743474,
      })
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
