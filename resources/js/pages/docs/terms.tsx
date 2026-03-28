import { Head } from '@inertiajs/react'
import Markdown from 'react-markdown'

export default function Terms({ content }: { content: string }) {
  return (
    <>
      <Head title="Terms of Service" />
      <Markdown>{content}</Markdown>
    </>
  )
}

Terms.layout = {
  title: 'Terms of Service',
  description: 'Please read these terms carefully before using our service.',
}
