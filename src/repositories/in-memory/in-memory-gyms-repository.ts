import { Gym } from "@prisma/client";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  private gyms: Gym[] = [];

  async create(gym: Gym): Promise<Gym> {
    this.gyms.push(gym);

    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) return null;

    return gym;
  }
}
