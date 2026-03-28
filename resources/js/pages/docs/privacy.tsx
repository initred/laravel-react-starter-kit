import { Head } from '@inertiajs/react'
import Markdown from 'react-markdown'

export default function Privacy({ content }: { content: string }) {
  return (
    <>
      <Head title="Privacy Policy" />
      <Markdown>{content}</Markdown>
    </>
  )
}

Privacy.layout = {
  title: 'Privacy Policy',
  description:
    'Your privacy is important to us. This policy explains how we collect, use, and protect your information.',
}
