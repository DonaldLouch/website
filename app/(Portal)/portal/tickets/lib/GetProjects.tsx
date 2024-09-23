"use server"

import supabase from "@/lib/supabase"

import { auth } from '@clerk/nextjs/server';

export default async function getClientProjects() {
    const { userId } = auth() 
    const clientProjects = await supabase.from('Projects').select().contains('client', {id: userId}) as any
    return JSON.parse(JSON.stringify(clientProjects))
}

// export async function getAdminProjects(isStaff: boolean) {
//     const adminProjects = isStaff ? await supabase.from('Projects').select().order('lastUpdated', { ascending: false }) : undefined
//     return adminProjects
// }

// export { default as getClientProjects }
// export { default as getAdminProjects}