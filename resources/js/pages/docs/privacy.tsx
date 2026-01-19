import DocsLayout from '@/layouts/docs/docs-layout'
import { Head } from '@inertiajs/react'
import Markdown from 'react-markdown'

export default function Privacy({ content }: { content: string }) {
  return (
    <DocsLayout
      title="Privacy Policy"
      description="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
    >
      <Head title="Privacy Policy" />
      <Markdown>{content}</Markdown>
    </DocsLayout>
  )
}
