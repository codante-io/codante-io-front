import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

export function enableApiMocking() {
  
  server.listen()
}

export function disableApiMocking() {
  server.close()
}