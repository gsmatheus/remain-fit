import { CheckInsRepository } from "@/repositories/check-ins-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { CheckIn, User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(
    request: CheckInUseCaseRequest
  ): Promise<CheckInUseCaseResponse> {
    const { userId, gymId } = request;

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return {
      checkIn,
    };
  }
}
