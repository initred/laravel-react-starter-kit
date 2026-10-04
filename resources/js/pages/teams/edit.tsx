import { Form, Head, Link, router } from '@inertiajs/react'
import {
  IconArrowLeft,
  IconCheck,
  IconChevronDown,
  IconMail,
  IconUserPlus,
  IconX,
} from '@tabler/icons-react'
import { formatDistanceToNow } from 'date-fns'
import { useMemo, useState } from 'react'
import CancelInvitationModal from '@/components/cancel-invitation-modal'
import DeleteTeamModal from '@/components/delete-team-modal'
import InputError from '@/components/input-error'
import InviteMemberModal from '@/components/invite-member-modal'
import RemoveMemberModal from '@/components/remove-member-modal'
import { SettingsSection } from '@/components/settings-section'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useInitials } from '@/hooks/use-initials'
import { edit as editProfile } from '@/routes/profile'
import { edit, index, update } from '@/routes/teams'
import { update as updateMember } from '@/routes/teams/members'
import type { RoleOption, Team, TeamInvitation, TeamMember, TeamPermissions } from '@/types'

type Props = {
  team: Team
  members: TeamMember[]
  invitations: TeamInvitation[]
  permissions: TeamPermissions
  availableRoles: RoleOption[]
}

export default function TeamEdit({
  team,
  members,
  invitations,
  permissions,
  availableRoles,
}: Props) {
  const getInitials = useInitials()

  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [removeMemberDialogOpen, setRemoveMemberDialogOpen] = useState(false)
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null)
  const [cancelInvitationDialogOpen, setCancelInvitationDialogOpen] = useState(false)
  const [invitationToCancel, setInvitationToCancel] = useState<TeamInvitation | null>(null)

  const pageTitle = useMemo(
    () => (permissions.canUpdateTeam ? `Edit ${team.name}` : `View ${team.name}`),
    [permissions.canUpdateTeam, team.name],
  )

  const updateMemberRole = (member: TeamMember, newRole: string) => {
    router.visit(updateMember([team.slug, member.id]), {
      data: { role: newRole },
      preserveScroll: true,
    })
  }

  const confirmRemoveMember = (member: TeamMember) => {
    setMemberToRemove(member)
    setRemoveMemberDialogOpen(true)
  }

  const confirmCancelInvitation = (invitation: TeamInvitation) => {
    setInvitationToCancel(invitation)
    setCancelInvitationDialogOpen(true)
  }

  return (
    <>
      <Head title={pageTitle} />

      <div className="border-b py-7">
        <Link
          href={index()}
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[13px] transition-colors"
        >
          <IconArrowLeft className="size-3.5" />
          All teams
        </Link>
        <div className="mt-3.5 flex items-center gap-3.5">
          <span className="bg-muted flex size-11 shrink-0 items-center justify-center rounded-lg border font-mono text-base font-medium">
            {team.name.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold tracking-tight">
              <span className="truncate">{team.name}</span>
              {team.isPersonal ? <Badge variant="outline">Personal</Badge> : null}
            </h2>
            <p className="text-muted-foreground text-[13px]">
              {members.length} {members.length === 1 ? 'member' : 'members'}
            </p>
          </div>
        </div>
      </div>

      {permissions.canUpdateTeam ? (
        <SettingsSection
          label="General"
          title="Team name"
          description="Visible to everyone on the team."
        >
          <Form {...update.form(team.slug)} className="flex flex-col gap-5">
            {({ errors, processing }) => (
              <>
                <Field>
                  <FieldLabel htmlFor="name">Team name</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    data-test="team-name-input"
                    defaultValue={team.name}
                    required
                  />
                  <InputError message={errors.name} />
                </Field>

                <div className="flex justify-end">
                  <Button type="submit" data-test="team-save-button" disabled={processing}>
                    Save
                  </Button>
                </div>
              </>
            )}
          </Form>
        </SettingsSection>
      ) : null}

      <SettingsSection
        label="Members"
        title="Team members"
        description={
          permissions.canCreateInvitation
            ? 'Manage who belongs to this team and what they can do.'
            : 'People who belong to this team.'
        }
      >
        <div className="flex flex-col gap-3">
          <div className="flex min-h-9 items-center justify-between gap-3">
            <span className="text-muted-foreground font-mono text-xs">
              {members.length} {members.length === 1 ? 'member' : 'members'}
            </span>

            {permissions.canCreateInvitation ? (
              <Button data-test="invite-member-button" onClick={() => setInviteDialogOpen(true)}>
                <IconUserPlus /> Invite member
              </Button>
            ) : null}
          </div>

          <div className="divide-y rounded-lg border">
            {members.map((member) => (
              <div
                key={member.id}
                data-test="member-row"
                className="flex items-center gap-3 px-4 py-3"
              >
                <Avatar className="size-8">
                  {member.avatar ? <AvatarImage src={member.avatar} alt={member.name} /> : null}
                  <AvatarFallback className="text-xs font-semibold">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{member.name}</div>
                  <div className="text-muted-foreground truncate text-[13px]">{member.email}</div>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {member.role !== 'owner' && permissions.canUpdateMember ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="outline" size="sm" data-test="member-role-trigger" />
                        }
                      >
                        {member.role_label}
                        <IconChevronDown className="text-muted-foreground" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {availableRoles.map((role) => (
                          <DropdownMenuItem
                            key={role.value}
                            data-test="member-role-option"
                            onClick={() => updateMemberRole(member, role.value)}
                          >
                            {role.label}
                            {role.value === member.role ? <IconCheck className="ml-auto" /> : null}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      {member.role_label}
                    </Badge>
                  )}

                  {member.role !== 'owner' && permissions.canRemoveMember ? (
                    <Tooltip>
                      <TooltipTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            className="text-muted-foreground"
                            aria-label={`Remove ${member.name}`}
                            data-test="member-remove-button"
                            onClick={() => confirmRemoveMember(member)}
                          >
                            <IconX />
                          </Button>
                        }
                      />
                      <TooltipContent>
                        <p>Remove member</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SettingsSection>

      {invitations.length > 0 ? (
        <SettingsSection
          label="Invitations"
          title="Pending invitations"
          description="Invitations that haven't been accepted yet."
        >
          <div className="divide-y rounded-lg border">
            {invitations.map((invitation) => (
              <div
                key={invitation.code}
                data-test="invitation-row"
                className="flex items-center gap-3 px-4 py-3"
              >
                <span className="text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full border border-dashed">
                  <IconMail className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{invitation.email}</div>
                  <div className="text-muted-foreground text-[13px]">
                    {invitation.role_label} · Invited{' '}
                    {formatDistanceToNow(new Date(invitation.created_at), { addSuffix: true })}
                  </div>
                </div>

                {permissions.canCancelInvitation ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    data-test="invitation-cancel-button"
                    onClick={() => confirmCancelInvitation(invitation)}
                  >
                    Cancel
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        </SettingsSection>
      ) : null}

      {permissions.canDeleteTeam && !team.isPersonal ? (
        <SettingsSection
          label="Danger zone"
          variant="destructive"
          title="Delete team"
          description="This cannot be undone."
        >
          <div className="border-destructive/30 flex flex-wrap items-center justify-between gap-4 rounded-lg border p-5">
            <p className="text-muted-foreground min-w-60 flex-1 text-sm">
              Permanently delete this team. Members lose access immediately and pending invitations
              are cancelled.
            </p>
            <Button
              variant="destructive"
              data-test="delete-team-button"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete team
            </Button>
          </div>
        </SettingsSection>
      ) : null}

      {permissions.canCreateInvitation ? (
        <InviteMemberModal
          team={team}
          availableRoles={availableRoles}
          open={inviteDialogOpen}
          onOpenChange={setInviteDialogOpen}
        />
      ) : null}

      <RemoveMemberModal
        team={team}
        member={memberToRemove}
        open={removeMemberDialogOpen}
        onOpenChange={setRemoveMemberDialogOpen}
      />

      <CancelInvitationModal
        team={team}
        invitation={invitationToCancel}
        open={cancelInvitationDialogOpen}
        onOpenChange={setCancelInvitationDialogOpen}
      />

      {permissions.canDeleteTeam && !team.isPersonal ? (
        <DeleteTeamModal team={team} open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} />
      ) : null}
    </>
  )
}

TeamEdit.layout = (props: { team: { name: string; slug: string } }) => ({
  breadcrumbs: [
    {
      title: 'Settings',
      href: editProfile(),
    },
    {
      title: 'Teams',
      href: index(),
    },
    {
      title: props.team.name,
      href: edit(props.team.slug),
    },
  ],
})
