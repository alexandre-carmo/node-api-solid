import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyUseCaseResponse {
  gyms: Gym[]
}
export class FetchNearbyUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      longitude: userLongitude,
      latitude: userLatitude,
    })

    return {
      gyms,
    }
  }
}
