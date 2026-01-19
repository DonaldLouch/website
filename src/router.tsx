import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from '@/components/DefaultCatchBoundary'
import { NotFound } from '@/components/NotFound'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import * as TanstackQuery from "@/integrations/tanstack-query/root-provider"

// export function getRouter() {
//   const router = createRouter({
//     routeTree,
//     defaultPreload: 'intent',
//     defaultErrorComponent: DefaultCatchBoundary,
//     defaultNotFoundComponent: () => <NotFound />,
//     scrollRestoration: true,
//   })
//   return router
// }

export const getRouter = () => {
  const rqContext = TanstackQuery.getContext()

  const router = createRouter({
    routeTree,
    context: {
      ...rqContext,
    },

    defaultPreload: 'intent',
  })

  setupRouterSsrQueryIntegration({ router, queryClient: rqContext.queryClient })

  return router
}