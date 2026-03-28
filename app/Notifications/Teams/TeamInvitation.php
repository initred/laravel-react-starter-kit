<?php

declare(strict_types=1);

namespace App\Notifications\Teams;

use App\Models\TeamInvitation as TeamInvitationModel;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

final class TeamInvitation extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public TeamInvitationModel $invitation)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $team = $this->invitation->team;
        $inviter = $this->invitation->inviter;

        /** @var \App\Models\Team $team */
        /** @var User $inviter */
        return (new MailMessage)
            ->subject("You've been invited to join ".$team->name)
            ->line(sprintf('%s has invited you to join the %s team.', $inviter->name, $team->name))
            ->action('Accept invitation', url(sprintf('/invitations/%s/accept', $this->invitation->code)));
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'invitation_id' => $this->invitation->id,
            'team_id' => $this->invitation->team_id,
            'team_name' => $this->invitation->team?->name,
            'role' => $this->invitation->role->value,
        ];
    }
}
