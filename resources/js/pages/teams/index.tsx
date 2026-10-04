import { Head, Link } from '@inertiajs/react'
import { IconChevronRight, IconPlus } from '@tabler/icons-react'
import CreateTeamModal from '@/components/create-team-modal'
import { SettingsSection } from '@/components/settings-section'
import { StatusBadge } from '@/components/status-badge'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { edit as editProfile } from '@/routes/profile'
import { edit, index } from '@/routes/teams'
import type { Team } from '@/types'

type Props = {
  teams: Team[]
}

export default function TeamsIndex({ teams }: Props) {
  return (
    <>
      <Head title="Teams" />

      <SettingsSection
        label="Teams"
        title="Your teams"
        description="Teams you own or belong to. Switch the active team from the sidebar."
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground font-mono text-xs">
              {teams.length} {teams.length === 1 ? 'team' : 'teams'}
            </span>

            <CreateTeamModal>
              <Button data-test="teams-new-team-button">
                <IconPlus /> New team
              </Button>
            </CreateTeamModal>
          </div>

          <div className="divide-y overflow-hidden rounded-lg border">
            {teams.map((team) => (
              <Link
                key={team.id}
                href={edit(team.slug)}
                data-test="team-row"
                className="hover:bg-muted/50 flex items-center gap-3.5 px-4 py-3.5 transition-colors"
              >
                <span className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-md border font-mono text-sm font-medium">
                  {team.name.charAt(0).toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-medium">{team.name}</span>
                    {team.isPersonal ? <Badge variant="outline">Personal</Badge> : null}
                    {team.isCurrent ? <StatusBadge variant="info">Current</StatusBadge> : null}
                  </span>
                  <span className="text-muted-foreground block text-[13px]">
                    {team.roleLabel}
                    {team.role === 'member' ? ' · view only' : null}
                  </span>
                </span>
                <IconChevronRight className="text-muted-foreground size-4 shrink-0" />
              </Link>
            ))}

            {teams.length === 0 ? (
              <p className="text-muted-foreground py-10 text-center text-sm">
                You don't belong to any teams yet.
              </p>
            ) : null}
          </div>
        </div>
      </SettingsSection>
    </>
  )
}

TeamsIndex.layout = {
  breadcrumbs: [
    {
      title: 'Settings',
      href: editProfile(),
    },
    {
      title: 'Teams',
      href: index(),
    },
  ],
}
