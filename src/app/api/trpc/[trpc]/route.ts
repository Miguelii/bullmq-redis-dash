import { appRouter } from '@/trpc-server'
import { createTRPCContext } from '@/trpc-server/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) =>
   fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: createTRPCContext,
   })
export { handler as GET, handler as POST }
