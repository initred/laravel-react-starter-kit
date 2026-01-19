import DocsLayout from '@/layouts/docs/docs-layout'
import { Head } from '@inertiajs/react'
import Markdown from 'react-markdown'

export default function Terms({ content }: { content: string }) {
  return (
    <DocsLayout
      title="Terms of Service"
      description="Please read these terms carefully before using our service."
    >
      <Head title="Terms of Service" />
      <Markdown>{content}</Markdown>
    </DocsLayout>
  )
}
