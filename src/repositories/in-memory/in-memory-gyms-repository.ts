import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  private gyms: Gym[] = [];

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.gyms.push(gym);

    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.gyms.find((gym) => gym.id === id);
    if (!gym) return null;

    return gym;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = this.gyms.filter((gym) => {
      const titleMatches = gym.title
        .toLowerCase()
        .includes(query.toLowerCase());
      const descriptionMatches = gym.description
        ?.toLowerCase()
        .includes(query.toLowerCase());

      return titleMatches || descriptionMatches;
    });

    return gyms.slice((page - 1) * 20, page * 20);
  }
}
