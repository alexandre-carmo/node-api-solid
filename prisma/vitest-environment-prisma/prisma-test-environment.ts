import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    // Executado antes dos testes
    console.log('executou')

    return {
      // Executado depois dos testes
      teardown() {},
    }
  },
}
