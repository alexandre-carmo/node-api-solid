import 'dotenv/config'
import { Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { prisma } from '@/lib/prisma'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  // Montar a url que consta da variável
  const url = new URL(process.env.DATABASE_URL)

  // Substitui o valor atribuído a 'schema' da URL
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    // Gerar o nome de uma schema
    const schema = randomUUID()
    // Montar o url
    const databaseURL = generateDatabaseURL(schema)
    // Substitui a url
    process.env.DATABASE_URL = databaseURL
    // Executa todas a migrações
    execSync('npx prisma migrate deploy')

    return {
      // Executado depois dos testes
      async teardown() {
        // Exclui cada banco após o teste ser executado
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
      },
    }
  },
}
