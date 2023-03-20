import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepository) {}

  async execute(
    request: CreateGymUseCaseRequest
  ): Promise<CreateGymUseCaseResponse> {
    const { title, description, phone, latitude, longitude } = request;

    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    });

    return { gym };
  }
}
