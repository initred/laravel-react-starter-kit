import { Head, Link } from '@inertiajs/react'
import { IconEye, IconPencil, IconPlus } from '@tabler/icons-react'
import CreateTeamModal from '@/components/create-team-modal'
import Heading from '@/components/heading'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { edit, index } from '@/routes/teams'
import type { Team } from '@/types'

type Props = {
  teams: Team[]
}

export default function TeamsIndex({ teams }: Props) {
  return (
    <>
      <Head title="Teams" />

      <h1 className="sr-only">Teams</h1>

      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Heading
            variant="small"
            title="Teams"
            description="Manage your teams and team memberships"
          />

          <CreateTeamModal>
            <Button data-test="teams-new-team-button">
              <IconPlus /> New team
            </Button>
          </CreateTeamModal>
        </div>

        <div className="space-y-3">
          {teams.map((team) => (
            <div
              key={team.id}
              data-test="team-row"
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{team.name}</span>
                    {team.isPersonal ? (
                      <Badge variant="secondary">Personal</Badge>
                    ) : null}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {team.roleLabel}
                  </span>
                </div>
              </div>

              <TooltipProvider>
                <div className="flex items-center gap-2">
                  {team.role === 'member' ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          data-test="team-view-button"
                          asChild
                        >
                          <Link href={edit(team.slug)}>
                            <IconEye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View team</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          data-test="team-edit-button"
                          asChild
                        >
                          <Link href={edit(team.slug)}>
                            <IconPencil className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit team</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TooltipProvider>
            </div>
          ))}

          {teams.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              You don't belong to any teams yet.
            </p>
          ) : null}
        </div>
      </div>
    </>
  )
}

TeamsIndex.layout = {
  breadcrumbs: [
    {
      title: 'Teams',
      href: index(),
    },
  ],
}
