import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { seo } from '@/utils/seo'

import { AdminAccessCheck, UserLoggedInCheck } from '@/actions/auth.functions'

import { Box, Text, Image } from '@mantine/core'

export const Route = createFileRoute('/_authed/admin/accounts')({
    component: RouteComponent,
    // loaderDeps: ({ search: { ITEMS }}: any) => ({ ITEMS }),
    // loader:  async ({ deps: { ITEMS} }) => {
    // loader:  async ({ deps: { ITEMS}, params }) => {
    // loader:  async ({ params }) => {
    loader: async () => {
        // const { ITEM } = params as any
        // const photo = await GetPhoto({ data: {ITEM} }) as any

        return {
            isUser: await UserLoggedInCheck(),
            isAdmin: await AdminAccessCheck()
        }
    },

    // head: ({ loaderData }) => ({
    head: () => ({
        meta: [
            ...seo({
                title: `Accounts | ${import.meta.env.VITE_WEBSITE_NAME}`,
            }),
        ]
    })
})

function RouteComponent() {
    const { isUser, isAdmin } = Route.useLoaderData()
    const navigate = useNavigate()
    const router = useRouter()
    !isAdmin && navigate({ to: "/auth", search: { message: "NoAccess" } })
    return <>
        <Text>Accounts page is being constructed.</Text>
    </>
}