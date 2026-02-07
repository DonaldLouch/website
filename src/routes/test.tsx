import EmailJob from '@/components/mail/EmailJob'
import EmailTemplate from '@/components/mail/EmailTemplate'
import { Box } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  const body = [{
    name: "CONTENT", 
    company: "CONTENT", 
    email: "CONTENT", 
    phone: "CONTENT", 
    jobType: "CONTENT", 
    description: "CONTENT", 
    budge: "CONTENT"
}]
  return <EmailJob body={body[0]} />
}
