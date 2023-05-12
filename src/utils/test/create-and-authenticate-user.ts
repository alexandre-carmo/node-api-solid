import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  // Criar o usuário
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  })

  // Recupera o token do usuário
  const authResponse = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
