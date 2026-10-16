import { IconInfoCircle } from '@tabler/icons-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { TeamInvitationContext } from '@/types'

type Props = {
  invitation: TeamInvitationContext
  action: 'Log in' | 'Register'
}

export default function TeamInvitationAlert({ invitation, action }: Props) {
  return (
    <Alert
      data-test="team-invitation-alert"
      className="border-info/30 bg-info/10 text-foreground [&>svg]:text-info"
    >
      <IconInfoCircle />
      <AlertDescription className="text-foreground">
        {action} to join the "{invitation.teamName}" team.
      </AlertDescription>
    </Alert>
  )
}
