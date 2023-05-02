import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users.repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase(){
    const repository = new PrismaUsersRepository();
    const usecase = new GetUserProfileUseCase(repository);

    return usecase;
}